/**
 * The Match app on a phone - the Match.com scene's prop, under the wordmark.
 *
 * Not an ASCII PixelArt grid like the drawn sprites: the export is a shaded
 * render rather than block art, so it ships as an image drawn with
 * `image-rendering: pixelated`, which keeps it in step with the backdrops
 * (which are upscaled the same way). The only thing done to the export was
 * sizing it for the web - 1181px of art for a prop that draws a few
 * hundred wide.
 *
 * No `--sprite-aspect`: `.sprite--image` places it with
 * `background-size: contain`, so it scales uniformly and keeps its own
 * proportions. A declared aspect would only fight that.
 *
 * The hearts are part of the picture, so unlike the browser sprite this
 * replaced, nothing here animates.
 */

function MatchCellSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{ '--image-src': `url(${process.env.PUBLIC_URL}/img/match-cell.png)` }}
        />
    );
}

export default MatchCellSprite;
