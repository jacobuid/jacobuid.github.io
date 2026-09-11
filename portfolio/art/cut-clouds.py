"""Cut art/clouds.png into one PNG per cloud.

The export is a transparent sheet of seven clouds surrounded by compression
speckle - thousands of stray part-alpha pixels. Two passes clean it:

 1. Alpha is thresholded, which is safe because the sheet's alpha is already
    almost binary (1.13M pixels at 0, 426K at 224+, only ~15K between).
 2. Connected components smaller than MIN_AREA are dropped (the speckle clumps together into
    blobs of up to ~800px; the smallest real cloud is ~16,600px, so the
    threshold sits in a very wide gap). That is what kills
    the speckle - it is a size test, not a colour test, so it cannot eat into
    the clouds themselves. Each surviving component is then cropped with every
    pixel that is not part of it cleared, so a neighbour's fleck never rides
    along in the bounding box.

Colours are snapped to the sheet's own three tones, which removes the JPEG
ringing inside the shapes and leaves art that survives `pixelated` scaling.

Each cloud is then downsampled so that it can be DISPLAYED on the backdrop's
own pixel grid - the CSS draws a cloud at `native px * 100vw / 640`, the same
scale the 640-column backdrop is drawn at, so one cloud block covers exactly
one artwork block and the two read as one drawing. That fixes the scale: the
widest cloud is sized to span TARGET_MAX_VW of the scene, and the rest keep
their drawn proportions relative to it. Tones and alpha are re-snapped after
the resize, because a box filter blends both.
"""
from PIL import Image
from collections import deque, Counter
import os

ALPHA_MIN = 160
MIN_AREA = 3000
BACKDROP_COLS = 640    # backdrop.py's landscape width
TARGET_MAX_VW = 22     # how much of the scene the widest cloud spans
TONES = [(0xfd, 0xfd, 0xfd), (0xb8, 0xe0, 0xfc), (0x82, 0xc6, 0xfc)]

im = Image.open('art/clouds.png').convert('RGBA')
w, h = im.size
src = im.load()

solid = bytearray(w * h)
for y in range(h):
    row = y * w
    for x in range(w):
        if src[x, y][3] >= ALPHA_MIN:
            solid[row + x] = 1

# Label 8-connected components.
label = [0] * (w * h)
components = []
for start in range(w * h):
    if solid[start] == 0 or label[start]:
        continue
    tag = len(components) + 1
    queue = deque([start])
    label[start] = tag
    pixels = []
    while queue:
        i = queue.popleft()
        pixels.append(i)
        x, y = i % w, i // w
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h:
                    j = ny * w + nx
                    if solid[j] and not label[j]:
                        label[j] = tag
                        queue.append(j)
    components.append(pixels)

kept = [(i, p) for i, p in enumerate(components, 1) if len(p) >= MIN_AREA]
print(f'{len(components)} components, {len(kept)} above {MIN_AREA}px '
      f'({len(components) - len(kept)} specks dropped)')


def snap(rgb):
    return min(TONES, key=lambda t: sum((a - b) ** 2 for a, b in zip(rgb, t)))


# Reading order: top to bottom, then left to right.
kept.sort(key=lambda kp: (min(i // w for i in kp[1]), min(i % w for i in kp[1])))

widest = max(max(i % w for i in p) - min(i % w for i in p) + 1 for _, p in kept)
SCALE = (TARGET_MAX_VW / 100 * BACKDROP_COLS) / widest
print(f'widest cloud {widest}px on the sheet -> '
      f'{round(widest * SCALE)}px native, drawn at {TARGET_MAX_VW}vw '
      f'(scale {SCALE:.4f})')

meta = []
for n, (tag, pixels) in enumerate(kept, 1):
    xs = [i % w for i in pixels]
    ys = [i // w for i in pixels]
    x0, x1, y0, y1 = min(xs), max(xs) + 1, min(ys), max(ys) + 1
    out = Image.new('RGBA', (x1 - x0, y1 - y0), (0, 0, 0, 0))
    dst = out.load()
    for i in pixels:
        x, y = i % w, i // w
        dst[x - x0, y - y0] = (*snap(src[x, y][:3]), 255)

    out = out.resize((max(1, round(out.width * SCALE)),
                      max(1, round(out.height * SCALE))), Image.BOX)
    dst = out.load()
    for y in range(out.height):
        for x in range(out.width):
            r, g, b, a = dst[x, y]
            dst[x, y] = (*snap((r, g, b)), 255) if a >= 128 else (0, 0, 0, 0)

    path = f'public/img/cloud-{n}.png'
    out.save(path, optimize=True)
    tones = Counter(dst[x, y][:3] for y in range(out.height)
                    for x in range(out.width) if dst[x, y][3])
    meta.append((n, out.width, out.height))
    print('  cloud-{}  {:>3}x{:<3}  {:>4.1f} KB  tones {}'.format(
        n, out.width, out.height, os.path.getsize(path) / 1024, len(tones)))

print()
print('/* Emitted by scratchpad/cut-clouds.py - do not hand-edit. */')
print('const CLOUDS = [')
for n, w_, h_ in meta:
    print(f"    {{ src: 'cloud-{n}', width: {w_}, height: {h_} }},")
print('];')
