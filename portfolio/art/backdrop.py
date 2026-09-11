"""Turn a raw scene export into the pair of backdrops the site ships.

Usage: backdrop.py <stem> <clip-fraction> [#rrggbb sky]

Reads art/<stem>-{landscape,portrait}.<png|jpg> and writes optimised PNG
copies to public/img/.

Only a landscape export is required. Where there is no portrait one, a portrait
crop is taken from the middle of the landscape at the aspect the portrait
scenes need. It is left at the crop's own pixel size rather than scaled up:
the page draws these with `image-rendering: pixelated`, so letting the browser
do the enlarging gives hard pixel edges, where enlarging here would only bake
in a blur. Three things happen, in this order:

 1. Trim the bottom. The layer is bottom-anchored at `100% auto`, so a shorter
    image sits lower AND leaves a taller band of manufactured sky above it.
 2. Downsample by box filter, then quantise to a 96-colour palette with no
    dither - dithering fights `image-rendering: pixelated`.
 3. Pin the flat top band to one exact colour and report it, so the CSS sky
    extension joins the artwork invisibly. Stretching the artwork's top ROW up
    instead would join seamlessly even where cloud texture reaches the edge,
    but it drags those clouds upward as vertical streaks - so the flat colour
    it is. Each orientation reports its OWN
    colour: two exports of the same scene are not necessarily graded alike
    (st-louis is #659ff7 landscape against #357dec portrait, 48 units apart
    in red), so forcing one on both would band the other. Pass a colour on
    the command line only to override both.

A gradient sky is fine as long as its top rows are flat, which is what the
band is matched against - st-louis holds #659ff7 for 40 rows before the
sunset starts, so the flat extension meets a flat edge and the gradient is
wholly inside the artwork.

It does NOT report `backdropStars`, the band a twinkle overlay uses. That
one is authored by eye: a painted star is an isolated dot, and so is a lit
window, so nothing here can tell them apart - measuring it found "stars"
all the way down into the city. It uses the same units as the horizon.

It reports the horizon: the first row a RUN of non-sky pixels appears,
expressed as a multiple of the image WIDTH measured up from the bottom edge.
Width is the only thing that scales a `100% auto` background, so that ratio is
viewport-independent - it goes into timeline.js as `backdropHorizon` and keeps
the drifting clouds above the roofline.
"""
from PIL import Image
from collections import Counter
import os, pathlib, sys

stem, clip = sys.argv[1], float(sys.argv[2])
forced = sys.argv[3] if len(sys.argv) > 3 else None
override = None if forced is None else tuple(
    int(forced.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))

WIDTHS = {'landscape': 640, 'portrait': 420}
MIN_RUN = 4                   # contiguous non-sky pixels that count as skyline
PORTRAIT_ASPECT = 420 / 910   # what the portrait scenes are shaped like
report = {}


def source(kind):
    """The export for one orientation, or (None, None) if there is not one."""
    for suffix in ('png', 'jpg', 'jpeg'):
        path = pathlib.Path(f'art/{stem}-{kind}.{suffix}')
        if path.exists():
            return Image.open(path).convert('RGB'), path
    return None, None


def flat_top_colour(img, width):
    """The palette entry covering most of the top few rows."""
    counts = Counter(img.getpixel((x, y))
                     for y in range(4) for x in range(0, width, 2))
    return counts.most_common(1)[0][0]


for kind, width in WIDTHS.items():
    src, src_path = source(kind)

    if src is None and kind == 'portrait':
        # Cropped from the middle of the landscape, and left at the crop's own
        # size so the browser does the enlarging.
        src, src_path = source('landscape')
        keep = round(src.height * PORTRAIT_ASPECT)
        left = (src.width - keep) // 2
        src = src.crop((left, 0, left + keep, src.height))
        width = min(width, src.width)
        print(f'  no portrait export: cropped {keep}x{src.height} from the '
              f'middle of the landscape')

    if src is None:
        raise SystemExit(f'no export found for art/{stem}-{kind}')

    w, h = src.size
    cropped = src.crop((0, 0, w, round(h * (1 - clip))))
    q = cropped.resize((width, round(width * cropped.height / cropped.width)), Image.BOX) \
               .quantize(colors=96, method=Image.MEDIANCUT, dither=Image.Dither.NONE)

    idx = flat_top_colour(q, width)
    pal = q.getpalette()
    sky = override or tuple(pal[idx * 3:idx * 3 + 3])
    pal[idx * 3:idx * 3 + 3] = list(sky)

    # Collapse every entry that is visually the same blue onto one, so the
    # gradient's top few steps cannot band against the flat CSS extension.
    merged = 0
    for other in range(len(pal) // 3):
        entry = tuple(pal[other * 3:other * 3 + 3])
        if other != idx and sum(abs(a - b) for a, b in zip(entry, sky)) <= 6:
            pal[other * 3:other * 3 + 3] = list(sky)
            merged += 1
    q.putpalette(pal)

    out = f'public/img/{stem}-{kind}.png'
    q.save(out, optimize=True)


    # Horizon, measured on the image as shipped. A row only counts as the
    # skyline if it holds a RUN of non-sky pixels: a night scene has stars
    # painted into its sky, and a single-pixel star would otherwise be read as
    # the horizon - dallas-portrait measured 19px of sky that way.
    rgb = q.convert('RGB')
    px = rgb.load()
    horizon = q.height
    for y in range(q.height):
        run = best = 0
        for x in range(width):
            if sum(abs(a - b) for a, b in zip(px[x, y], sky)) < 26:
                run = 0
            else:
                run += 1
                best = max(best, run)
        if best >= MIN_RUN:
            horizon = y
            break

    report[kind] = ('#%02x%02x%02x' % sky, round((q.height - horizon) / width, 3))
    print('{:<24} {}x{} -> {}x{}  {:>4.0f} KB  sky #{:02x}{:02x}{:02x} '
          '(+{} merged)  horizon {:.3f} x width'.format(
              f'{stem}-{kind}', w, h, q.width, q.height,
              os.path.getsize(out) / 1024, *sky, merged,
              (q.height - horizon) / width))

print('\nFor src/data/timeline.js:\n')
print("        backdrop: '%s'," % stem)
print("        backdropSky: { landscape: '%s', portrait: '%s' },"
      % (report['landscape'][0], report['portrait'][0]))
print('        backdropHorizon: { landscape: %s, portrait: %s },'
      % (report['landscape'][1], report['portrait'][1]))
