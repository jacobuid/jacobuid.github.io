# Portfolio — Jacob King

An 8-bit side-scrolling résumé built with [NES.css](https://nostalgic-css.github.io/NES.css/).
Each stage of the career is a full-height scene with light snap scrolling and
parallax backdrops; all artwork is hand-drawn pixel art rendered from ASCII
grids, so there are no image assets to maintain.

```bash
npm install
npm start           # dev server
npm run build       # production build
npm run deploy      # publishes build/ to the gh-pages branch
```

## Layout

```
src/
├── data/
│   ├── timeline.js      # the résumé: main scenes + the side-quest rail
│   └── skills.js        # skill cards; [label](href) links, see RichText
├── components/
│   ├── Scene.js         # full-height stage + its five parallax layers
│   ├── LevelScene.js    # one school or job (used for every main scene)
│   ├── SideQuestScene.js# horizontal snapping timeline of concurrent roles
│   ├── SkillsScene.js   # inventory grid, opens Modal
│   ├── PixelArt.js      # ASCII grid -> run-length-encoded inline SVG
│   └── sprites/         # one sprite per file, each on the shared 40x28 grid
├── hooks/
│   ├── useSceneParallax.js  # writes --scene-progress / --scroll-progress
│   └── useActiveScene.js    # which scene the HUD is reporting
└── utils/duration.js    # date ranges + LinkedIn-style inclusive durations
```

## Adding or editing a scene

Add an entry to `src/data/timeline.js`. `end: null` means the role is current,
and its duration is computed at runtime. Education uses `precision: 'year'`,
which renders `2005 — 2009` and omits the duration chip — the résumé only gives
years for schooling, so month precision would be invented.

A scene needs a `sprite` key registered in `components/SceneSprite.js` and a
`theme` key with a palette in `App.css`.

## Drawing a sprite

Sprites are ASCII grids on a shared **40 × 28** canvas, one character per pixel,
mapped to colours by a `PALETTE` object. Characters missing from the palette
(by convention `.`) are transparent.

- **Trailing `.` padding is optional** — a short row is just transparent on the
  right, so only leading offsets need counting.
- **A row that should be empty must contain a single `.`**, not be blank: blank
  lines are stripped as template-literal noise.
- Layers of one sprite share the canvas, so they stack with `inset: 0` and line
  up pixel-for-pixel. Animate a layer with a class from `sprites/sprites.css`.

## Layout model: one centred container, full-bleed world

Each scene has two independent halves, and keeping them independent is the
whole point:

**Backdrops** are absolutely positioned, full-bleed, and tile horizontally.
They are pure decoration - nothing in the document depends on their size - and
they drift against `--scene-progress` to give the scroll its parallax.

**Everything readable** lives in `.scene__inner`, one ordinary centred
container in normal document flow:

```css
.scene__inner {
    width: min(100% - var(--gutter) * 2, var(--container));   /* 1200px */
    margin-inline: auto;
    padding: 5.25rem 0 var(--ground-h);   /* clears HUD and ground band */
}
```

The panel and the sprite are **siblings in that container**, so they lay each
other out. The sprite carries `margin-top: auto`, which parks it at the bottom
of the flow area - whose edge is the ground line. On desktop the container
becomes a flex row and they take a half each.

This replaced an earlier design where the sprite lived in its own absolutely
positioned layer and the two were kept apart by hand, with reserved padding
bands and matched offsets. That produced a string of bugs - a percentage
padding resolving against width instead of height, the panel landing on the
sprite, then a 480px void, then a `1fr` grid column growing past its share and
shoving content off screen. They were one bad structure with four symptoms.
Siblings in one container cannot overlap, so the entire class is gone.

### The ridge tiles, it does not stretch

The ridge is a `repeat-x` **mask** tile, not a stretched shape. It began as a
`clip-path` with percentage coordinates, which made the skyline twice as wide
at 1920 as at 960 - pixel art must never scale non-uniformly. Both tiles are
160x96 so one `mask-size` fits either, and being a mask means each scene still
colours its own ridge with `var(--ridge)`. Scale steps 1x / 1.5x / 2x per tier.

### Responsive tiers

Three tiers. Widths are fluid *within* each tier; the tiers change the number
of columns and whether the scene stacks.

| tier | width | scene layout | grid columns | ridge tile |
| --- | --- | --- | --- | --- |
| narrow (phone) | base | stacked | 1 | 160x96 |
| medium (tablet) | >= 768px | stacked | 2 | 240x144 |
| wide (desktop) | >= 1024px | panel beside sprite | 3 | 320x192 |

Measured, with `--container: 1200px`:

| viewport | container | backdrop | panel |
| --- | --- | --- | --- |
| 320 | 288 | 320 | 280 |
| 768 | 722 | 768 | 714 |
| 1024 | 963 | 1024 | 453 |
| 1200 | 1136 | 1200 | 536 |
| 1920 | **1200** | 1920 | 568 |
| 2560 | **1200** | 2560 | 568 |

Fluid up to 1200, fixed and centred beyond it, backdrop always full-bleed.
`--container` in `App.css` is the single knob for that.

### Gotchas worth keeping

- **`flex: 1 1 0` plus `min-width: 0`** on the two desktop halves. Without the
  `min-width: 0`, a half grows past its share to fit its content's min-content
  width and pushes the other off screen. The grid equivalent is
  `minmax(0, 1fr)`, never bare `1fr` - bare `1fr` means `minmax(auto, 1fr)`.
- **Percentage `padding` resolves against the container's WIDTH**, not height.
- **`100vw` includes the scrollbar gutter**; full-bleed is spelled `100%`.
- **`scroll-behavior: smooth` is deliberately absent** from the scroll
  container; it fights `scroll-snap-type`.
- **Testing responsiveness:** resize the window or use the DevTools device
  toolbar. Setting `html { width: 150% }` does *not* work - it widens the
  document, not the viewport, so media queries never re-evaluate, `vw` never
  changes and `position: fixed` elements stay at viewport width.

## Accessibility

`prefers-reduced-motion` disables parallax and every sprite animation. The
horizontal side-quest rail is focusable so it can be scrolled with arrow keys.
