/**
 * A Dell tower and monitor running the WordPress dashboard - the
 * Marketicity scene's prop, under the wordmark. The internship was
 * WordPress template work, so the rig is the job.
 *
 * Not an ASCII PixelArt grid like the drawn sprites: the export is a shaded
 * render rather than block art, so it ships as an image drawn with
 * `image-rendering: pixelated`, which keeps it in step with the backdrops
 * (which are upscaled the same way). The only thing done to the export was
 * sizing it for the web - 1108px of art for a prop that draws a few
 * hundred wide.
 *
 * No `--sprite-aspect`: `.sprite--image` places it with
 * `background-size: contain`, so it scales uniformly and keeps its own
 * proportions. A declared aspect would only fight that.
 */

function DellWpSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{ '--image-src': `url(${process.env.PUBLIC_URL}/img/dell-wp.png)` }}
        />
    );
}

export default DellWpSprite;
