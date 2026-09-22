"use client";

import { useRef } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { couple } from "@/lib/weddingData";
import { weddingDay, weddingMonthName, weddingYear } from "@/lib/weddingDate";

/**
 * A four-card mosaic — quote, photo, date, promise — borrowed wholesale
 * from the herewego/ reference's "moments" grid. It exists to break up
 * the page's rhythm of tall centred sections with something wider and
 * asymmetric; there's no gallery yet, so the photo slot carries the same
 * pure-CSS gradient technique as Mempelai's portrait placeholders rather
 * than a stand-in photo.
 */
export default function Moments() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1, y: 24 });

  return (
    <section
      id="momen"
      ref={sectionRef}
      className="relative overflow-hidden bg-maroon px-8 py-28 text-center"
    >
      <SectionFloral />

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="A little glimpse" title="Potongan Kecil Cerita" />

        <div className="mt-11 grid grid-cols-2 grid-rows-[10rem_10rem] gap-3">
          <div
            data-reveal
            className="card-stock relative row-span-2 flex flex-col justify-center rounded-[3px] p-6 text-left"
          >
            <span
              aria-hidden="true"
              className="font-display text-[3.5rem] leading-none text-accent/45"
            >
              &ldquo;
            </span>
            <AnimatedWords
              as="p"
              text="Setiap kisah cinta itu indah, tapi kisah kami favorit kami."
              variant="elasticDrop"
              groupSize={2}
              className="relative -mt-3 font-display text-[19px] font-normal leading-[1.35] text-ink"
            />
            <small className="mt-4 font-accent text-[10px] font-normal uppercase tracking-[0.3em] text-accent-dark">
              {couple.bride.shortName.charAt(0)} + {couple.groom.shortName.charAt(0)}
            </small>
          </div>

          <div
            data-reveal
            className="relative row-span-2 overflow-hidden rounded-[3px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, rgba(255,255,255,.3), transparent 42%), radial-gradient(ellipse at 32% 72%, #c5cfa8 0%, transparent 52%), radial-gradient(ellipse at 72% 26%, #a8b888 0%, transparent 52%), linear-gradient(165deg, #4a5738, #8a9968 55%, #3a2e1e)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-dark/55 to-transparent"
            />
            <span className="absolute bottom-3 right-3 font-script text-2xl leading-none text-paper">
              our day
            </span>
          </div>

          <div
            data-reveal
            className="flex flex-col items-center justify-center bg-accent-dark text-paper"
          >
            <p className="font-accent text-[9px] font-normal uppercase tracking-[0.3em] text-paper/75">
              {weddingMonthName}
            </p>
            <strong className="font-display text-[2.6rem] font-normal leading-[0.9]">
              {weddingDay}
            </strong>
            <span className="font-accent text-[10px] font-normal tracking-[0.14em] text-paper/85">
              {weddingYear}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-maroon-deep p-4">
            <p className="font-display text-[17px] font-normal leading-[1.2] text-ink">
              <AnimatedWords as="span" text="To have and to hold," variant="elasticDrop" groupSize={2} />
              <br />
              <AnimatedWords
                as="span"
                text="forevermore."
                variant="elasticDrop"
                className="font-script text-[1.3em] leading-none text-accent-dark"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
