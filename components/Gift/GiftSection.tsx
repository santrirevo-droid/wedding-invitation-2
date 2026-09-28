"use client";

import { useRef } from "react";
import { SectionFloral } from "@/components/Botanical";
import SectionCard from "@/components/SectionCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import GiftModalContent from "./Gift";

/**
 * "Tanda Kasih" as a section of its own, right after Acara and just before
 * Our Story — it used to trail the RSVP form, which now sits at the bottom
 * next to Ucapan & Doa. The ground runs maroon-light → maroon-deep so it
 * picks up from Acara and hands off to Our Story's darker top.
 */
export default function GiftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.09, y: 24 });

  return (
    <section
      id="tanda-kasih"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-maroon-light to-maroon-deep px-8 py-28 text-center"
    >
      <SectionFloral />

      <SectionCard shape="rounded" className="relative mx-auto max-w-md px-7 py-10 sm:px-9">
        <GiftModalContent />
      </SectionCard>
    </section>
  );
}
