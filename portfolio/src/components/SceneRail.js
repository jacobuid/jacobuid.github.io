import { useEffect, useRef, useState } from 'react';
import './SceneRail.css';

/**
 * Fixed timeline down the left edge: one stop per scene, click to travel there.
 *
 * The stops are bare markers until hovered or focused, when the scene's tag and
 * title slide out to the right. Keeping the writing out until then is what lets
 * the rail sit over the artwork without competing with it - at rest it reads as
 * a column of markers, and only the one you are pointing at says anything.
 *
 * Travel goes through `onSelect`, which is wired to the same eased glide the
 * wheel and arrow keys use, so arriving by rail feels identical to scrolling.
 *
 * The labels are in the document rather than swapped in on hover, so they are
 * available to a screen reader and to keyboard focus; only their opacity and
 * offset change. `aria-current` marks the scene you are on.
 *
 * Left alone for a while it dims to half, so it stops pulling at the eye while
 * you are reading a scene, and comes back the moment the pointer returns.
 */

/* How long the pointer has to stay away before the rail dims. */
const IDLE_AFTER = 5000;

function SceneRail({ scenes, activeIndex, onSelect }) {
    const [idle, setIdle] = useState(false);
    const timer = useRef(0);

    useEffect(() => {
        /* Dim on arrival too, not just after the first hover - otherwise it sits
           at full strength until the pointer has been over it once. */
        timer.current = window.setTimeout(() => setIdle(true), IDLE_AFTER);
        return () => window.clearTimeout(timer.current);
    }, []);

    const onWake = () => {
        window.clearTimeout(timer.current);
        setIdle(false);
    };

    const onRest = () => {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setIdle(true), IDLE_AFTER);
    };

    return (
        <nav
            className={`rail${idle ? ' rail--idle' : ''}`}
            aria-label="Scene timeline"
            onPointerEnter={onWake}
            onPointerLeave={onRest}
            onFocus={onWake}
            onBlur={onRest}
        >
            <ol className="rail__track">
                {scenes.map((scene, index) => (
                    <li className="rail__stop" key={scene.id}>
                        <button
                            className="rail__button"
                            type="button"
                            aria-current={index === activeIndex ? 'true' : undefined}
                            onClick={() => onSelect(index)}
                        >
                            <span className="rail__marker" aria-hidden="true" />

                            <span className="rail__flyout">
                                <span className="rail__tag">{scene.tag}</span>
                                <span className="rail__name">{scene.name}</span>
                            </span>
                        </button>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default SceneRail;
