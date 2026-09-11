import Scene from './Scene';
import SceneSprite from './SceneSprite';
import { formatDuration, formatRange, formatYearRange } from '../utils/duration';
import './LevelScene.css';

/** One school or job: the repeating beat of the timeline. */
function LevelScene({ entry, index }) {
    const isYearOnly = entry.precision === 'year';
    const dateLabel = isYearOnly
        ? formatYearRange(entry.start, entry.end)
        : formatRange(entry.start, entry.end);

    return (
        <Scene
            id={entry.id}
            theme={entry.theme}
            index={index}
            label={`${entry.title} — ${entry.role}`}
            sprite={entry.sprite && <SceneSprite name={entry.sprite} />}
            prop={entry.prop && <SceneSprite name={entry.prop} />}
            backdrop={entry.backdrop}
            backdropSky={entry.backdropSky}
            backdropHorizon={entry.backdropHorizon}
            backdropBoat={entry.backdropBoat}
            backdropStars={entry.backdropStars}
            clouds={entry.clouds}
            twinkle={entry.twinkle}
            spriteAlign={entry.spriteAlign}
            panelSide={entry.panelSide}
        >
            <article className="nes-container is-dark is-rounded with-title panel level">
                <p className="title">{entry.title}</p>

                <span className="panel__level">
                    LEVEL {entry.level} — {entry.flavor}
                </span>

                <h2 className="panel__role">{entry.role}</h2>

                <p className="panel__meta">
                    <span className="level__stat">{dateLabel}</span>
                    {!isYearOnly && (
                        <span className="level__stat level__stat--time">
                            {formatDuration(entry.start, entry.end)}
                        </span>
                    )}
                    <span className="level__stat">{entry.place}</span>
                </p>

                <p className="panel__body">{entry.summary}</p>

                <ul className="drops">
                    {entry.drops.map((drop) => (
                        <li className="drops__item" key={drop}>
                            {drop}
                        </li>
                    ))}
                </ul>

                {typeof entry.exit === 'string' && (
                    <p className="panel__exit">EXIT — {entry.exit}</p>
                )}
            </article>
        </Scene>
    );
}

export default LevelScene;
