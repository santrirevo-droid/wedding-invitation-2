"use client";

import { useLenis } from "lenis/react";
import { easeInOutCubic } from "@/lib/easing";

type ScrollTopButtonProps = {
  className?: string;
};

/**
 * A quick jump back to the cover — same circular-button treatment as
 * MusicPlayer (they're always rendered as a stacked pair), scrolling with
 * the same Lenis easing every other scripted scroll on this site uses.
 */
export default function ScrollTopButton({ className = "" }: ScrollTopButtonProps) {
  const lenis = useLenis();

  function scrollToTop() {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2, easing: easeInOutCubic });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={[
        "flex h-11 w-11 items-center justify-center rounded-full",
        "border border-accent/45 bg-paper/80 text-accent-dark backdrop-blur-sm",
        "shadow-[0_10px_24px_-12px_rgba(122,90,46,0.45)] transition-transform duration-300 hover:scale-105",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 15l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
