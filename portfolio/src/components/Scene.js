import CloudField from './CloudField';
import StarField from './StarField';

/**
 * One full-height stage.
 *
 * Two distinct jobs, deliberately kept apart:
 *
 *  - A scene may instead carry an illustrated `backdrop`, in which case the
 *    generated layers switch off and the artwork covers the stage. Landscape
 *    and portrait crops are supplied separately, because the scene box ranges
 *    from 0.46 to 1.78 in aspect and one `cover` image cannot serve both.
 *    `backdropSky` is the artwork's own sky colour, used to extend the image
 *    upwards when it is shorter than the scene. It is given per orientation,
 *    because two exports of one scene are not always graded alike and a single
 *    colour would band one of them. `backdropHorizon` says how
 *    far above the image's bottom edge the first non-sky pixel sits, as a
 *    multiple of the image's WIDTH - the artwork is drawn at `100% auto`, so
 *    width is the only thing that scales it, and that ratio is what lets the
 *    clouds stay above the roofline at any viewport size.
 *
 * `prop` is a second sprite that rides under the first inside the same
 * column - the Match scene's browser below its wordmark. It is a child of
 * `.scene__sprite` rather than a third column, so the two-column row at
 * desktop is unchanged, and it inherits the sign's entrance.
 *
 * `spriteAlign` decides where the sprite sits: "ground" plants it on the
 * ground line, which is right for a building; "sky" floats it up, which is
 * right for a logo.
 *
 *  - Otherwise the backdrop layers are absolutely positioned, full-bleed and
 *    tiling.
 *    They are decoration: nothing in the document depends on their size, and
 *    they drift against `--scene-progress` to give the scroll its parallax.
 *
 *  - Everything readable lives in `.scene__inner`, one ordinary centred
 *    container in normal document flow. The panel and the sprite are siblings
 *    in it, so they lay each other out and cannot overlap - no reserved bands,
 *    no matched offsets between an absolute layer and a flow one.
 *
 * `clouds` is on by default and turned off for a scene whose sky is already
 * doing the work - the St Louis sunset, where the boat is the motion instead.
 * `twinkle` overlays StarField, for a photographed night sky whose own stars
 * are painted in and so cannot move. `backdropStars` bounds it: how far down
 * the artwork's stars reach, in the same units as `backdropHorizon`. It is a
 * separate number because the horizon marks the first wide non-sky thing,
 * which on this artwork is the moon, well above the skyline.
 * `backdropBoat` gives the waterline per orientation, in the same units as
 * `backdropHorizon`, and opts the scene into the riverboat layer.
 *
 * `panelSide` says which side of the row the panel sits on, and so which side
 * the sprite takes and which side its entrance comes from. It is stated per
 * scene rather than alternated by position, because the backdrops are composed
 * around it - the subject of the artwork sits opposite the panel. Deriving it
 * from `nth-of-type` meant inserting one scene silently flipped every scene
 * after it, and put six panels over the things they were meant to sit beside.
 * Two neighbours may share a side; that is cheaper than a scene reading wrong.
 *
 * `layout` is "story" for the timeline beats, whose panel and sprite sit side
 * by side on a wide screen, or "wide" for the grid scenes, which keep one
 * column at every size so their own grids get the full container width.
 */
function Scene({
    id, theme, index, label, sprite, prop, backdrop, backdropSky, backdropHorizon,
    backdropBoat, backdropStars, clouds = true, twinkle = false, layout = 'story',
    spriteAlign = 'ground', panelSide = 'left', children
}) {
    const hasBackdrop = typeof backdrop === 'string';
    /* Drawn cutouts belong to the photo skies they were painted against; the
       generated scenes keep the tiled mask, which their palettes can tint. */
    const drawnClouds = hasBackdrop && clouds;
    const tiledClouds = !hasBackdrop;
    const hasBoat = hasBackdrop && typeof backdropBoat === 'object';
    const hasTwinkle = hasBackdrop && twinkle;

    return (
        <section
            className={
                `scene scene--${theme} scene--${layout}` +
                ` scene--sprite-${spriteAlign}` +
                ` scene--panel-${panelSide}` +
                (hasBackdrop ? ' scene--photo' : '')
            }
            id={id}
            data-scene-index={index}
            aria-label={label}
            style={
                hasBackdrop
                    ? {
                          '--backdrop-landscape': `url(${process.env.PUBLIC_URL}/img/${backdrop}-landscape.png)`,
                          '--backdrop-portrait': `url(${process.env.PUBLIC_URL}/img/${backdrop}-portrait.png)`,
                          '--sky-landscape': backdropSky?.landscape,
                          '--sky-portrait': backdropSky?.portrait,
                          '--horizon-landscape': backdropHorizon?.landscape,
                          '--horizon-portrait': backdropHorizon?.portrait,
                          '--stars-landscape': backdropStars?.landscape,
                          '--stars-portrait': backdropStars?.portrait,
                          '--boat-landscape': backdropBoat?.landscape,
                          '--boat-portrait': backdropBoat?.portrait,
                          '--boat-frame-1': `url(${process.env.PUBLIC_URL}/img/boat-1.png)`,
                          '--boat-frame-2': `url(${process.env.PUBLIC_URL}/img/boat-2.png)`
                      }
                    : undefined
            }
        >
            <div className="scene__layer scene__layer--backdrop" />
            <div className="scene__layer scene__layer--sky" />
            <div className="scene__layer scene__layer--stars" />

            {hasTwinkle && <StarField seed={id} />}
            {drawnClouds && <CloudField seed={id} />}
            {tiledClouds && <div className="scene__layer scene__layer--clouds" />}

            {hasBoat && (
                <div className="scene__layer scene__layer--boat">
                    <span className="boat" />
                </div>
            )}

            <div className="scene__layer scene__layer--ridge" />
            <div className="scene__layer scene__layer--landmark" />
            <div className="scene__layer scene__layer--ground" />

            <div className="scene__inner">
                <div className="scene__panel">{children}</div>

                {sprite && (
                    <div className="scene__sprite">
                        {sprite}
                        {prop && <div className="scene__prop">{prop}</div>}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Scene;
