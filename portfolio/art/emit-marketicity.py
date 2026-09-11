"""Drop the laptop from MarketicitySprite, leaving the logo alone.

The old grid stacked three things: the wordmark with its wifi arcs on rows
0-38, a deliberate blank gap on 39-57, and the WordPress laptop on 58-149. The
scene now carries the St Louis skyline as artwork, so the machine is redundant
and the logo becomes a sign in the sky like the other two school scenes.

The WORDPRESS layer went with it - it was the mark on the laptop's screen - and
so did --mark-origin, which only ever positioned that layer's breathing.
"""
import re

src = open('src/components/sprites/MarketicitySprite.js').read()
KEEP = 39   # rows 0-38: wordmark and arcs, everything above the blank gap

names = ('MACHINE', 'ARC_0', 'ARC_1', 'ARC_2')
grids = {n: re.search(rf'const {n} = `\n(.*?)\n`;', src, re.S).group(1).split('\n')[:KEEP]
         for n in names}
palette = dict(re.findall(r"\s([A-Za-z]):\s'(#[0-9a-fA-F]{6})'", src))

width = max(len(r) for rows in grids.values() for r in rows)
grids = {n: [r.ljust(width, '.') for r in rows] for n, rows in grids.items()}

# Trim columns that are empty across every layer, so the box is the artwork.
left = min((len(r) - len(r.lstrip('.')) for rows in grids.values()
            for r in rows if r.strip('.')), default=0)
right = max((len(r.rstrip('.')) for rows in grids.values() for r in rows), default=width)
grids = {n: [r[left:right] for r in rows] for n, rows in grids.items()}
columns, rows_count = right - left, KEEP

used = {c for rows in grids.values() for r in rows for c in r} - {'.'}
palette = {k: v for k, v in palette.items() if k in used}
print(f'{columns}x{rows_count}, {len(palette)} colours, layers: {", ".join(names)}')

pal_src = '\n'.join(f"    {k}: '{v}'," for k, v in sorted(palette.items())).rstrip(',')
blocks = '\n\n'.join(f'const {n} = `\n' + '\n'.join(grids[n]) + '\n`;' for n in names)

layers = '\n'.join(
    f'''            <PixelArt
                className="sprite__layer sprite__layer--signal"
                style={{{{ '--signal-delay': '{d}' }}}}
                art={{{n}}}
                palette={{PALETTE}}
                columns={{COLUMNS}}
                rows={{ROWS}}
            />'''
    for n, d in (('ARC_0', '0.56s'), ('ARC_1', '0.28s'), ('ARC_2', '0.00s')))

out = f'''import PixelArt from '../PixelArt';

/**
 * The Marketicity wordmark, with its wifi arcs pulsing outward. {columns}x{rows_count}.
 *
 * Traced from the logo the way it is drawn, not set in a font - at this size
 * letterforms need their stroke weights chosen by hand, and the M is a shade
 * bolder than the rest to match the original.
 *
 * The laptop this used to sit above is gone: the scene carries the St Louis
 * skyline as artwork now, so the logo floats in the sky as a sign instead.
 */
const COLUMNS = {columns};
const ROWS = {rows_count};

const PALETTE = {{
{pal_src}
}};

{blocks}

function MarketicitySprite() {{
    return (
        <div className="sprite" style={{{{ '--sprite-aspect': `${{COLUMNS}} / ${{ROWS}}` }}}}>
            <PixelArt
                className="sprite__layer"
                art={{MACHINE}}
                palette={{PALETTE}}
                columns={{COLUMNS}}
                rows={{ROWS}}
            />
{layers}
        </div>
    );
}}

export default MarketicitySprite;
'''
open('src/components/sprites/MarketicitySprite.js', 'w').write(out)
print('rewrote MarketicitySprite.js')
