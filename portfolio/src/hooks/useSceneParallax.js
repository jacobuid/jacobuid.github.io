import { useEffect } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Writes every scene's -1..1 progress through the viewport onto the element as
 * a `--scene-progress` custom property. Layers then parallax with a pure CSS
 * transform, so no component re-renders while scrolling.
 */
export default function useSceneParallax(scrollRef) {
    useEffect(() => {
        const scroller = scrollRef.current;
        if (scroller === null) return undefined;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;

        const paint = () => {
            frame = 0;

            const viewportHeight = scroller.clientHeight;
            if (viewportHeight === 0) return;

            if (reducedMotion.matches) return;

            scroller.querySelectorAll('.scene').forEach((scene) => {
                const bounds = scene.getBoundingClientRect();
                const sceneCenter = bounds.top + bounds.height / 2;
                const progress = clamp(
                    (viewportHeight / 2 - sceneCenter) / viewportHeight,
                    -1,
                    1
                );

                scene.style.setProperty('--scene-progress', progress.toFixed(4));
            });
        };

        const clearProgress = () => {
            scroller
                .querySelectorAll('.scene')
                .forEach((scene) => scene.style.removeProperty('--scene-progress'));
        };

        const requestPaint = () => {
            if (frame !== 0) return;
            frame = window.requestAnimationFrame(paint);
        };

        const onMotionPreferenceChange = () => {
            if (reducedMotion.matches) {
                clearProgress();
                return;
            }
            requestPaint();
        };

        requestPaint();
        scroller.addEventListener('scroll', requestPaint, { passive: true });
        window.addEventListener('resize', requestPaint);
        reducedMotion.addEventListener('change', onMotionPreferenceChange);

        return () => {
            if (frame !== 0) window.cancelAnimationFrame(frame);
            scroller.removeEventListener('scroll', requestPaint);
            window.removeEventListener('resize', requestPaint);
            reducedMotion.removeEventListener('change', onMotionPreferenceChange);
        };
    }, [scrollRef]);
}
