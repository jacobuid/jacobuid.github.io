# Source art

The raw exports the shipped images are derived from. This directory sits
**outside `public/`** on purpose: anything under `public/` is copied verbatim
into the build, and these four backdrops plus the cloud sheet are 7.5 MB of
originals that no page ever requests.

Nothing here is referenced at runtime. The files in `public/img/` are the
generated ones, and they are regenerated from here by two scripts:

| Source | Script | Produces |
| --- | --- | --- |
| `<scene>-{landscape,portrait}.<png\|jpg>` | `backdrop.py <stem> <clip> [#sky]` | `public/img/<stem>-{landscape,portrait}.png` |
| `clouds.png` | `cut-clouds.py` | `public/img/cloud-1..7.png` |
| `st-louis-boat-sprite-{1,2}.png` | `cut-boat.py` | `public/img/boat-{1,2}.png` |
| `match-logo.png`, `aim-logo.png` | `trace-logo.py <name> <columns> --emit` | `src/components/sprites/<Name>LogoSprite.js` |
| `match-cell.png`, `dell-wp.png`, `argo-logo.png` | `size-image.py <name> <width>` | shipped as PNGs, never traced |
| `pwc-logo.png` | `size-image.py pwc-logo 400 --ink dark --ink-to '#ffffff'` | black wordmark, night skyline |
| `usaa-logo.png` | `size-image.py usaa-logo 300` | |
| `realpage-logo.png` | `size-image.py realpage-logo 460` | white wordmark, kept white |

`emit-marketicity.py` was a one-shot: it cut the WordPress laptop off the
bottom of the old `MarketicitySprite` grid, leaving the wordmark. It is kept
for the record but reads its own output, so re-running it does nothing useful.

The clips applied so far: `mhs` and `lsus-uc` at `0.20`; everything since at
`0`, their wider crops already leaving plenty of sky. `realpage` is an
interior, so the "sky" its band extends is the lobby ceiling.

Only a landscape export is needed. Without a portrait one, `backdrop.py`
crops a portrait from the middle of the landscape at the aspect the portrait
scenes want, and leaves it at the crop's own pixel size - the page enlarges it
with `image-rendering: pixelated`, which gives hard edges where enlarging in
Pillow would bake in a blur. `side-quest` is built that way.

## Wanted

The **LSUS anchor logo**, for the `lsu-design` scene. That scene has no sign at
the moment: its artwork is already covered in LSUS marks, so the wordmark it
used to share with the degree scene hid the wall rather than labelling
anything. The anchor would be a sign the room does not already contain.

Save it here as `lsus-anchor.png`; it can be sized with `size-image.py` like
the other logos, and the scene takes it back with `sprite: 'lsusAnchor'`.

**Not yet wired:** `dallas-biz-*` and `aim-logo.png` (AIM Truancy became a
side quest, and side quest cards carry no artwork). They live
here rather than in `public/img/` so they are not deployed until they are used
- anything under `public/` is copied verbatim into the build.

`dallas-pwc-*` was superseded by `pwc-*` (the landscape crop was byte for byte
the same file) and has been deleted.

`aim-logo.png` was traced once; `trace-logo.py aim 273 --emit` brings the
sprite back whenever there is somewhere to put it.

`trace-logo.py` holds one entry per logo - its file, palette, background and
native block count - and refuses a column count that is not a multiple of that
block count. Off a multiple each cell straddles two source blocks and the
majority vote picks between them, which is what makes a trace look speckled.
Both logos are traced at 3 cells per block; one cell per block is faithful to
the drawing but too coarse to read at sprite size.

Not every asset suits a trace, and `size-image.py` handles those: it resizes
the export for the web and does nothing else. The page draws them with
`image-rendering: pixelated` and `background-size: contain`, so they scale
uniformly and are never distorted.

Two reasons an asset lands there instead of in the tracer:

* **No block grid.** `pwc-logo.png` and `argo-logo.png` look like pixel art but
  no spacing divides their edges cleanly, so a trace would invent a grid that is
  not there and alias the letterforms.
* **Not block art at all.** `match-cell.png` and `dell-wp.png` are shaded
  renders - their runs of equal colour are two or three pixels.

`backdrop.py` also prints the two numbers each scene needs in
`src/data/timeline.js` - `backdropSky` (so the CSS sky extension joins the
artwork invisibly) and `backdropHorizon` (so the drifting clouds stay above the
roofline). Re-run it and update those if the artwork is ever re-cropped.
