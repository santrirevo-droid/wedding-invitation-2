"use client";

import { useRef } from "react";
import Ornament from "@/components/Ornament";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple } from "@/lib/weddingData";
import { weddingDateLong } from "@/lib/weddingDate";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.12, y: 26 });

  return (
    <footer
      id="penutup"
      ref={sectionRef}
      className="relative overflow-hidden px-8 pb-24 pt-28 text-center"
    >
      {/* the page closes darker than it opened */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-maroon-deep/60 to-maroon-deep"
      />

      <div className="relative mx-auto max-w-md">
        <p
          data-reveal
          className="font-accent text-[9.5px] font-light uppercase leading-[2] tracking-[0.36em] text-accent/80"
        >
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <p
          data-reveal
          className="mt-8 font-display text-[19px] font-light italic leading-[1.8] text-on-maroon-soft"
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
          kepada kedua mempelai.
        </p>

        <p
          data-reveal
          className="mt-5 font-display text-[19px] font-light italic leading-[1.8] text-on-maroon-soft"
        >
          Atas kehadiran serta doa restunya, kami sekeluarga mengucapkan
          terima kasih yang sebesar-besarnya.
        </p>

        <Ornament
          variant="crest"
          className="mx-auto mt-14 w-11 text-accent/65"
        />

        <p
          data-reveal
          className="mt-6 font-accent text-[9px] font-light uppercase tracking-[0.42em] text-on-maroon-soft/80"
        >
          Kami Yang Berbahagia
        </p>

        <h2 data-reveal className="mt-5 flex flex-col items-center leading-none">
          <span className="text-gilded text-gilded-drift font-script text-[clamp(3.4rem,21vw,6rem)] leading-[0.95]">
            {couple.groom.shortName}
          </span>
          <span className="my-1.5 font-display text-2xl font-light italic text-accent/80">
            &amp;
          </span>
          <span className="text-gilded text-gilded-drift font-script text-[clamp(3.4rem,21vw,6rem)] leading-[0.95]">
            {couple.bride.shortName}
          </span>
        </h2>

        <div data-reveal className="mt-10 flex items-center justify-center gap-4">
          <span className="rule-gild w-10" />
          <p className="font-accent text-[9px] font-light uppercase tracking-[0.34em] text-on-maroon-soft/70">
            {weddingDateLong}
          </p>
          <span className="rule-gild w-10" />
        </div>
      </div>
    </footer>
  );
}
