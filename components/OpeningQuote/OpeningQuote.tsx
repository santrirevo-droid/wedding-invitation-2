"use client";

import { useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import Crest from "@/components/Crest";
import SectionCard from "@/components/SectionCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const AYAT_ARABIC =
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ";

const AYAT_TRANSLATION =
  "“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu hidup tenang bersamanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sungguh, pada yang demikian itu terdapat tanda-tanda kebesaran Allah bagi kaum yang berpikir.”";

export default function OpeningQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.14, y: 28 });

  return (
    <section
      id="ayat-pembuka"
      ref={sectionRef}
      className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-maroon-light px-8 py-28 text-center"
    >
      <SectionFloral />

      <SectionCard shape="rounded" className="relative w-full max-w-md px-7 py-10 sm:px-10">
        <Crest className="mx-auto w-10 text-accent/60" />

        <p className="mt-5 font-accent text-[11px] font-normal uppercase tracking-[0.45em] text-accent-dark">
          Ayat Pembuka
        </p>

        <AnimatedWords
          as="p"
          text={AYAT_ARABIC}
          variant="blurZoom"
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
          variant="blurZoom"
          groupSize={3}
          className="mt-8 font-display text-[21px] font-normal italic leading-[1.75] text-on-maroon-soft"
        />

        <p
          data-reveal
          className="mt-7 font-accent text-[11px] font-normal uppercase tracking-[0.42em] text-accent-dark"
        >
          Q.S. Ar-Rum : 21
        </p>
      </SectionCard>
    </section>
  );
}
