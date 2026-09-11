/**
 * The ARGO wordmark - the Argo Data scene's sign, over the office the
 * job was actually done in.
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

function ArgoLogoSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{
                '--sprite-aspect': '520 / 108',
                '--image-src': `url(${process.env.PUBLIC_URL}/img/argo-logo.png)`
            }}
        />
    );
}

export default ArgoLogoSprite;
