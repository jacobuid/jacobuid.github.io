"""Turn the two st-louis-boat-sprite exports into one aligned animation pair.

The two frames differ only in the paddle wheel's spokes, so flipping between
them spins the wheel. Getting there needs three things the exports do not have:

 1. ALIGNMENT. The frames were exported on different canvases (1098x665 vs
    1073x635) with the boat at different offsets, so swapping them raw makes
    the whole boat jump. The offset is recovered by sliding one alpha mask over
    the other and taking the best overlap - the hull is identical between
    frames, so the true offset is a sharp maximum.

 2. A SHARED PALETTE. The exports carry ~66,000 distinct colours of compression
    noise. Quantised separately the two frames would land on slightly different
    palettes and the boat would shimmer as it flipped, so both are quantised
    together as one image and then split apart again.

 3. SCALE. Downsampled to the backdrop's pixel grid, the same way the clouds
    are, so the boat's blocks match the artwork's.

Alpha is handled premultiplied. Downsampling straight RGBA drags the fully
transparent pixels' colour into every edge, which haloes the hull.
"""
from PIL import Image
import os

SEARCH = 16          # the bounding boxes put the answer within a few px
TARGET_PX = 63       # native width, drawn as TARGET_PX * 100vw / 640
COLOURS = 24

frames = [Image.open(f'art/st-louis-boat-sprite-{n}.png').convert('RGBA')
          for n in (1, 2)]
masks = [f.getchannel('A').point(lambda v: 255 if v >= 128 else 0) for f in frames]

# Work from each boat's own bounding box, so the differing canvases drop out.
boxes = [m.getbbox() for m in masks]
crops = [f.crop(b) for f, b in zip(frames, boxes)]
mcrops = [m.crop(b) for m, b in zip(masks, boxes)]

base = mcrops[0].load()
other = mcrops[1].load()
bw, bh = mcrops[0].size
ow, oh = mcrops[1].size

best = None
for dy in range(-SEARCH, SEARCH + 1):
    for dx in range(-SEARCH, SEARCH + 1):
        hit = miss = 0
        for y in range(0, bh, 3):
            oy = y - dy
            if not 0 <= oy < oh:
                continue
            for x in range(0, bw, 3):
                ox = x - dx
                if not 0 <= ox < ow:
                    continue
                a = base[x, y] > 0
                b = other[ox, oy] > 0
                if a and b:
                    hit += 1
                elif a or b:
                    miss += 1
        score = hit / (hit + miss) if hit + miss else 0
        if best is None or score > best[0]:
            best = (score, dx, dy)

score, dx, dy = best
print(f'best alignment: frame 2 offset by ({dx}, {dy}), overlap {score:.1%}')

# One canvas big enough for both at their aligned offsets.
left, top = min(0, dx), min(0, dy)
right, bottom = max(bw, ow + dx), max(bh, oh + dy)
size = (right - left, bottom - top)
placed = []
for crop, (ox, oy) in zip(crops, [(0, 0), (dx, dy)]):
    canvas = Image.new('RGBA', size, (0, 0, 0, 0))
    canvas.paste(crop, (ox - left, oy - top))
    placed.append(canvas)

scale = TARGET_PX / size[0]
out_size = (TARGET_PX, max(1, round(size[1] * scale)))

small = []
for canvas in placed:
    alpha = canvas.getchannel('A')
    # Premultiply, downsample both, then un-premultiply.
    pm = Image.merge('RGB', [
        Image.eval(ch, lambda v: v).point(lambda v: v)
        for ch in canvas.split()[:3]
    ])
    pm = Image.composite(pm, Image.new('RGB', size, (0, 0, 0)), alpha)
    pm_small = pm.resize(out_size, Image.BOX)
    a_small = alpha.resize(out_size, Image.BOX)
    px, pa = pm_small.load(), a_small.load()
    flat = Image.new('RGBA', out_size, (0, 0, 0, 0))
    fp = flat.load()
    for y in range(out_size[1]):
        for x in range(out_size[0]):
            a = pa[x, y]
            if a < 110:
                continue
            r, g, b = px[x, y]
            fp[x, y] = (min(255, r * 255 // a), min(255, g * 255 // a),
                        min(255, b * 255 // a), 255)
    small.append(flat)

# Quantise both together so they cannot drift onto different palettes.
stack = Image.new('RGB', (out_size[0], out_size[1] * 2), (0, 0, 0))
for i, f in enumerate(small):
    stack.paste(f.convert('RGB'), (0, i * out_size[1]))
q = stack.quantize(colors=COLOURS, method=Image.MEDIANCUT,
                   dither=Image.Dither.NONE).convert('RGB')

for i, f in enumerate(small, 1):
    band = q.crop((0, (i - 1) * out_size[1], out_size[0], i * out_size[1]))
    out = Image.new('RGBA', out_size, (0, 0, 0, 0))
    src, dst, alpha = band.load(), out.load(), f.load()
    for y in range(out_size[1]):
        for x in range(out_size[0]):
            if alpha[x, y][3]:
                dst[x, y] = (*src[x, y], 255)
    path = f'public/img/boat-{i}.png'
    out.save(path, optimize=True)
    print('  boat-{}  {}x{}  {:.1f} KB'.format(
        i, out.width, out.height, os.path.getsize(path) / 1024))

print(f'\naspect {out_size[0]} / {out_size[1]}'
      f'   drawn at {TARGET_PX / 640 * 100:.2f}vw landscape,'
      f' {TARGET_PX / 420 * 100:.2f}vw portrait')
