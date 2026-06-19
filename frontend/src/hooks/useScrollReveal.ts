import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    el.classList.add('reveal');
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
