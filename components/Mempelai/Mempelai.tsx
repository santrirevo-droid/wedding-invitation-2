"use client";

import { useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import Botanical, { SectionFloral } from "@/components/Botanical";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
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
 * Each half of the couple, introduced under a silhouette "portrait" — a
 * pure-CSS gradient bust (soft highlight, cheek/jaw shading, a diagonal
 * light streak) standing in for the photo this invitation doesn't have,
 * borrowed from the herewego/ reference. Reads as a photograph at a glance
 * rather than an obviously-empty frame, and drops in for a real photo later
 * without touching the layout — just replace the gradient with an <img>.
 */
function PersonBlock({ person, role }: { person: Person; role: CoupleRole }) {
  return (
    <div data-reveal className="flex flex-col items-center text-center">
      <div
        className="relative flex w-[9.5rem] items-end justify-end overflow-hidden shadow-[0_17px_31px_-8px_rgba(105,65,73,0.35)] sm:w-[11rem]"
        style={{
          aspectRatio: "0.75",
          borderRadius: "999px 999px 6px 6px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              role === "putra"
                ? "linear-gradient(160deg, rgba(255,255,255,.35), transparent 45%), radial-gradient(ellipse at 51% 24%, #f0d3c8 0 11%, transparent 11.5%), radial-gradient(ellipse at 50% 56%, #b8888a 0 27%, transparent 27.5%), linear-gradient(140deg, #83585e, #d9a9a8 54%, #674049)"
                : "linear-gradient(160deg, rgba(255,255,255,.35), transparent 45%), radial-gradient(ellipse at 51% 24%, #f7ddd2 0 11%, transparent 11.5%), radial-gradient(ellipse at 50% 56%, #cd9b96 0 27%, transparent 27.5%), linear-gradient(140deg, #9b6e70, #e8bcb5 54%, #775255)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(138deg, transparent 36%, rgba(82,50,53,.33) 36% 48%, transparent 48%)",
          }}
        />
        <span className="relative z-[1] mb-2 mr-3.5 font-script text-[3.1rem] leading-none text-white [text-shadow:0_2px_9px_rgba(69,39,43,0.4)]">
          {person.shortName.charAt(0)}
        </span>
      </div>

      <h3 className="text-gilded mt-7 font-display text-[30px] font-normal leading-tight">
        {person.name}
      </h3>

      <p className="mt-3 font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
        {role === "putra" ? "Putra" : "Putri"} dari
      </p>

      <AnimatedWords
        as="p"
        text={`${person.father} & ${person.mother}`}
        variant="slideLeft"
        groupSize={2}
        className="mx-auto mt-3 max-w-[18rem] font-display text-[18px] font-normal italic leading-[1.75] text-on-maroon-soft"
      />

      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 border border-accent/32 px-4 py-2 font-handle text-[11px] font-normal lowercase tracking-[0.22em] text-accent-dark transition-colors hover:border-accent-dark hover:text-on-maroon"
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
  );
}

export default function Mempelai() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.12, y: 26 });
  useFloralParallax(sectionRef, sprayRef);

  return (
    <section
      id="mempelai"
      ref={sectionRef}
      className="relative overflow-hidden px-8 py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 w-[18rem] select-none opacity-30 mix-blend-multiply sm:-right-12 sm:w-[22rem]"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-b.png"
          width={1024}
          height={1536}
          sizes="(min-width: 640px) 352px, 288px"
          className="h-auto w-full -scale-x-100"
        />
      </div>

      <SectionFloral />

      <div className="relative mx-auto max-w-md text-center">
        <SectionHeading eyebrow="Mempelai" title="Kedua Mempelai" />

        <AnimatedWords
          as="p"
          text="Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:"
          variant="slideLeft"
          groupSize={3}
          className="mx-auto mt-7 max-w-sm font-display text-[18px] font-normal italic leading-[1.75] text-on-maroon-soft"
        />

        <div className="mt-14 flex flex-col items-center gap-12">
          <PersonBlock person={couple.bride} role="putri" />

          <div data-reveal className="flex items-center gap-5">
            <span className="rule-gild w-12" />
            <span className="text-gilded font-script text-[3.2rem] leading-none">
              &amp;
            </span>
            <span className="rule-gild w-12" />
          </div>

          <PersonBlock person={couple.groom} role="putra" />
        </div>

        <Botanical
          variant="garland"
          className="mx-auto mt-16 w-60 -scale-y-100 text-accent/50"
        />
      </div>
    </section>
  );
}
