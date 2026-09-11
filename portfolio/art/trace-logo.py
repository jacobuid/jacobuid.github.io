"""Trace a logo PNG in this directory into a PixelArt sprite component.

Usage: trace-logo.py <name> <columns> [--preview] [--emit]

Each logo is already blocky - it was drawn as pixel art - and every one of them
has its own native block size. Tracing at that block count, or an integer
multiple of it, puts a whole number of cells on every source block. At any
other width each cell straddles two blocks and the majority vote picks between
them arbitrarily, which is the speckle that makes a trace look glitchy. So the
`columns` argument must be a multiple of the logo's `block` figure below, and
the script refuses anything else.

One cell per block is faithful to the drawing but often too coarse to read at
sprite size - lettering closes up and small figures turn to blobs - so these
are traced at two or three cells per block.

Colours are snapped to each logo's own few, listed here rather than found by a
quantiser: the accent colours are a couple of percent of the artwork each, and
a general palette reduction merges them into mud.

Background is either transparency or a painted panel colour, per logo.
"""
from PIL import Image
from collections import Counter
import sys

LOGOS = {
    'match': {
        'file': 'match-logo.png',
        'component': 'MatchLogoSprite',
        'block': 56,
        'background': (0x00, 0x15, 0x36),
        'tones': {'w': (0xfd, 0xfd, 0xfd), 'b': (0x00, 0x49, 0xc6),
                  'g': (0x37, 0xdf, 0x0b), 'p': (0xfc, 0x02, 0x5c)},
        'blurb': ('The match.com wordmark: white lettering with the green dot, and\n'
                  ' * the two figures under a heart.'),
        'note': ('The lettering is white because the sign hangs in a night sky - an\n'
                 ' * earlier blue-on-navy version of this logo was barely legible there.')
    },
    'aim': {
        'file': 'aim-logo.png',
        'component': 'AimLogoSprite',
        'block': 91,
        'background': None,
        'tones': {'k': (0x6c, 0x6b, 0x6b), 'o': (0xfd, 0x8f, 0x01)},
        'blurb': ('The Aim Truancy Solutions wordmark: "aim" and "Solutions" in grey,\n'
                  ' * "Truancy" and the cursor arrow in orange.'),
        'note': ('Only two colours, so the arrow above the "i" carries the accent on\n'
                 ' * its own - it is the one shape worth keeping crisp.')
    }
}

name = sys.argv[1]
COLUMNS = int(sys.argv[2])
cfg = LOGOS[name]
TONES = cfg['tones']
BACKGROUND = cfg['background']

if COLUMNS % cfg['block']:
    raise SystemExit(f"columns must be a multiple of {cfg['block']} for '{name}' "
                     f"(got {COLUMNS}); anything else straddles source blocks")

im = Image.open(f"art/{cfg['file']}").convert('RGBA')
im = im.crop(im.getbbox())
w, h = im.size
rows = max(1, round(COLUMNS * h / w))
px = im.load()


def classify(r, g, b, a):
    """Which palette entry a source pixel belongs to, or None for background."""
    if a < 128:
        return None
    if BACKGROUND is not None and \
            sum(abs(c - t) for c, t in zip((r, g, b), BACKGROUND)) <= 60:
        return None
    return min(TONES, key=lambda k: sum((c - t) ** 2 for c, t in zip((r, g, b), TONES[k])))


grid = []
for cy in range(rows):
    y0, y1 = cy * h // rows, max(cy * h // rows + 1, (cy + 1) * h // rows)
    line = []
    for cx in range(COLUMNS):
        x0, x1 = cx * w // COLUMNS, max(cx * w // COLUMNS + 1, (cx + 1) * w // COLUMNS)
        votes = Counter()
        for y in range(y0, y1):
            for x in range(x0, x1):
                votes[classify(*px[x, y])] += 1
        line.append(votes.most_common(1)[0][0] or '.')
    grid.append(''.join(line))

while grid and not grid[0].strip('.'):
    grid.pop(0)
while grid and not grid[-1].strip('.'):
    grid.pop()
left = min(len(r) - len(r.lstrip('.')) for r in grid if r.strip('.'))
right = max(len(r.rstrip('.')) for r in grid)
grid = [r[left:right].ljust(right - left, '.') for r in grid]
columns, rows = right - left, len(grid)

rects = 0
for line in grid:
    prev = None
    for ch in line:
        if ch != prev:
            if ch != '.':
                rects += 1
            prev = ch
print(f'{name}: {columns}x{rows}  ({w}x{h} source, {w/COLUMNS:.2f} px per cell, '
      f'{COLUMNS // cfg["block"]} cells per block)  {rects} rects')

if '--preview' in sys.argv:
    Z = 8
    ground = BACKGROUND or (0xf5, 0xf0, 0xe4)
    out = Image.new('RGB', (columns * Z, rows * Z), ground)
    d = out.load()
    for cy, line in enumerate(grid):
        for cx, ch in enumerate(line):
            if ch == '.':
                continue
            for j in range(Z):
                for i in range(Z):
                    d[cx * Z + i, cy * Z + j] = TONES[ch]
    out.save(f'/tmp/{name}-trace-{COLUMNS}.png')
    print(f'  wrote /tmp/{name}-trace-{COLUMNS}.png')

if '--emit' in sys.argv:
    used = {c for line in grid for c in line} - {'.'}
    pal = '\n'.join(f"    {k}: '#{TONES[k][0]:02x}{TONES[k][1]:02x}{TONES[k][2]:02x}',"
                    for k in TONES if k in used).rstrip(',')
    component = cfg['component']
    src = f'''import PixelArt from '../PixelArt';

/**
 * {cfg['blurb']} {columns}x{rows}, {len(used)} colours.
 *
 * Traced at {COLUMNS} columns, {COLUMNS // cfg['block']} cells per block of the source's own
 * ~{round(w / cfg['block'])}px pixel art. An arbitrary width would put each cell across two
 * source blocks and let the majority vote pick between them, which is the
 * speckle that makes a trace look glitchy.
 *
 * {cfg['note']}
 *
 * Emitted by art/trace-logo.py - do not hand-edit.
 */
const COLUMNS = {columns};
const ROWS = {rows};

const PALETTE = {{
{pal}
}};

const LOGO = `
{chr(10).join(grid)}
`;

function {component}() {{
    return (
        <div className="sprite" style={{{{ '--sprite-aspect': `${{COLUMNS}} / ${{ROWS}}` }}}}>
            <PixelArt
                className="sprite__layer"
                art={{LOGO}}
                palette={{PALETTE}}
                columns={{COLUMNS}}
                rows={{ROWS}}
            />
        </div>
    );
}}

export default {component};
'''
    open(f'src/components/sprites/{component}.js', 'w').write(src)
    print(f'  wrote src/components/sprites/{component}.js')
