import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Smooth scroll-reveal: every top-level section (plus any [data-reveal] node)
 * fades/slides in once as it enters the viewport. Runs in a layout effect so
 * the base state is applied before the first paint (no flash), and bails out
 * entirely under prefers-reduced-motion so content stays fully visible.
 */
export function useScrollReveal() {
  const location = useLocation();

  useLayoutEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('main > section, [data-reveal]'));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return;

    nodes.forEach((node) => node.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [location.pathname]);
}

export default useScrollReveal;
