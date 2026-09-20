"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenScrollUnlocked } from "./scrollLock";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  /** px to rise from */
  y?: number;
  duration?: number;
  /** stagger between matched children, in seconds */
  stagger?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** selector (within the container) for the elements to stagger in; falls back to the container itself */
  selector?: string;
  /** resting opacity once revealed — lets ambient washes settle at their intended faintness instead of snapping to fully opaque */
  opacity?: number;
  /** starting scale, eases up to 1 */
  scale?: number;
  /** starting blur in px, clearing to 0 as the element settles — the
   * "soft focus pulling sharp" read that makes this a cinematic entrance
   * rather than a flat fade. Set to 0 to opt out (e.g. for a section whose
   * content shouldn't ever look soft, if one ever needs that). */
  blur?: number;
};

/**
 * Generic "section entrance" reveal: elements blur into focus while they
 * fade, rise and settle into scale, once, when scrolled into view. Driven
 * by GSAP ScrollTrigger (not scrub — this plays once, unlike the Hero's
 * pinned scroll-reveal timeline).
 */
export function useRevealOnScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    y = 22,
    duration = 0.7,
    stagger = 0.08,
    start = "top 82%",
    selector = "[data-reveal]",
    opacity = 1,
    scale = 0.97,
    blur = 7,
  }: RevealOptions = {}
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const ctx = gsap.context(() => {
        const matched = gsap.utils.toArray<HTMLElement>(selector);
        const els = matched.length ? matched : [container];
        gsap.set(els, { opacity, y: 0, scale: 1, filter: "blur(0px)" });
      }, container);
      return () => ctx.revert();
    }

    // set the hidden starting state immediately (safe regardless of the
    // cover's scroll-lock — no ScrollTrigger measurement involved yet)
    const setCtx = gsap.context(() => {
      const matched = gsap.utils.toArray<HTMLElement>(selector);
      const els = matched.length ? matched : [container];
      gsap.set(els, { opacity: 0, y, scale, filter: `blur(${blur}px)` });
    }, container);

    let triggerCtx: gsap.Context | null = null;
    // deferred: creating the ScrollTrigger while html.scroll-locked is
    // still applied makes GSAP calculate its start position against a
    // page with zero scrollable range, so once:true fires it immediately
    // instead of waiting for a real scroll (see hooks/scrollLock.ts)
    const cancelWait = whenScrollUnlocked(() => {
      triggerCtx = gsap.context(() => {
        const matched = gsap.utils.toArray<HTMLElement>(selector);
        const els = matched.length ? matched : [container];
        gsap.to(els, {
          opacity,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start,
            // replays on every crossing, either scroll direction — see
            // the matching note in useTextReveal.ts
            toggleActions: "play reverse play reverse",
          },
        });
      }, container);
    });

    return () => {
      cancelWait();
      triggerCtx?.revert();
      setCtx.revert();
    };
  }, [containerRef, y, duration, stagger, start, selector, opacity, scale, blur]);
}
