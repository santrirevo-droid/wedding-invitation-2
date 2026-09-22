"use client";

import { Suspense } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import GuestGreeting, { GuestGreetingFallback } from "@/components/GuestGreeting";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import NavDock from "@/components/NavDock";
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

  const { section, coverInner, background, video, glow, content, title, button, scrollCue, music } =
    refs;

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
          {/* the curtain-parting arch — a real filmed/rendered clip
              (Motion-Ivory-Romance), trimmed to just its opening beat:
              curtains part, flowers bloom into the archway, ~3s, then
              holds on its last frame. Paused on frame one (poster) until
              open() plays it — replaces the old CSS corner-floral-parting
              tween with the real thing instead of imitating it.
              Wrapped in `background` so it still gets the same subtle
              scroll-out zoom useScrollReveal already applies to this ref. */}
          <div ref={background} className="absolute inset-0 overflow-hidden">
            <video
              ref={video}
              className="h-full w-full object-cover"
              src="/video/cover-open.mp4"
              poster="/video/cover-open-poster.jpg"
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

          <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-8 px-8 py-20 text-center">
            {/* the cover-card — a bordered plate holding the invitation's own
                content, distinct from the full-bleed frame around it, echoing
                herewego's boxed cover-card rather than type floating free */}
            <div
              ref={content}
              className="relative flex flex-col items-center border border-accent/30 bg-paper/45 px-7 py-10 backdrop-blur-[2px] sm:px-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[7px] border border-accent/22"
              />

              <AnimatedWords
                as="p"
                text="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
                variant="popIn"
                groupSize={2}
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl leading-relaxed text-accent-dark"
              />

              <AnimatedWords
                as="p"
                text="The Wedding Of"
                variant="popIn"
                groupSize={1}
                className="mt-7 font-accent text-[11px] font-normal uppercase tracking-[0.5em] text-on-maroon-soft"
              />

              {/* monogram — the couple's initials, not a generic sprig, so it
                  stays correct automatically if shortName ever changes */}
              <div aria-hidden="true" className="mt-6 flex items-center justify-center gap-3">
                <span className="rule-gild w-7 sm:w-9" />
                <span className="text-gilded font-script text-[2.75rem] leading-none sm:text-[3.25rem]">
                  {couple.bride.shortName.charAt(0)}
                </span>
                <span className="font-display text-lg font-normal leading-none text-accent-dark sm:text-xl">
                  &amp;
                </span>
                <span className="text-gilded font-script text-[2.75rem] leading-none sm:text-[3.25rem]">
                  {couple.groom.shortName.charAt(0)}
                </span>
                <span className="rule-gild w-7 sm:w-9" />
              </div>

              {/* the couple's names — the one place the script face appears at
                  full scale, gilded and slowly drifting */}
              <h1 ref={title} className="mt-3 flex flex-col items-center leading-none">
                <span className="text-gilded text-gilded-drift font-script text-[clamp(3.2rem,20vw,5.5rem)] leading-[0.95]">
                  {couple.bride.shortName}
                </span>
                <span className="my-1 font-display text-2xl font-normal leading-none text-accent-dark">
                  &amp;
                </span>
                <span className="text-gilded text-gilded-drift font-script text-[clamp(3.2rem,20vw,5.5rem)] leading-[0.95]">
                  {couple.groom.shortName}
                </span>
              </h1>

              {/* date, set as three tracked numerals between hairlines */}
              <div className="mt-7 flex items-center gap-4">
                <span className="rule-gild w-10 sm:w-14" />
                <p className="flex items-baseline gap-2.5 font-display text-lg font-normal tracking-[0.18em] text-on-maroon">
                  <span>{weddingDay}</span>
                  <span className="text-accent-dark">·</span>
                  <span>{weddingMonth}</span>
                  <span className="text-accent-dark">·</span>
                  <span>{weddingYear}</span>
                </p>
                <span className="rule-gild w-10 sm:w-14" />
              </div>

              <div className="mt-9">
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
          true bottom edge instead of floating mid-screen */}
      <MusicPlayer ref={music} className="fixed bottom-20 right-4 z-20" />
      <NavDock enabled={isOpened} />
    </>
  );
}
