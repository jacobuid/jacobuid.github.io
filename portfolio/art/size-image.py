"""Size an art/ PNG for the web and drop it in public/img/.

Usage: size-image.py <name> <width> [--ink light|dark --ink-to #rrggbb]
                                    [--key #rrggbb]

For art that is not drawn on a block grid, tracing it into a PixelArt sprite
would invent a grid that is not there and alias the edges. These assets ship as
the PNGs themselves, resized and nothing else - the page draws them with
`image-rendering: pixelated` and `background-size: contain`, so they scale
uniformly and are never distorted.

Alpha is handled premultiplied. Downsampling straight RGBA drags the fully
transparent pixels' colour into every edge, which haloes the artwork.

--ink recolours a logo's lettering when the export was drawn for the opposite
background to the one it ends up on. It is a luminance test, not a colour
match, so it catches only the neutral lettering and leaves a brand's coloured
mark alone:

  --ink dark   pixels whose top channel is under 60   (near-black lettering)
  --ink light  pixels whose bottom channel is over 195 (near-white lettering)

pwc-logo is black lettering on a night skyline, and its darkest coloured pixel
is #9a0805 - top channel 154, far above the threshold - so the mark survives.
realpage-logo is the mirror image: white lettering on a bright lobby, with
orange dots that stay orange. Both brands do exactly this swap themselves
depending on the ground, so it is the brand-correct treatment rather than a
trick to force contrast.

--key drops a flat background to transparent, for a logo that arrives as
artwork on an opaque panel rather than on alpha. Nothing needs it at the
moment - the usaa export that did was replaced with one that has alpha - but
without it such a logo lands a hard rectangle over the backdrop, where every
other sign on the page is a floating mark. The test is per-pixel and generous,
because the edges are anti-aliased; it runs after the resize so it also catches
the greys the filter leaves behind.
"""
from PIL import Image
import os, sys

name, width = sys.argv[1], int(sys.argv[2])
ink = sys.argv[sys.argv.index('--ink') + 1] if '--ink' in sys.argv else None
ink_to = sys.argv[sys.argv.index('--ink-to') + 1] if '--ink-to' in sys.argv else None
if (ink is None) != (ink_to is None):
    raise SystemExit('--ink and --ink-to go together')
if ink not in (None, 'light', 'dark'):
    raise SystemExit("--ink must be 'light' or 'dark'")
target = None if ink_to is None else tuple(
    int(ink_to.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))

key_to = sys.argv[sys.argv.index('--key') + 1] if '--key' in sys.argv else None
key = None if key_to is None else tuple(
    int(key_to.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))

NEAR_BLACK = 60      # top channel under this is near-black lettering
NEAR_WHITE = 195     # bottom channel over this is near-white lettering
KEY_TOLERANCE = 60   # summed channel distance that still counts as background


def is_ink(r, g, b):
    if ink == 'dark':
        return max(r, g, b) < NEAR_BLACK
    if ink == 'light':
        return min(r, g, b) > NEAR_WHITE
    return False

im = Image.open(f'art/{name}.png').convert('RGBA')
im = im.crop(im.getbbox())
w, h = im.size
height = round(width * h / w)

alpha = im.getchannel('A')
premul = Image.composite(im.convert('RGB'), Image.new('RGB', (w, h), (0, 0, 0)), alpha)
small_rgb = premul.resize((width, height), Image.BOX)
small_a = alpha.resize((width, height), Image.BOX)

pr, pa = small_rgb.load(), small_a.load()
out = Image.new('RGBA', (width, height), (0, 0, 0, 0))
op = out.load()
recoloured = [0]
keyed = [0]
for y in range(height):
    for x in range(width):
        a = pa[x, y]
        if a >= 110:
            r, g, b = pr[x, y]
            r, g, b = (min(255, r * 255 // a), min(255, g * 255 // a),
                       min(255, b * 255 // a))
            if key is not None and sum(abs(c - k) for c, k in zip((r, g, b), key)) <= KEY_TOLERANCE:
                keyed[0] += 1
                continue
            if target is not None and is_ink(r, g, b):
                r, g, b = target
                recoloured[0] += 1
            op[x, y] = (r, g, b, 255)

path = f'public/img/{name}.png'
out.save(path, optimize=True)
print('{:<14} {}x{} -> {}x{}   {:>5.0f} KB -> {:>4.0f} KB   aspect {:.3f}{}'.format(
    name, w, h, width, height,
    os.path.getsize(f'art/{name}.png') / 1024, os.path.getsize(path) / 1024,
    width / height,
    (f'   {recoloured[0]} px of {ink} ink -> {ink_to}' if target else '')
    + (f'   {keyed[0]} px of {key_to} dropped' if key else '')))
