"use client";

import { useRef } from "react";
import { SectionFloral } from "@/components/Botanical";
import SectionCard from "@/components/SectionCard";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type Milestone = {
  year: string;
  label: string;
  desc: string;
};

const milestones: Milestone[] = [
  {
    year: "2016",
    label: "Bertemu",
    desc: "Kelas Alif, Bahasa & Sastra Arab — UIN Syarif Hidayatullah Jakarta",
  },
  {
    year: "2026",
    label: "Terungkap",
    desc: "Sepuluh tahun berlalu, sebuah rasa yang lama tersimpan akhirnya terucap",
  },
  {
    year: "Agustus 2026",
    label: "Khitbah",
    desc: "Silaturahmi dan lamaran, mempertemukan kedua keluarga",
  },
  {
    year: "1 Nov 2026",
    label: "Menikah",
    desc: "Ijab kabul, menyatukan dua nama menjadi satu kisah",
  },
];

/**
 * The love story, told as a dated timeline — placed between Mempelai and
 * Acara so the narrative reads in order: who they are, how they came to
 * be a "they", then the logistics of the day itself.
 */
export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1, y: 26 });

  return (
    <section
      id="kisah-kami"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-maroon-deep to-maroon px-8 py-28 text-center"
    >
      <SectionFloral />

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Our Story" title="Kisah Kami" />

        <SectionCard shape="scallop-top" className="relative mt-10 px-7 pb-8 pt-10">
          <div className="relative flex flex-col gap-9 text-left">
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 left-[7px] top-1.5 w-px bg-accent/30"
            />
            {milestones.map((m) => (
              <div key={m.year} data-reveal className="relative pl-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-accent-dark bg-maroon-light"
                />
                <p className="font-accent text-[11px] font-normal uppercase tracking-[0.35em] text-accent-dark">
                  {m.year}
                </p>
                <p className="mt-1.5 font-display text-[25px] font-medium italic leading-tight text-on-maroon">
                  {m.label}
                </p>
                <p className="mt-1.5 font-body text-[14px] font-normal leading-[1.7] text-on-maroon-soft">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
