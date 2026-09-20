"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenScrollUnlocked } from "./scrollLock";

gsap.registerPlugin(ScrollTrigger);

/**
 * Nine distinct reveal styles, one assigned per section (see each
 * section's <AnimatedWords>) so the page doesn't read as one animation
 * copy-pasted nine times — each still shares the same underlying
 * mechanic (word-group stagger, ScrollTrigger, once) so the variety
 * reads as "considered" rather than "inconsistent".
 *
 * Deliberately bold: an earlier, subtler pass (small 20-26px moves,
 * gentle eases) mostly happened at the very bottom edge of the screen
 * and finished before the section was comfortably in view, so it read
 * as "nothing happened". These are 2-4x the distance/rotation and use
 * springier eases (back.out, elastic.out) specifically so the motion is
 * unmistakable mid-scroll, not just a discreet fade.
 */
export type TextRevealVariant =
  | "popIn"
  | "blurZoom"
  | "slideLeft"
  | "slideRight"
  | "popUp"
  | "elasticDrop"
  | "unfold"
  | "rise"
  | "drift";

const VARIANTS: Record<
  TextRevealVariant,
  { from: gsap.TweenVars; duration: number; ease: string; stagger: number }
> = {
  // Hero — the very first text on the page; a confident bounce-in
  popIn: { from: { opacity: 0, scale: 0.4, rotate: -6 }, duration: 0.65, ease: "back.out(2.6)", stagger: 0.09 },
  // Ayat Pembuka — an unveiling with a slow zoom, not just a blur
  blurZoom: { from: { opacity: 0, scale: 1.18, filter: "blur(14px)" }, duration: 1.0, ease: "power2.out", stagger: 0.1 },
  // Mempelai — groups slide in hard from the left, with a slight tilt
  slideLeft: { from: { opacity: 0, x: -95, rotate: -3 }, duration: 0.7, ease: "power3.out", stagger: 0.07 },
  // RSVP — groups slide in hard from the right, like being handed over
  slideRight: { from: { opacity: 0, x: 95, rotate: 3 }, duration: 0.7, ease: "power3.out", stagger: 0.07 },
  // Acara's dark band — a literal pop, overshooting past full size before settling
  popUp: { from: { opacity: 0, scale: 0.3, y: 26 }, duration: 0.7, ease: "back.out(2.4)", stagger: 0.09 },
  // Moments — drops in from above with a springy wobble, like a photo falling into place
  elasticDrop: { from: { opacity: 0, y: -50, rotate: -8 }, duration: 0.95, ease: "elastic.out(1, 0.55)", stagger: 0.1 },
  // Kisah Kami — each phrase unfurls vertically, like turning a page
  unfold: { from: { opacity: 0, scaleY: 0.12, y: 18 }, duration: 0.65, ease: "power2.out", stagger: 0.09 },
  // Wishes — quick and crisp, the everyday "content arriving" beat
  rise: { from: { opacity: 0, y: 34, filter: "blur(6px)" }, duration: 0.75, ease: "power3.out", stagger: 0.08 },
  // Footer — slow and soft, the valedictory beat that closes the page
  drift: { from: { opacity: 0, y: 44, filter: "blur(12px)" }, duration: 1.2, ease: "power1.out", stagger: 0.12 },
};

/**
 * Scans `ref`'s subtree for `[data-word-group]` spans (see AnimatedWords)
 * and reveals them in a stagger once the container crosses into view.
 * Skipped entirely under prefers-reduced-motion — groups are visible from
 * the start in that case since AnimatedWords doesn't hide them via CSS,
 * only via the tween this sets up.
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  variant: TextRevealVariant = "rise"
) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = container.querySelectorAll<HTMLElement>("[data-word-group]");
    if (!groups.length) return;

    const cfg = VARIANTS[variant];

    // hidden immediately — a plain style set, safe regardless of the
    // cover's scroll-lock state (unlike ScrollTrigger.create below, this
    // doesn't need to measure scrollable range)
    gsap.set(groups, {
      transformOrigin: variant === "unfold" ? "top center" : "50% 50%",
      ...cfg.from,
    });

    let ctx: gsap.Context | null = null;
    // creating the ScrollTrigger itself has to wait: doing it while the
    // cover's scroll-lock is still applied makes GSAP calculate this
    // trigger's start position against a page with zero scrollable range,
    // so it reads as "already scrolled past" and once:true fires it
    // immediately instead of waiting for a real scroll
    const cancelWait = whenScrollUnlocked(() => {
      ctx = gsap.context(() => {
        gsap.to(groups, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          scaleY: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: cfg.duration,
          ease: cfg.ease,
          stagger: cfg.stagger,
          scrollTrigger: {
            trigger: container,
            // 75%, not 85% — the earlier value fired right as the element
            // was still peeking in at the very bottom edge of the screen,
            // so by the time it scrolled up to a readable position the
            // animation had already finished playing unseen
            start: "top 75%",
            // no once:true — replays every time the container crosses
            // into view from either direction (scrolling down past the
            // top, or scrolling back up past the bottom) and reverses
            // back to hidden when it leaves, so a visitor who scrolls up
            // to re-read a section sees the same entrance again instead
            // of static already-revealed text
            toggleActions: "play reverse play reverse",
          },
        });
      }, container);
    });

    return () => {
      cancelWait();
      ctx?.revert();
    };
  }, [ref, variant]);
}
