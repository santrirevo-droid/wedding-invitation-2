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

  // The couple's name is three parts (bride / "&" / groom) and the monogram
  // is the mark that introduces them — hide all of it immediately so open()'s
  // timeline below can bring each in, instead of the block sitting there
  // pre-set and only scale-popping as a single fused unit.
  //
  // The monogram hides differently from the names, and deliberately: it is
  // clipped to a zero-width slit on its own centre line rather than made
  // transparent. It is meant to read as a thing that was always hanging
  // there behind the curtain, so it stays fully opaque and simply isn't
  // uncovered yet — the curtain in the clip is what's in front of it. Fading
  // or scaling it in would say the opposite, that it materialised on cue.
  //
  // Left visible under reduced-motion, same as the names: those visitors
  // never get the open() choreography, so anything hidden here would stay
  // hidden for them.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = refs.title.current?.children;
    if (lines?.length) gsap.set(lines, { opacity: 0, y: 22 });

    if (refs.monogram.current) {
      gsap.set(refs.monogram.current, { clipPath: "inset(0% 50%)" });
    }
  }, [refs.title, refs.monogram]);

  // the curtain-parting clip (public/video/cover-open.mp4) plays once and
  // would otherwise hold on its last frame — the arch in full bloom,
  // petals mid-fall. The moment it actually finishes, crossfade to
  // loopVideo (cover-loop.mp4, the same arch shot to loop seamlessly) so
  // the petals keep drifting for as long as the visitor lingers on the
  // cover, instead of freezing there.
  //
  // This swaps between two separate <video> elements rather than
  // reassigning `video.src` to the loop clip in place: mutating `src` on
  // an already-`ended` element made the browser briefly fall back to
  // `video`'s own `poster` image (a frame from the *opening* clip) while
  // the new source buffered — a visible flash back to the start that
  // looked like the intro clip restarting/looping itself. loopVideo is
  // preloaded the whole time behind the scenes, so this is just an
  // opacity crossfade between two frames that are already decoded.
  useEffect(() => {
    const video = refs.video.current;
    const loopVideo = refs.loopVideo.current;
    if (!video || !loopVideo) return;
    const onEnded = () => {
      loopVideo.currentTime = 0;
      loopVideo.play().catch(() => {});
      video.style.opacity = "0";
      loopVideo.style.opacity = "1";
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [refs.video, refs.loopVideo]);

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
      .to(refs.glow.current, { opacity: 0, duration: 0.55, ease: "power1.in" }, 0.75)
      // The monogram is uncovered by the curtain rather than revealed on its
      // own: the clip slit the mount effect left it at widens from its
      // centre line outwards, in step with the fabric drawing back, so the
      // mark reads as something that was hanging there all along.
      //
      // The window is measured off the clip itself, not guessed. Sampling a
      // bright-pixel scanline across public/video/cover-open.mp4 frame by
      // frame: the curtains sit shut through t=1.25, the first gap appears at
      // t=1.50 spanning px 338–383 of a 720px frame (centre = 360, so it
      // parts from dead centre), widens symmetrically, and is done by t=2.55,
      // after which the openness figure plateaus and only the flowers keep
      // blooming. 1.5 + 1.1 lands the wipe on that same span, allowing for
      // the video running ~0.12s ahead of this timeline (play() is called
      // before the first tick).
      //
      // ease "none" because the fabric travels at a near-constant rate once
      // it starts; the same scanline run against the live page puts the wipe
      // within 8 points of the curtain's own openness at every sample across
      // the parting, and within 5 for most of it. An eased curve drifted
      // visibly against it.
      //
      // Both ends are written in the same two-value `inset(v h)` form on
      // purpose. GSAP interpolates a shape like this by pairing up the
      // numbers it finds in the start and end strings, and it reads the
      // start from the computed style — which Chrome collapses from the
      // four values set above to two. Ending on a four-value string left it
      // pairing two numbers against four, and the clip jumped straight to
      // ~53% open on the tween's first tick instead of easing from nothing.
      .to(refs.monogram.current, { clipPath: "inset(0% 0%)", duration: 1.1, ease: "none" }, 1.5)
      // The couple's names stay hidden (see the mount effect above) until
      // the curtain clip has finished parting (~3s — see
      // public/video/cover-open.mp4), then pop in — matching the
      // by.memonika.com reference: video plays first, and only once it's
      // settled does the cover text "reload" back in, rather than the
      // names appearing instantly under the tap.
      .fromTo(
        titleEl,
        { scale: 0.94 },
        { scale: 1.05, duration: 0.45, ease: "power2.out" },
        3
      )
      .to(titleEl, { scale: 1, duration: 0.55, ease: "power2.inOut" }, 3.45)
      .to(
        titleLines,
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.12 },
        3.05
      )
      // the white arch card materialises behind the text once every line
      // of it — including the deliberately-delayed names above — has
      // popped in, rather than sitting there from the very start
      .to(
        refs.coverCard.current,
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        3.8
      )
      // the by.memonika.com reference's move: once the names have settled
      // back in, a "scroll down" cue fades in and the visitor continues on
      // their own terms — see scrollToNext below — instead of being
      // carried through the whole page by an autoscroll tour. Positioned
      // at 4.3 (not 3, alongside the names) so the cue doesn't appear
      // while the names are still popping in.
      //
      // The unlock itself runs via .call() at this same position (4.3),
      // not the timeline's onComplete (which wouldn't fire until the
      // opacity fade-in tween below finishes ~0.6s later) — otherwise
      // the cue sits there looking tappable (pointer-events already on)
      // while lenis is still stopped, so an early tap silently does
      // nothing.
      .set(refs.scrollCue.current, { pointerEvents: "auto" }, 4.3)
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
        4.3
      )
      .to(refs.scrollCue.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, 4.3);
  }, [refs, lenis]);

  const scrollToNext = useCallback(() => {
    lenis?.scrollTo("#ayat-pembuka", { duration: 1.4, easing: easeInOutCubic });
  }, [lenis]);

  return { isOpened, open, scrollToNext };
}
