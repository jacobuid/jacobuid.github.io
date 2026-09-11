/**
 * The USAA eagle and wordmark - the USAA scene's sign, over the San Antonio
 * campus.
 *
 * Shipped as the export itself, resized, rather than traced into a PixelArt
 * grid: the logo is not drawn on a consistent block grid, so a trace would
 * invent one and alias the letterforms.
 *
 * `--sprite-aspect` is declared so the box hugs the artwork: without it the box
 * falls back to 40/28 and `contain` centres the art inside, leaving empty
 * letterbox that pushes the sign down out of the sky.
 */

function UsaaLogoSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{
                '--sprite-aspect': '300 / 107',
                '--image-src': `url(${process.env.PUBLIC_URL}/img/usaa-logo.png)`
            }}
        />
    );
}

export default UsaaLogoSprite;
