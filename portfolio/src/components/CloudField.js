import { useMemo } from 'react';

/**
 * The drifting sky for the photo scenes.
 *
 * The generated scenes tile one masked cloud shape, which lets them tint it
 * per palette (see --cloud-color). The photographed scenes cannot use that:
 * their sky is finished artwork, so the clouds are the hand-drawn sprites cut
 * out of clouds.png instead, scattered and crossing at their own speeds.
 *
 * The scatter is seeded from the scene id rather than Math.random, so a given
 * sky is arranged the same way on every load - two scenes get different
 * weather, but a scene does not rearrange itself when you scroll back to it.
 *
 * Size is not a property either: the CSS draws each sprite at its own pixel
 * width times the backdrop's pixel size, so a cloud block and an artwork block
 * are the same size on screen and the sky reads as one drawing. That means the
 * clouds' relative sizes are exactly as they were drawn, and the only thing
 * left to vary is how fast each one crosses - wider reads as nearer, so it
 * goes faster.
 *
 * Horizontal position is not a property at all: every cloud starts just off
 * the right edge and crosses to just off the left, and a negative
 * animation-delay drops it partway through that journey. So the phase both
 * places the cloud and keeps it moving, and the sky is already populated on
 * the first frame instead of filling up over two minutes.
 */

/* Emitted by scratchpad/cut-clouds.py - do not hand-edit. */
const CLOUDS = [
    { src: 'cloud-1', width: 114, height: 47 },
    { src: 'cloud-2', width: 128, height: 46 },
    { src: 'cloud-3', width: 91, height: 34 },
    { src: 'cloud-4', width: 94, height: 34 },
    { src: 'cloud-5', width: 50, height: 21 },
    { src: 'cloud-6', width: 141, height: 42 },
    { src: 'cloud-7', width: 104, height: 21 }
];

/** How many are in flight. Fewer than this are on screen at any instant -
    each one spends part of its cycle off the edges. */
const IN_FLIGHT = CLOUDS.length;

/** The widest sprite, so width can stand in for how near a cloud reads. */
const WIDEST = Math.max(...CLOUDS.map((cloud) => cloud.width));

/** FNV-1a: maps a scene id to a stable 32-bit seed. */
const hashSeed = (text) => {
    let hash = 0x811c9dc5;

    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
    }

    return hash >>> 0;
};

/** mulberry32 - four lines, and plenty for scattering seven clouds. */
const makeRandom = (seed) => {
    let state = seed;

    return () => {
        state = (state + 0x6d2b79f5) >>> 0;
        let value = Math.imul(state ^ (state >>> 15), 1 | state);
        value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
};

const scatter = (seed) => {
    const random = makeRandom(hashSeed(seed));
    const deck = [...CLOUDS];

    /* Fisher-Yates. All seven fly, so this decides which height band each one
       gets - the same clouds, stacked differently, per scene. */
    for (let index = deck.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(random() * (index + 1));
        [deck[index], deck[swap]] = [deck[swap], deck[index]];
    }

    /* One cloud per horizontal band, jittered within it, so a seed cannot
       stack two of them on the same line. Bands run from just above the
       horizon to two thirds up, measured from the bottom: anchoring by
       `bottom` means a tall cloud clips off the top of the screen, which
       looks like weather, rather than off the horizon, which looks broken. */
    const band = 62 / IN_FLIGHT;

    return deck.slice(0, IN_FLIGHT).map((cloud, index) => {
        /* Wider reads as nearer, so it crosses faster. */
        const nearness = cloud.width / WIDEST;

        return {
            ...cloud,
            bottom: 4 + (index + random() * 0.8) * band,
            duration: 150 - nearness * 70,
            phase: random()
        };
    });
};

function CloudField({ seed }) {
    const clouds = useMemo(() => scatter(seed), [seed]);

    return (
        <div className="scene__layer scene__layer--clouds">
            {clouds.map((cloud) => (
                <span
                    className="cloud"
                    key={cloud.src}
                    style={{
                        '--cloud-src': `url(${process.env.PUBLIC_URL}/img/${cloud.src}.png)`,
                        '--cloud-px': cloud.width,
                        '--cloud-ar': `${cloud.width} / ${cloud.height}`,
                        '--cloud-y': `${cloud.bottom.toFixed(1)}%`,
                        '--cloud-dur': `${cloud.duration.toFixed(0)}s`,
                        '--cloud-delay': `-${(cloud.phase * cloud.duration).toFixed(1)}s`
                    }}
                />
            ))}
        </div>
    );
}

export default CloudField;
