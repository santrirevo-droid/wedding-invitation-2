"use client";

import { useRef, type ReactNode } from "react";
import { useCardReveal } from "@/hooks/useCardReveal";

export type SectionCardShape = "arch" | "rounded" | "scallop-top";

const SHAPE_CLASS: Record<SectionCardShape, string> = {
  // a true dome — percentage radii scale with the card's own width/height
  // instead of a fixed px value, so the arch stays proportional at any
  // screen size rather than flattening out on wide cards
  arch: "rounded-t-[50%_30%] rounded-b-[18px]",
  rounded: "rounded-[26px]",
  // same dome, tighter — reads as a distinct silhouette next to "arch"
  // when the two sit a few sections apart
  "scallop-top": "rounded-t-[46%_50px] rounded-b-[14px]",
};

/**
 * The floating-card treatment every section on by.memonika.com uses: a
 * paper-toned card, lifted off its section's own background colour with a
 * soft shadow, that zooms into focus as it scrolls into view (see
 * useCardReveal). `shape` varies the card's silhouette per section so the
 * page doesn't read as one card shape repeated nine times — the same
 * "considered variety" principle the per-section text-reveal variants and
 * SectionFloral corners already use.
 */
export default function SectionCard({
  shape = "rounded",
  className = "",
  children,
}: {
  shape?: SectionCardShape;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useCardReveal(ref);

  return (
    <div
      ref={ref}
      className={`card-stock relative ${SHAPE_CLASS[shape]} ${className}`}
    >
      {children}
    </div>
  );
}
