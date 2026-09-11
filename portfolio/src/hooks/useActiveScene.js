import { useEffect, useState } from 'react';

/**
 * Watches the scenes for two things at once, from a single observer:
 *
 *  - which scene fills most of the viewport, for the HUD read-out
 *  - which scenes are on screen at all, marked with `is-onscreen`
 *  - which scene the snap has landed on, marked with `is-settled`
 *
 * The two classes are deliberately different triggers. `is-onscreen` fires on
 * the first visible pixel, which is what animation pausing wants; an entrance
 * keyed to it would have played itself out before the scene arrived, so those
 * use `is-settled` and start partway through the scroll instead.
 *
 * The second matters for performance. Every sprite layer and cloud row is a
 * running CSS animation, and with thirteen scenes that is around forty of them
 * compositing at once even though twelve scenes are off screen. Scoping the
 * animations to `.is-onscreen` keeps only the visible handful running.
 */
export default function useActiveScene(scrollRef) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const scroller = scrollRef.current;
        if (scroller === null) return undefined;

        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const settled = entry.intersectionRatio >= 0.55;

                    entry.target.classList.toggle('is-onscreen', entry.isIntersecting);
                    entry.target.classList.toggle('is-settled', settled);

                    if (!settled) return;

                    const index = Number(entry.target.dataset.sceneIndex);
                    if (Number.isNaN(index)) return;

                    setActiveIndex(index);
                });
            },
            { root: scroller, threshold: [0, 0.55] }
        );

        scroller.querySelectorAll('.scene').forEach((scene) => observer.observe(scene));

        return () => observer.disconnect();
    }, [scrollRef]);

    return activeIndex;
}
