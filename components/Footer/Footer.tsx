"use client";

import { useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import Botanical, { SectionFloral } from "@/components/Botanical";
import Crest from "@/components/Crest";
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
      className="relative overflow-hidden bg-accent-dark px-8 pb-24 pt-28 text-center text-paper"
    >
      <SectionFloral className="opacity-70" />

      <div className="relative mx-auto max-w-md">
        <p
          data-reveal
          className="font-accent text-[11px] font-normal uppercase leading-[2] tracking-[0.36em] text-paper/70"
        >
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>

        <AnimatedWords
          as="p"
          text="Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai."
          variant="drift"
          groupSize={3}
          className="mt-8 font-display text-[19px] font-normal leading-[1.8] text-paper/85"
        />

        <AnimatedWords
          as="p"
          text="Atas kehadiran serta doa restunya, kami sekeluarga mengucapkan terima kasih yang sebesar-besarnya."
          variant="drift"
          groupSize={3}
          className="mt-5 font-display text-[19px] font-normal leading-[1.8] text-paper/85"
        />

        <Crest className="mx-auto mt-14 w-11 text-paper/55" />

        <p
          data-reveal
          className="mt-6 font-accent text-[11px] font-normal uppercase tracking-[0.42em] text-paper/70"
        >
          Kami Yang Berbahagia
        </p>

        <Botanical
          variant="garland"
          className="mx-auto mt-6 w-60 text-paper/35"
        />

        {/* data-reveal on each line rather than the h2 as a whole — the
            shared useRevealOnScroll stagger then animates bride name, the
            ampersand and groom name in one after another instead of the
            three lines arriving as a single fused block */}
        <h2 className="mt-6 flex flex-col items-center leading-none">
          <span
            data-reveal
            className="font-script text-[clamp(3.4rem,21vw,6rem)] leading-[0.95] text-[#e3d9a8]"
          >
            {couple.bride.shortName}
          </span>
          <span data-reveal className="my-1.5 font-display text-2xl font-normal text-paper/70">
            &amp;
          </span>
          <span
            data-reveal
            className="font-script text-[clamp(3.4rem,21vw,6rem)] leading-[0.95] text-[#e3d9a8]"
          >
            {couple.groom.shortName}
          </span>
        </h2>

        <div data-reveal className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-paper/30" />
          <p className="font-accent text-[11px] font-normal uppercase tracking-[0.34em] text-paper/75">
            {weddingDateLong}
          </p>
          <span className="h-px w-10 bg-paper/30" />
        </div>
      </div>
    </footer>
  );
}
