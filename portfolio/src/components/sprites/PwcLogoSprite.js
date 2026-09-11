/**
 * The PwC mark and wordmark - the PricewaterhouseCoopers scene's sign,
 * over the Dallas skyline the Trammell Crow Center stands in.
 *
 * Shipped as the export itself, resized, rather than traced into a PixelArt
 * grid: this logo is not drawn on a consistent block grid - no spacing divides
 * its edges cleanly - so a trace would invent a grid that is not there and
 * alias the letterforms instead of preserving them.
 *
 * `.sprite--image` draws it with `background-size: contain`, so it scales
 * uniformly and keeps its own proportions.
 *
 * `--sprite-aspect` IS declared here, unlike on the props: without it the box
 * falls back to 40/28, which for a sign this wide leaves a band of empty
 * letterbox above the artwork and pushes it down the sky. Matching the box to
 * the art means its top edge is the artwork's top edge.
 */

function PwcLogoSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{
                '--sprite-aspect': '400 / 238',
                '--image-src': `url(${process.env.PUBLIC_URL}/img/pwc-logo.png)`
            }}
        />
    );
}

export default PwcLogoSprite;
