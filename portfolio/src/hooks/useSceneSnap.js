import { useCallback, useEffect, useRef } from 'react';

/**
 * Eased, one-scene-per-gesture scrolling.
 *
 * CSS scroll-snap decides its own animation duration and easing, and neither is
 * settable, so a slower glide has to be driven here. Native snapping stays on
 * for touch - it already feels right with momentum - and is switched off only
 * for the duration of a scripted scroll so the two do not fight.
 *
 * Returns `goTo(index)`, so anything that navigates between scenes - the
 * timeline rail, say - travels on this same glide rather than its own. Two
 * different scroll animations on one page read as a bug.
 */
const DURATION = 900;

/* easeInOutCubic: slow to leave, slow to arrive, quick through the middle. */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);

/** Can something under the pointer absorb this scroll instead of the page? */
const absorbedByChild = (target, delta, scroller) => {
    let node = target;

    while (node !== null && node !== scroller) {
        const style = window.getComputedStyle(node);
        const scrolls = /(auto|scroll)/.test(style.overflowY);
        const room = node.scrollHeight - node.clientHeight;

        if (scrolls && room > 1) {
            const atTop = node.scrollTop <= 0;
            const atBottom = node.scrollTop >= room - 1;
            if (!((delta < 0 && atTop) || (delta > 0 && atBottom))) return true;
        }

        node = node.parentElement;
    }

    return false;
};

export default function useSceneSnap(scrollRef) {
    const goToRef = useRef(null);

    useEffect(() => {
        const scroller = scrollRef.current;
        if (scroller === null) return undefined;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        let animating = false;

        const scenes = () => [...scroller.querySelectorAll('.scene')];

        const nearestIndex = () => {
            let best = 0;
            let bestGap = Infinity;
            scenes().forEach((scene, index) => {
                const gap = Math.abs(scene.offsetTop - scroller.scrollTop);
                if (gap < bestGap) {
                    bestGap = gap;
                    best = index;
                }
            });
            return best;
        };

        const glideTo = (top) => {
            /* Drop any glide already in flight, so a second call re-targets
               instead of two rAF loops fighting over scrollTop. */
            if (frame !== 0) {
                window.cancelAnimationFrame(frame);
                frame = 0;
                animating = false;
            }

            const from = scroller.scrollTop;
            const delta = top - from;
            if (Math.abs(delta) < 2) return;

            if (reduced.matches) {
                scroller.scrollTop = top;
                return;
            }

            animating = true;
            /* Native snap would tug against every frame we set. */
            scroller.style.scrollSnapType = 'none';
            const started = performance.now();

            const step = (now) => {
                const progress = Math.min((now - started) / DURATION, 1);
                scroller.scrollTop = from + delta * ease(progress);

                if (progress < 1) {
                    frame = window.requestAnimationFrame(step);
                    return;
                }

                scroller.style.scrollSnapType = '';
                animating = false;
                frame = 0;
            };

            frame = window.requestAnimationFrame(step);
        };

        const go = (direction) => {
            const list = scenes();
            const target = Math.min(Math.max(nearestIndex() + direction, 0), list.length - 1);
            glideTo(list[target].offsetTop);
        };

        const onWheel = (event) => {
            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
            if (absorbedByChild(event.target, event.deltaY, scroller)) return;

            event.preventDefault();
            if (animating) return;

            go(event.deltaY > 0 ? 1 : -1);
        };

        const KEYS = {
            ArrowDown: 1, PageDown: 1, ' ': 1,
            ArrowUp: -1, PageUp: -1
        };

        const onKeyDown = (event) => {
            const direction = KEYS[event.key];
            if (typeof direction === 'undefined') return;
            if (absorbedByChild(document.activeElement, direction, scroller)) return;

            event.preventDefault();
            if (animating) return;

            go(direction);
        };

        goToRef.current = (index) => {
            const list = scenes();
            const target = Math.min(Math.max(index, 0), list.length - 1);
            glideTo(list[target].offsetTop);
        };

        scroller.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown);

        return () => {
            if (frame !== 0) window.cancelAnimationFrame(frame);
            scroller.style.scrollSnapType = '';
            scroller.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            goToRef.current = null;
        };
    }, [scrollRef]);

    /* Stable identity, so a consumer can hand it straight to onClick. */
    return useCallback((index) => goToRef.current?.(index), []);
}
