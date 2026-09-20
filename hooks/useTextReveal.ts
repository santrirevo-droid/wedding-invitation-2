"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Eight distinct reveal styles, one assigned per section (see each
 * section's <AnimatedWords>) so the page doesn't read as one animation
 * copy-pasted eight times — each still shares the same underlying
 * mechanic (word-group stagger, ScrollTrigger, once) so the variety
 * reads as "considered" rather than "inconsistent".
 */
export type TextRevealVariant =
  | "rise"
  | "blur"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "tilt"
  | "unfold"
  | "drift";

const VARIANTS: Record<
  TextRevealVariant,
  { from: gsap.TweenVars; duration: number; ease: string; stagger: number }
> = {
  // Wishes — quick, crisp, a touch of blur; the everyday "content arriving" beat
  rise: { from: { opacity: 0, y: 20, filter: "blur(5px)" }, duration: 0.65, ease: "power3.out", stagger: 0.07 },
  // Ayat Pembuka — a slow unveiling, nothing moves, it just comes into focus
  blur: { from: { opacity: 0, filter: "blur(11px)" }, duration: 0.9, ease: "power2.out", stagger: 0.1 },
  // Mempelai — reserved for the intro line; groups arrive from the left
  slideLeft: { from: { opacity: 0, x: -26 }, duration: 0.6, ease: "power3.out", stagger: 0.06 },
  // RSVP — groups arrive from the right, like something being handed over
  slideRight: { from: { opacity: 0, x: 26 }, duration: 0.6, ease: "power3.out", stagger: 0.06 },
  // Acara's dark band — a little pop, matching the section's own drama
  scale: { from: { opacity: 0, scale: 0.78 }, duration: 0.55, ease: "back.out(1.7)", stagger: 0.08 },
  // Moments — a gentle, imperfect tilt settling straight, like a photo being placed down
  tilt: { from: { opacity: 0, y: 14, rotate: -3.5 }, duration: 0.65, ease: "power2.out", stagger: 0.07 },
  // Kisah Kami — each phrase unfurls vertically, like turning a page
  unfold: { from: { opacity: 0, scaleY: 0.35, y: 8 }, duration: 0.5, ease: "power2.out", stagger: 0.085 },
  // Footer — slow and soft, the valedictory beat that closes the page
  drift: { from: { opacity: 0, y: 26, filter: "blur(8px)" }, duration: 1.05, ease: "power1.out", stagger: 0.11 },
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

    const ctx = gsap.context(() => {
      gsap.set(groups, {
        transformOrigin: variant === "unfold" ? "top center" : "50% 50%",
        ...cfg.from,
      });
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
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
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, [ref, variant]);
}
