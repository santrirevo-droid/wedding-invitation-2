"use client";

import { Suspense } from "react";
import GuestGreeting, { GuestGreetingFallback } from "@/components/GuestGreeting";
import InvitationButton from "@/components/InvitationButton";
import MusicPlayer from "@/components/MusicPlayer";
import Ornament from "@/components/Ornament";
import { useCoverRefs } from "@/hooks/useCoverRefs";
import { useIdleMotion } from "@/hooks/useIdleMotion";
import { useOpenInvitation } from "@/hooks/useOpenInvitation";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { couple } from "@/lib/weddingData";
import { weddingDay, weddingMonth, weddingYear } from "@/lib/weddingDate";

export default function Hero() {
  const refs = useCoverRefs();
  const idle = useIdleMotion(refs);
  const { open } = useOpenInvitation(refs);
  useScrollReveal(refs);

  const { section, coverInner, background, glow, content, title, button, music } = refs;

  return (
    <section
      id="cover"
      ref={section}
      className="relative min-h-svh w-full overflow-hidden bg-maroon-deep"
    >
      <div ref={coverInner} className="absolute inset-0">
        {/* local wash — brighter behind the names, so the type sits in its
            own pool of light instead of on an even field */}
        <div
          ref={background}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(78% 52% at 50% 38%, #221a14 0%, #130f0c 55%, #0a0806 100%)",
          }}
        />

        {/* engraved frame */}
        <div className="pointer-events-none absolute inset-3 sm:inset-5">
          <Ornament
            variant="corner"
            className="absolute left-0 top-0 w-16 text-accent/45 sm:w-20"
          />
          <Ornament
            variant="corner"
            className="absolute right-0 top-0 w-16 rotate-90 text-accent/45 sm:w-20"
          />
          <Ornament
            variant="corner"
            className="absolute bottom-0 right-0 w-16 rotate-180 text-accent/45 sm:w-20"
          />
          <Ornament
            variant="corner"
            className="absolute bottom-0 left-0 w-16 -rotate-90 text-accent/45 sm:w-20"
          />
        </div>

        {/* bloom on open */}
        <div
          ref={glow}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 36%, rgba(217,188,130,0.42), transparent 62%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center gap-8 px-8 py-20 text-center">
          <div ref={content} className="flex flex-col items-center">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl leading-relaxed text-accent/85"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="mt-7 font-accent text-[10px] font-light uppercase tracking-[0.5em] text-on-maroon-soft">
              The Wedding Of
            </p>

            <Ornament variant="crest" className="mt-6 w-16 text-accent/70" />

            {/* the couple's names — the one place the script face appears at
                full scale, gilded and slowly drifting */}
            <h1 ref={title} className="mt-3 flex flex-col items-center leading-none">
              <span className="text-gilded text-gilded-drift font-script text-[clamp(3.2rem,20vw,5.5rem)] leading-[0.95]">
                {couple.groom.shortName}
              </span>
              <span className="my-1 font-display text-2xl font-light italic text-accent/80">
                &amp;
              </span>
              <span className="text-gilded text-gilded-drift font-script text-[clamp(3.2rem,20vw,5.5rem)] leading-[0.95]">
                {couple.bride.shortName}
              </span>
            </h1>

            {/* date, set as three tracked numerals between hairlines */}
            <div className="mt-7 flex items-center gap-4">
              <span className="rule-gild w-10 sm:w-14" />
              <p className="flex items-baseline gap-2.5 font-display text-lg font-light tracking-[0.18em] text-on-maroon">
                <span>{weddingDay}</span>
                <span className="text-accent/60">·</span>
                <span>{weddingMonth}</span>
                <span className="text-accent/60">·</span>
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
            <p className="font-accent text-[9px] font-light uppercase tracking-[0.4em] text-on-maroon-soft/70">
              Ketuk untuk membuka
            </p>
          </div>
        </div>
      </div>

      <MusicPlayer ref={music} className="fixed bottom-6 right-6 z-20" />
    </section>
  );
}
