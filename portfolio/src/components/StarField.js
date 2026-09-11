import { useMemo } from 'react';

/**
 * Twinkling stars for a photographed night sky.
 *
 * The artwork already has its stars painted in, and those cannot be animated,
 * so these are an overlay: small blocks on the backdrop's own pixel grid, each
 * breathing between a dim floor and full brightness on its own cycle. Some
 * fade almost to nothing and read as blinking out; others only brighten. Mixed
 * together with the painted ones, the sky reads as alive rather than as a
 * second set of stars.
 *
 * Seeded from the scene id like CloudField, so a sky is arranged the same way
 * on every visit instead of reshuffling whenever the scene is scrolled back to.
 *
 * Positions are a jittered grid rather than free random. Uniform random over
 * this few points clumps visibly - two stars land touching and the eye reads
 * the pair as one brighter dot - so the band is divided into cells and each
 * takes one star somewhere inside its own cell.
 */

const COLUMNS = 7;
const ROWS = 3;

/* Warm ones are the exception, matching the handful in the generated skies. */
const WARM = '#f7d51d';
const COOL = '#ffffff';

/** FNV-1a, as in CloudField - one stable 32-bit seed per scene id. */
const hashSeed = (text) => {
    let hash = 0x811c9dc5;

    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
    }

    return hash >>> 0;
};

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
    const stars = [];

    for (let row = 0; row < ROWS; row += 1) {
        for (let column = 0; column < COLUMNS; column += 1) {
            /* Inset from the cell edges, so neighbours cannot touch. */
            const x = ((column + 0.15 + random() * 0.7) / COLUMNS) * 100;
            const y = ((row + 0.15 + random() * 0.7) / ROWS) * 100;
            const bright = random();

            stars.push({
                key: `${row}-${column}`,
                x,
                y,
                /* A few larger, as in the artwork. */
                size: random() < 0.22 ? 2 : 1,
                colour: random() < 0.18 ? WARM : COOL,
                /* Half blink nearly out, half just brighten. */
                dim: bright < 0.5 ? 0.04 : 0.3 + bright * 0.3,
                duration: 2.4 + random() * 4.2,
                phase: random()
            });
        }
    }

    return stars;
};

function StarField({ seed }) {
    const stars = useMemo(() => scatter(seed), [seed]);

    return (
        <div className="scene__layer scene__layer--twinkle">
            {stars.map((star) => (
                <span
                    className="star"
                    key={star.key}
                    style={{
                        '--star-x': `${star.x.toFixed(2)}%`,
                        '--star-y': `${star.y.toFixed(2)}%`,
                        '--star-px': star.size,
                        '--star-colour': star.colour,
                        '--star-dim': star.dim.toFixed(2),
                        '--star-dur': `${star.duration.toFixed(2)}s`,
                        '--star-delay': `-${(star.phase * star.duration).toFixed(2)}s`
                    }}
                />
            ))}
        </div>
    );
}

export default StarField;
