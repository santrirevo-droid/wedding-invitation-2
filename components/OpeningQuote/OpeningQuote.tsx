"use client";

import { useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import Crest from "@/components/Crest";
import FloralLayer from "@/components/FloralLayer";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const AYAT_ARABIC =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ";

const AYAT_TRANSLATION =
  "“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu hidup tenang bersamanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sungguh, pada yang demikian itu terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir.”";

export default function OpeningQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.14, y: 28 });
  useFloralParallax(sectionRef, sprayRef);

  return (
    <section
      id="ayat-pembuka"
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-8 py-28 text-center"
    >
      {/* the botanical art is used once, huge and almost invisible — at this
          scale it reads as a warm bloom in the paper rather than clipart */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 w-[22rem] select-none opacity-30 mix-blend-multiply sm:-left-16 sm:w-[28rem]"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-a.png"
          width={1536}
          height={1024}
          sizes="(min-width: 640px) 448px, 352px"
          className="h-auto w-full"
        />
      </div>

      <SectionFloral />

      <div className="relative max-w-md">
        <Crest className="mx-auto w-10 text-accent/60" />

        <p className="mt-5 font-accent text-[11px] font-normal uppercase tracking-[0.45em] text-accent-dark">
          Ayat Pembuka
        </p>

        <AnimatedWords
          as="p"
          text={AYAT_ARABIC}
          variant="blur"
          groupSize={4}
          className="mt-8 font-arabic text-[27px] leading-[2] text-on-maroon"
          wordClassName="inline-block"
          dir="rtl"
          lang="ar"
        />

        <span data-reveal className="rule-gild mx-auto mt-9 block w-24" />

        <AnimatedWords
          as="p"
          text={AYAT_TRANSLATION}
          variant="blur"
          groupSize={3}
          className="mt-8 font-display text-[21px] font-normal italic leading-[1.75] text-on-maroon-soft"
        />

        <p
          data-reveal
          className="mt-7 font-accent text-[11px] font-normal uppercase tracking-[0.42em] text-accent-dark"
        >
          Q.S. Ar-Rum : 21
        </p>
      </div>
    </section>
  );
}
