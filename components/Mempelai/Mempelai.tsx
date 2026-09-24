"use client";

import { useRef } from "react";
import Image from "next/image";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import SectionCard from "@/components/SectionCard";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple, type CoupleRole } from "@/lib/weddingData";

type Person = {
  name: string;
  shortName: string;
  father: string;
  mother: string;
  instagram: string;
};

/**
 * Each half of the couple, introduced under a bust portrait — an arch-
 * framed photo (bride.png / groom.png) rather than the illustrated
 * placeholder this invitation used before. Each person gets their own
 * floating card rather than sharing one, matching the by.memonika.com
 * reference's per-person cards.
 */
function PersonBlock({ person, role }: { person: Person; role: CoupleRole }) {
  return (
    <SectionCard shape="arch" className="w-full max-w-[19rem] px-6 pb-9 pt-6">
      <div data-reveal className="flex flex-col items-center text-center">
        <div className="relative mx-auto aspect-[2/3] w-[12.5rem] overflow-hidden rounded-t-full drop-shadow-[0_14px_26px_rgba(58,46,30,0.28)] sm:w-[14rem]">
          <Image
            src={role === "putra" ? "/images/groom.png" : "/images/bride.png"}
            alt={`Foto ${person.shortName}`}
            fill
            sizes="(min-width: 640px) 14rem, 12.5rem"
            className="object-cover object-top"
          />
        </div>

        {/* the nickname, big and in the script face — the by.memonika.com
            reference's move: a large cursive first name doing the actual
            "who is this" work, with the full legal name underneath reading
            more like a caption than the headline */}
        <AnimatedWords
          as="p"
          text={person.shortName}
          variant="popIn"
          groupSize={1}
          className="mt-5 font-script text-[4.1rem] font-normal leading-[1.05] sm:text-[4.8rem]"
          wordClassName="text-gilded inline-block"
        />

        {/* the full legal name reads as a caption under the script, so it
            gets the text face at caption weight, not the display cut —
            uppercase at 15px is exactly where a display Garamond's
            hairlines start to disappear */}
        <AnimatedWords
          as="h3"
          text={person.name}
          variant="popIn"
          groupSize={1}
          className="mt-2.5 font-body text-[14px] font-medium uppercase tracking-[0.14em] text-on-maroon-soft"
        />

        <p className="mt-3 font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
          {role === "putra" ? "Putra" : "Putri"} dari
        </p>

        <div className="mx-auto mt-3 max-w-[17rem] font-body text-[15px] font-normal italic leading-[1.7] text-on-maroon-soft">
          <AnimatedWords as="p" text={`${person.father} &`} variant="slideLeft" groupSize={2} />
          <AnimatedWords as="p" text={person.mother} variant="slideLeft" groupSize={2} />
        </div>

        {person.instagram && (
          <a
            href={`https://instagram.com/${person.instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-accent/32 px-4 py-2 font-accent text-[11px] font-normal lowercase tracking-[0.18em] text-accent-dark transition-colors hover:border-accent-dark hover:text-on-maroon"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            {person.instagram}
          </a>
        )}
      </div>
    </SectionCard>
  );
}

export default function Mempelai() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.12, y: 26 });

  return (
    <section
      id="mempelai"
      ref={sectionRef}
      className="relative overflow-hidden bg-maroon px-8 py-28"
    >
      <SectionFloral />

      <div className="relative mx-auto max-w-md text-center">
        <SectionHeading eyebrow="Mempelai" title="Kedua Mempelai" />

        <AnimatedWords
          as="p"
          text="Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:"
          variant="slideLeft"
          groupSize={3}
          className="mx-auto mt-7 max-w-sm font-body text-[15px] font-normal italic leading-[1.85] text-on-maroon-soft"
        />

        <div className="mt-12 flex flex-col items-center gap-10">
          <PersonBlock person={couple.bride} role="putri" />

          <div data-reveal className="flex items-center gap-5">
            <span className="rule-gild w-12" />
            <span className="text-gilded font-script text-[3.8rem] leading-[1.05]">
              &amp;
            </span>
            <span className="rule-gild w-12" />
          </div>

          <PersonBlock person={couple.groom} role="putra" />
        </div>
      </div>
    </section>
  );
}
