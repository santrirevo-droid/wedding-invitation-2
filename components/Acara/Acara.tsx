"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import FloralLayer from "@/components/FloralLayer";
import SectionHeading from "@/components/SectionHeading";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { CALENDAR_GOOGLE_URL } from "@/lib/calendar";
import { WEDDING_DATE_ISO, events, venue } from "@/lib/weddingData";
import { weddingDay, weddingDayName, weddingMonthName, weddingYear } from "@/lib/weddingDate";

const [akad, resepsi] = events;

// target parsed fresh inside the function (not hoisted to a module-level
// constant) so every call — including from the interval below — is a
// fully self-contained computation with nothing pre-baked/cached across
// calls or environments
function getTimeLeft() {
  const target = new Date(WEDDING_DATE_ISO).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function EventCard({
  index,
  title,
  time,
  date,
  emphasis = false,
}: {
  index: string;
  title: string;
  time: string;
  date: string;
  emphasis?: boolean;
}) {
  return (
    <div
      data-reveal
      className={`flex-1 border px-6 py-7 text-left ${
        emphasis
          ? "border-accent/35 bg-accent/12"
          : "border-border bg-paper/75"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="font-accent text-[11px] font-normal uppercase tracking-[0.32em] text-accent-dark">
          {title}
        </p>
        <span className="font-display text-lg font-normal text-accent">{index}</span>
      </div>
      <h3 className="mt-6 font-display text-[22px] font-normal leading-tight text-ink">
        {time}
      </h3>
      <p className="mt-2 font-display text-[15px] font-normal italic leading-[1.6] text-ink-soft">
        {date}
      </p>
    </div>
  );
}

export default function Acara() {
  const sectionRef = useRef<HTMLElement>(null);
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1, y: 26 });
  useFloralParallax(sectionRef, sprayRef);

  // lazy init so the first paint already shows real numbers instead of
  // "--"; the value legitimately differs between server and client render
  // (it's a live clock), so the digits below carry suppressHydrationWarning
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section id="acara" ref={sectionRef} className="relative overflow-hidden">
      {/* the countdown band — full-bleed and dark, the one place on the page
          that inverts to berry-on-ivory instead of ivory-on-berry, so the
          numbers themselves become the moment of drama */}
      <div
        data-reveal
        className="relative bg-accent-dark px-8 py-16 text-center text-paper sm:py-20"
      >
        <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-paper/65">
          Save the Date
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,7vw,2.9rem)] font-normal leading-[1.1]">
          <AnimatedWords as="span" text="Menuju hari" variant="popUp" groupSize={2} />
          <br />
          <AnimatedWords
            as="span"
            text="bahagia kami."
            variant="popUp"
            groupSize={2}
            className="font-script text-[1.35em] leading-none text-[#e8b0b9]"
          />
        </h2>

        <div className="mx-auto mt-10 grid max-w-sm grid-cols-4 border-l border-paper/25">
          {cells.map((cell) => (
            <div key={cell.label} className="border-r border-paper/25 px-1">
              <div
                suppressHydrationWarning
                className="font-display text-[clamp(1.7rem,6vw,2.4rem)] font-normal leading-none tabular-nums"
              >
                {String(cell.value).padStart(2, "0")}
              </div>
              <div className="mt-2 font-accent text-[9px] font-normal uppercase tracking-[0.24em] text-paper/70">
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* events — back on the page ground */}
      <div className="relative px-8 py-24 text-center">
        {/* a true corner accent, not a bouquet crossing the text column —
            sized and clipped to match SectionFloral's own corner clusters
            below rather than the much larger spray this used before. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 bottom-0 w-32 select-none opacity-30 mix-blend-multiply sm:-left-4 sm:w-40"
        >
          <FloralLayer
            ref={sprayRef}
            src="/floral/floral-wc-spray-c.png"
            width={1536}
            height={1024}
            sizes="160px"
            className="h-auto w-full"
          />
        </div>

        <SectionFloral />

        <div className="relative mx-auto max-w-md">
          <SectionHeading eyebrow="Acara" title="Rayakan Bersama Kami" />

          {/* the day itself, set as one large callout — day name, a big
              numeral, then month/year, echoing herewego's event-date block */}
          <div data-reveal className="mt-9 flex items-center justify-center gap-4">
            <span className="text-right font-accent text-[11px] font-normal uppercase leading-[1.7] tracking-[0.16em] text-on-maroon-soft">
              {weddingDayName}
            </span>
            <strong className="text-gilded font-display text-[clamp(3.6rem,14vw,5.2rem)] font-normal leading-[0.75]">
              {weddingDay}
            </strong>
            <span className="text-left font-accent text-[11px] font-normal uppercase leading-[1.7] tracking-[0.16em] text-on-maroon-soft">
              {weddingMonthName}
              <br />
              {weddingYear}
            </span>
          </div>

          <div data-reveal className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <EventCard index="01" title={akad.title} time={akad.time} date={akad.date} />
            <EventCard
              index="02"
              title={resepsi.title}
              time={resepsi.time}
              date={resepsi.date}
              emphasis
            />
          </div>

          <div data-reveal className="card-stock relative mt-8 rounded-[4px] px-7 py-9">
            <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-ink-soft">
              Bertempat di
            </p>
            <h4 className="mt-3 font-display text-[25px] font-normal leading-tight text-ink">
              {venue.name}
            </h4>
            <AnimatedWords
              as="p"
              text={venue.location}
              variant="popUp"
              groupSize={3}
              className="mx-auto mt-2.5 max-w-[19rem] font-display text-[16px] font-normal leading-[1.6] text-ink-soft"
            />

            <div className="mt-8 flex flex-col items-stretch gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center bg-gold-dark px-7 py-3.5 font-accent text-[11px] font-medium uppercase tracking-[0.32em] text-paper transition-[filter] duration-300 hover:brightness-110"
              >
                Lihat Lokasi
              </a>
              <a
                href={CALENDAR_GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-gold-dark/45 px-7 py-3.5 font-accent text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark transition-colors duration-300 hover:border-gold-dark hover:bg-gold-dark/5"
              >
                Simpan ke Kalender
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
