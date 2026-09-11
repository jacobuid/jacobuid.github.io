/**
 * The RealPage wordmark - the RealPage scene's sign, over the office lobby.
 *
 * Shipped as the export itself, resized, rather than traced into a PixelArt
 * grid: the logo is not drawn on a consistent block grid, so a trace would
 * invent a grid that is not there and alias the letterforms.
 *
 * The lettering stays white, as exported. That is low contrast against the
 * pale ceiling band the sign hangs in front of - `size-image.py` can recolour
 * it with `--ink light --ink-to`, which is how pwc-logo is handled in the
 * other direction - but white is the wanted look here.
 *
 * `--sprite-aspect` is declared so the box hugs the artwork: without it the
 * box falls back to 40/28 and `contain` centres the art inside, leaving a band
 * of empty letterbox that pushes the sign down the scene.
 */

function RealpageLogoSprite() {
    return (
        <div
            className="sprite sprite--image"
            style={{
                '--sprite-aspect': '460 / 180',
                '--image-src': `url(${process.env.PUBLIC_URL}/img/realpage-logo.png)`
            }}
        />
    );
}

export default RealpageLogoSprite;
