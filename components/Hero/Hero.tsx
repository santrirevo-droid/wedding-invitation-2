"use client";

import { Suspense } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import GuestGreeting, { GuestGreetingFallback } from "@/components/GuestGreeting";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import NavDock from "@/components/NavDock";
import ScrollTopButton from "@/components/ScrollTopButton";
import { useCoverRefs } from "@/hooks/useCoverRefs";
import { useIdleMotion } from "@/hooks/useIdleMotion";
import { useOpenInvitation } from "@/hooks/useOpenInvitation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { couple } from "@/lib/weddingData";
import { weddingDay, weddingMonth, weddingYear } from "@/lib/weddingDate";

export default function Hero() {
  const refs = useCoverRefs();
  const idle = useIdleMotion(refs);
  const { isOpened, open, scrollToNext } = useOpenInvitation(refs);
  useScrollReveal(refs);

  const {
    section,
    coverInner,
    background,
    video,
    loopVideo,
    glow,
    content,
    coverCard,
    title,
    button,
    scrollCue,
    music,
  } = refs;

  return (
    // MusicPlayer and NavDock render as siblings of #cover, not descendants
    // of it: useScrollReveal pins #cover via a GSAP transform while it
    // scrolls out, and a transformed ancestor becomes the containing block
    // for any `position: fixed` descendant — a fixed child of #cover would
    // scroll away with the pin's transform instead of staying glued to the
    // real viewport. Confirmed empirically (getComputedStyle on the pinned
    // section showed a non-"none" `transform` while MusicPlayer's own
    // rect had scrolled off-screen) before restructuring this way.
    <>
      <section
        id="cover"
        ref={section}
        className="relative min-h-svh w-full overflow-hidden bg-maroon-deep"
      >
        <div ref={coverInner} className="absolute inset-0">
          {/* the curtain-parting arch — a real rendered clip (~10s):
              curtains part by ~3s, then the archway keeps blooming with
              falling petals through to its own natural end, played in
              full rather than cut short — only a user scroll (see
              useScrollReveal) fades it out early. Paused on frame one
              (poster) until open() plays it. Wrapped in `background` so
              it still gets the same subtle scroll-out zoom
              useScrollReveal already applies to this ref. */}
          <div ref={background} className="absolute inset-0 overflow-hidden">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              src="/video/cover-open.mp4"
              poster="/video/cover-open-poster.jpg"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            {/* the ambient loop that takes over once the clip above ends —
                preloaded and stacked underneath (opacity-0) the whole time
                so useOpenInvitation's ended-handler can just crossfade to
                an already-decoded frame instead of loading a new source
                on demand */}
            <video
              ref={loopVideo}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
              src="/video/cover-loop.mp4"
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          </div>

          {/* hairline frame — a thin accent over the video's own carved
              arch, echoing the bordered treatment the rest of the page
              uses rather than leaving the video's edge to bleed flat */}
          <div className="pointer-events-none absolute inset-4 border border-accent/28 sm:inset-6" />

          {/* bloom on open */}
          <div
            ref={glow}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              background:
                "radial-gradient(circle at 50% 36%, rgba(255,251,242,0.95), transparent 62%)",
            }}
          />

          <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-4 px-8 py-8 text-center">
            <div ref={content} className="relative flex flex-col items-center px-7 py-4 sm:px-10">
              {/* the white arch card — a gateway silhouette echoing the
                  video's own wooden arch, materialising behind the text
                  once every line above has popped in (see
                  useOpenInvitation's open() timeline) rather than sitting
                  there from the start. -z-10 (not z-0): an absolutely
                  positioned box with z-index:auto still paints above
                  static in-flow siblings regardless of DOM order, so
                  without this it would cover the text instead of sitting
                  behind it.
                  Positioning and visual styling are split across two
                  elements: `.card-stock` (globals.css) hardcodes
                  `position: relative`, which — same specificity, later in
                  the cascade — silently wins over Tailwind's `absolute`
                  utility if both land on one element, collapsing it to
                  0×0 (inset-0 doesn't stretch a `position: relative` box
                  the way it does an absolute one). The outer div owns
                  the absolute positioning and is what open()'s timeline
                  animates; the inner one just carries card-stock + the
                  arch shape, sized to fill it. */}
              <div
                ref={coverCard}
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-95 opacity-0"
              >
                <div className="card-stock h-full w-full rounded-t-[50%_30%] rounded-b-[18px]" />
              </div>

              <AnimatedWords
                as="p"
                text="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
                variant="popIn"
                groupSize={2}
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl leading-relaxed text-accent-dark"
              />

              {/* monogram — the couple's initials, not a generic sprig, so it
                  stays correct automatically if shortName ever changes.
                  The leading here is load-bearing, not taste: .text-gilded
                  paints the foil through background-clip:text, so any part
                  of a glyph overflowing its line box falls outside the
                  background box and renders transparent. A roundhand cap
                  carries its flourish well above the cap line, so a cropped
                  line box (leading < 1) silently beheads these two letters
                  rather than merely tightening them. */}
              <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3.5">
                <span className="rule-gild w-7 sm:w-9" />
                <span className="text-gilded font-script text-[2.6rem] leading-[1.15] sm:text-[3rem]">
                  {couple.bride.shortName.charAt(0)}
                </span>
                <span className="font-display text-xl font-light leading-none text-accent-dark sm:text-2xl">
                  &amp;
                </span>
                <span className="text-gilded font-script text-[2.6rem] leading-[1.15] sm:text-[3rem]">
                  {couple.groom.shortName.charAt(0)}
                </span>
                <span className="rule-gild w-7 sm:w-9" />
              </div>

              <AnimatedWords
                as="p"
                text="The Wedding Of"
                variant="popIn"
                groupSize={1}
                className="mt-4 font-accent text-[11px] font-normal uppercase tracking-[0.5em] text-on-maroon-soft"
              />

              {/* the couple's names — the one place the script face appears at
                  full scale, gilded and slowly drifting. A formal roundhand
                  runs wider and carries taller ascenders/deeper descenders
                  than the old thin script, so this is set a step smaller
                  (17vw, max 4.6rem) with room to breathe between the lines
                  rather than the negative leading that used to clamp them —
                  at 20vw/leading-0.95 the swashes collided and "Nufus" ran
                  past the card's edge. */}
              <h1 ref={title} className="mt-2 flex flex-col items-center leading-none">
                <span className="text-gilded text-gilded-drift font-script text-[clamp(2.9rem,17vw,4.6rem)] leading-[1.12]">
                  {couple.bride.shortName}
                </span>
                <span className="font-display text-2xl font-light leading-none text-accent-dark">
                  &amp;
                </span>
                <span className="text-gilded text-gilded-drift font-script text-[clamp(2.9rem,17vw,4.6rem)] leading-[1.12]">
                  {couple.groom.shortName}
                </span>
              </h1>

              {/* date, set as three tracked numerals between hairlines */}
              <div className="mt-5 flex items-center gap-4">
                <span className="rule-gild w-10 sm:w-14" />
                <p className="flex items-baseline gap-2.5 font-display text-[21px] font-normal tracking-[0.16em] text-on-maroon">
                  <span>{weddingDay}</span>
                  <span className="text-accent-dark">·</span>
                  <span>{weddingMonth}</span>
                  <span className="text-accent-dark">·</span>
                  <span>{weddingYear}</span>
                </p>
                <span className="rule-gild w-10 sm:w-14" />
              </div>

              <div className="mt-6">
                <Suspense fallback={<GuestGreetingFallback />}>
                  <GuestGreeting />
                </Suspense>
              </div>
            </div>

            <div ref={button} className="flex flex-col items-center gap-4">
              <InvitationButton
                onClick={() => {
                  idle.stop();
                  open();
                }}
              />
              <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-on-maroon-soft">
                Ketuk untuk membuka
              </p>
            </div>
          </div>

          {/* the "scroll down" cue that replaces the button once the cover
              has opened — see useOpenInvitation's scrollToNext. Anchored to
              coverInner (which is absolute inset-0, so its box always
              equals the section's real height) rather than nested inside
              the content flex column above: that column's own content can
              be taller than min-h-svh on shorter viewports, which pushed
              an earlier version of this button below the visible, clipped
              (overflow-hidden) area and out of tap reach.
              bottom-24 (not bottom-9): NavDock is a `fixed inset-x-0
              bottom-0 z-20` bar that fades in the moment "Buka Undangan"
              is tapped (isOpened flips true immediately, before this cue
              even appears) and sits above this cue's z-10 — bottom-9 put
              the cue directly underneath that bar's tap area, so it was
              visible but silently unclickable. bottom-24 clears NavDock's
              band (its own height plus iOS safe-area-inset-bottom) with
              margin. Starts invisible and non-interactive (opacity-0
              pointer-events-none); the open() timeline turns both on. */}
          <button
            ref={scrollCue}
            type="button"
            onClick={scrollToNext}
            aria-label="Gulir ke bawah"
            className="scroll-cue-bounce pointer-events-none absolute inset-x-0 bottom-24 z-10 mx-auto flex h-11 w-8 cursor-pointer items-center justify-center rounded-full border border-accent-dark/50 text-accent-dark opacity-0"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 9l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* bottom-20: clears NavDock's bar, which is now stuck flush to the
          true bottom edge instead of floating mid-screen. ScrollTopButton
          stacks directly above it (its own height + a gap higher). */}
      <ScrollTopButton className="fixed bottom-[8.5rem] right-4 z-20" />
      <MusicPlayer ref={music} className="fixed bottom-20 right-4 z-20" />
      <NavDock enabled={isOpened} />
    </>
  );
}
