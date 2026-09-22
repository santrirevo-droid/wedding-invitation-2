"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { easeInOutCubic } from "@/lib/easing";
import { notifyScrollUnlocked } from "./scrollLock";
import type { CoverRefs } from "./useCoverRefs";

gsap.registerPlugin(ScrollTrigger);

/**
 * Orchestrates the "Buka Undangan" cover animation (Tahap 2): scroll
 * locks, music starts, the curtain video plays, a soft glow blooms and
 * the title lifts with a gentle zoom — then scroll unlocks and a "scroll
 * down" cue fades in, matching the by.memonika.com reference: the
 * visitor is invited to continue rather than carried through the whole
 * page automatically. Skipped under reduced-motion so those visitors
 * keep manual control throughout.
 *
 * Kept separate from the Hero markup so the animation timeline can
 * be tuned without touching layout/JSX.
 */
export function useOpenInvitation(refs: CoverRefs) {
  const [isOpened, setIsOpened] = useState(false);
  const isAnimating = useRef(false);
  const lenis = useLenis();

  // scroll stays locked to the cover until "Buka Undangan" is pressed — a
  // guest can't scroll (and thus can't dodge) past it, and the CTA tap is
  // also a real click, which is the one gesture mobile browsers reliably
  // accept for unlocking audio playback.
  //
  // The CSS class alone isn't enough: Lenis drives scroll itself (it
  // intercepts wheel/touch and calls its own scrollTo), so a wheel/touch
  // event still moves the page even with html.scroll-locked's overflow:
  // hidden in place. lenis.stop() is what actually halts Lenis's internal
  // scroll loop; the class is kept alongside it for the CSS-only fallback
  // (no-JS, or before Lenis has initialised) and for the overflow-hidden
  // visual it provides during the reveal animation.
  useEffect(() => {
    document.documentElement.classList.add("scroll-locked");
    lenis?.stop();
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      lenis?.start();
    };
  }, [lenis]);

  // the couple's name is three lines (groom / "&" / bride) — hide each one
  // immediately so open()'s timeline below can bring them in one at a time
  // instead of the whole block appearing pre-set and only scale-popping
  // as a single fused unit
  useEffect(() => {
    const lines = refs.title.current?.children;
    if (!lines?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(lines, { opacity: 0, y: 22 });
  }, [refs.title]);

  // React Compiler can't reconcile this callback's refs.title.current read
  // with the mount effect above also reading refs.title.current, and skips
  // optimizing it — harmless here since `refs` (from useCoverRefs) is a new
  // object every render anyway, so this callback was never actually stable
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const open = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpened(true);

    // already locked by the mount effect above; scroll stays locked
    // through the reveal animation and is released in onComplete below
    refs.music.current?.play();

    const titleEl = refs.title.current;
    const titleLines = titleEl?.children ?? [];

    // "Tersingkap": the actual curtain-parting clip (see Hero's
    // background video) plays instead of the old CSS corner-floral
    // tween — real footage of curtains drawing back and flowers
    // blooming in, rather than four PNG corners nudged outward as a
    // stand-in for it. play() can reject if the browser hasn't
    // finished buffering yet; that's fine, it just stays on its
    // poster frame rather than blocking the rest of open().
    refs.video.current?.play().catch(() => {});

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .set(refs.button.current, { pointerEvents: "none" }, 0)
      .to(refs.button.current, { opacity: 0, y: 12, duration: 0.35 }, 0)
      .to(refs.glow.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, 0)
      .fromTo(
        titleEl,
        { scale: 0.94 },
        { scale: 1.05, duration: 0.45, ease: "power2.out" },
        0.1
      )
      .to(titleEl, { scale: 1, duration: 0.55, ease: "power2.inOut" }, 0.55)
      .to(
        titleLines,
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12 },
        0.15
      )
      .to(refs.glow.current, { opacity: 0, duration: 0.55, ease: "power1.in" }, 0.75)
      // hold through the rest of the curtain clip (parts by ~3s — see
      // public/video/cover-open.mp4) before inviting the visitor onward,
      // rather than releasing the instant the text has popped in
      .to({}, { duration: 0 }, 3)
      // the by.memonika.com reference's move: once the cover has settled,
      // a "scroll down" cue fades in and the visitor continues on their
      // own terms — see scrollToNext below — instead of being carried
      // through the whole page by an autoscroll tour.
      //
      // The unlock itself runs via .call() at this same position (3),
      // not the timeline's onComplete (which wouldn't fire until the
      // opacity fade-in tween below finishes ~0.6s later) — otherwise
      // the cue sits there looking tappable (pointer-events already on)
      // while lenis is still stopped, so an early tap silently does
      // nothing.
      .set(refs.scrollCue.current, { pointerEvents: "auto" }, 3)
      .call(
        () => {
          document.documentElement.classList.remove("scroll-locked");
          lenis?.start();

          // Tell every reveal hook waiting on whenScrollUnlocked() (see
          // hooks/scrollLock.ts) that it's now safe to create its
          // ScrollTrigger — the page genuinely has scrollable range to
          // calculate a trigger position against. Refresh first in case
          // anything already-created needs its cached positions redone.
          ScrollTrigger.refresh();
          notifyScrollUnlocked();
        },
        [],
        3
      )
      .to(refs.scrollCue.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, 3);
  }, [refs, lenis]);

  const scrollToNext = useCallback(() => {
    lenis?.scrollTo("#ayat-pembuka", { duration: 1.4, easing: easeInOutCubic });
  }, [lenis]);

  return { isOpened, open, scrollToNext };
}
