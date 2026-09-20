"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenScrollUnlocked } from "./scrollLock";

gsap.registerPlugin(ScrollTrigger);

/**
 * The masthead's own entrance — every section on the page opens with the
 * same kicker/title/flourish (SectionHeading), so it's the one piece of
 * text worth a dedicated, more deliberate reveal instead of just being
 * one more block in that section's uniform stagger:
 *
 *   1. the kicker steps in first, a quick beat
 *   2. the title's words pull into focus out of a soft blur one at a
 *      time (see `[data-heading-word]` in SectionHeading) — deeper blur
 *      and a longer hold than the page's usual reveal, and a per-word
 *      stagger rather than one block, reserved for the one line every
 *      section is actually named after
 *   3. the flourish beneath draws itself in from the centre outward
 *      (scaleX), like a line of ink rather than something that just fades
 *
 * Looks for `[data-heading-kicker]`, `[data-heading-title]` +
 * `[data-heading-word]`, and `[data-heading-flourish]` inside
 * containerRef; any that aren't present (e.g. kicker-only headings have
 * no title) are simply skipped.
 *
 * Plays and reverses with scroll direction (toggleActions below) rather
 * than firing once — scrolling back up to re-read a section replays the
 * same entrance instead of leaving already-revealed, static text.
 */
export function useHeadingReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const kicker = container.querySelector<HTMLElement>("[data-heading-kicker]");
    const title = container.querySelector<HTMLElement>("[data-heading-title]");
    const words = container.querySelectorAll<HTMLElement>("[data-heading-word]");
    const flourish = container.querySelector<HTMLElement>("[data-heading-flourish]");
    const titleTargets: HTMLElement[] = words.length ? Array.from(words) : title ? [title] : [];
    const parts = [kicker, ...titleTargets, flourish].filter(
      (el): el is HTMLElement => el !== null
    );
    if (parts.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      const ctx = gsap.context(() => {
        gsap.set(parts, { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" });
      }, container);
      return () => ctx.revert();
    }

    // hidden immediately — safe regardless of the cover's scroll-lock
    const setCtx = gsap.context(() => {
      if (kicker) gsap.set(kicker, { opacity: 0, y: 10 });
      if (titleTargets.length) {
        gsap.set(titleTargets, { opacity: 0, y: 20, filter: "blur(11px)" });
      }
      if (flourish) {
        gsap.set(flourish, { opacity: 0, scaleX: 0.25, transformOrigin: "50% 50%" });
      }
    }, container);

    let triggerCtx: gsap.Context | null = null;
    // deferred: see hooks/scrollLock.ts — creating the ScrollTrigger while
    // html.scroll-locked is still applied makes GSAP calculate a wrong
    // start position against a page with zero scrollable range
    const cancelWait = whenScrollUnlocked(() => {
      triggerCtx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            // replays on every crossing, either scroll direction — see
            // the matching note in useTextReveal.ts
            toggleActions: "play reverse play reverse",
          },
        });
        if (kicker) {
          tl.to(kicker, { opacity: 1, y: 0, duration: 0.4 }, 0);
        }
        if (titleTargets.length) {
          tl.to(
            titleTargets,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.12,
            },
            0.12
          );
        }
        if (flourish) {
          tl.to(
            flourish,
            { opacity: 1, scaleX: 1, duration: 0.75, ease: "power2.out" },
            0.55
          );
        }
      }, container);
    });

    return () => {
      cancelWait();
      triggerCtx?.revert();
      setCtx.revert();
    };
  }, [containerRef]);
}
