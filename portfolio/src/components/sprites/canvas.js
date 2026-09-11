/**
 * The default sprite grid. Layers *within* one sprite must share a canvas so
 * they stack with `inset: 0` and line up pixel-for-pixel, but each sprite is
 * free to pick its own size - a more detailed sprite just needs a bigger
 * budget. Pass the size to PixelArt and set `--sprite-aspect` to match.
 */
export const SPRITE_COLUMNS = 40;
export const SPRITE_ROWS = 28;

export const INK = '#16161f';
