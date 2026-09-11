import { useState } from 'react';
import Scene from './Scene';
import { formatDuration, formatRange } from '../utils/duration';
import './SideQuestScene.css';

/**
 * The concurrent and part-time roles, as a carousel that wraps round.
 *
 * They overlapped the main path instead of following it, so they get their own
 * axis rather than a slot in the vertical sequence - and a ring rather than a
 * strip, because there is no first or last side quest, just a set of them.
 *
 * Every card is rendered; what changes is each one's offset from the middle.
 * That offset is taken the short way round the ring, so stepping past the last
 * card gives the first card an offset of +1 rather than sending it back across
 * the whole set. The wrap happens on a card two places out, which is already
 * transparent, so it is never seen jumping.
 *
 * The neighbours are the controls: clicking the card to either side brings it
 * in. They carry a button covering the card rather than being buttons
 * themselves, because a card holds a heading and a button may only hold
 * phrasing content - and it makes the whole card the hit area, which is what
 * the eye expects when a card is offered to be clicked.
 */

/** How far from the middle a card can be and still be drawn. */
const VISIBLE_DEPTH = 1;

/**
 * A card's position relative to the middle, taken the short way round.
 * With five quests this gives -2..2, so the two furthest sit off stage.
 */
const offsetFromMiddle = (index, middle, count) => {
    const raw = index - middle;
    const half = count / 2;

    if (raw > half) return raw - count;
    if (raw < -half) return raw + count;
    return raw;
};

function SideQuestScene({ quests, index }) {
    const [middle, setMiddle] = useState(0);

    const step = (direction) => {
        /* + count before the modulo, so stepping back from the first card
           lands on the last rather than on -1. */
        setMiddle((current) => (current + direction + quests.length) % quests.length);
    };

    return (
        <Scene
            id="side-quests"
            theme="quest"
            index={index}
            layout="wide"
            label="Side quests: concurrent and part-time work"
            backdrop="side-quest"
            /* Sampled from the artwork's own top edge, which is flat sky. */
            backdropSky={{ landscape: '#1eb0fd', portrait: '#1eb0fd' }}
            backdropHorizon={{ landscape: 0.528, portrait: 1.994 }}
            /* The meadow already has clouds painted into it. */
            clouds={false}
        >
            <section className="quests">
                <div className="nes-balloon from-left quests__header">
                    <h2 className="quests__title">Side Quests</h2>

                    <p className="quests__stage">
                        BONUS STAGE — ran alongside the main path
                    </p>

                    <p className="quests__hint">
                        Click a card either side to bring it round ←→
                    </p>
                </div>

                <div className="carousel">
                    <ul className="carousel__ring">
                        {quests.map((quest, position) => {
                            const offset = offsetFromMiddle(position, middle, quests.length);
                            const depth = Math.abs(offset);
                            const isMiddle = depth === 0;
                            const isNeighbour = depth === VISIBLE_DEPTH;

                            return (
                                <li
                                    className="carousel__slot"
                                    key={quest.id}
                                    style={{ '--offset': offset }}
                                    data-depth={Math.min(depth, VISIBLE_DEPTH + 1)}
                                    aria-hidden={isMiddle ? undefined : 'true'}
                                >
                                    <article className="nes-container is-rounded is-dark carousel__card">
                                        <p className="carousel__year">{quest.start.year}</p>
                                        <h3 className="carousel__title">{quest.title}</h3>
                                        <p className="carousel__role">{quest.role}</p>
                                        <p className="carousel__meta">
                                            {formatRange(quest.start, quest.end)}
                                            <span className="carousel__time">
                                                {formatDuration(quest.start, quest.end)}
                                            </span>
                                        </p>
                                        <p className="carousel__place">{quest.place}</p>
                                        <p className="carousel__body">{quest.summary}</p>
                                    </article>

                                    {isNeighbour && (
                                        <button
                                            className="carousel__grab"
                                            type="button"
                                            onClick={() => step(offset)}
                                        >
                                            {offset < 0 ? 'Previous' : 'Next'} side quest:{' '}
                                            {quest.title}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </Scene>
    );
}

export default SideQuestScene;
