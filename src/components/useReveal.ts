'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(stagger = 0): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!ref.current) return;

        const targets = stagger > 0
          ? Array.from(ref.current.children) as HTMLElement[]
          : ref.current;

        const tween = gsap.fromTo(
          targets,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            stagger: stagger || undefined,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        );

        return () => { tween.kill(); };
      });
    });
  }, [stagger]);

  return ref;
}
