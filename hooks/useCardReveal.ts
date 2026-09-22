"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenScrollUnlocked } from "./scrollLock";

gsap.registerPlugin(ScrollTrigger);

/**
 * The "floating card zooms into place" entrance every section card uses —
 * the by.memonika.com reference's signature move: each card starts
 * slightly shrunk and blurred below its resting position, then scales and
 * lifts up into focus as it crosses into view. Bidirectional (see the
 * matching note in useTextReveal.ts) so scrolling back up replays it
 * instead of leaving already-revealed cards static.
 */
export function useCardReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setCtx = gsap.context(() => {
      gsap.set(el, { opacity: 0, scale: 0.9, y: 34, filter: "blur(4px)" });
    }, el);

    let triggerCtx: gsap.Context | null = null;
    // deferred: see hooks/scrollLock.ts
    const cancelWait = whenScrollUnlocked(() => {
      triggerCtx = gsap.context(() => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        });
      }, el);
    });

    return () => {
      cancelWait();
      triggerCtx?.revert();
      setCtx.revert();
    };
  }, [ref]);
}
