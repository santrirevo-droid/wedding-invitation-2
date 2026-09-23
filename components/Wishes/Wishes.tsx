"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import SectionCard from "@/components/SectionCard";
import SectionHeading from "@/components/SectionHeading";
import { whenScrollUnlocked } from "@/hooks/scrollLock";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.1, y: 24 });
  const { wishes } = useWishes();

  // re-run whenever the wish count changes, so newly-submitted or
  // newly-rendered cards still get their entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setCtx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-wish-card]");
      if (!cards.length) return;
      // same blur-into-focus language as useRevealOnScroll, hand-rolled
      // here because this list is dynamic (re-triggers per wishes.length)
      // rather than a one-shot section mount
      gsap.set(cards, { opacity: 0, y: 26, filter: "blur(7px)" });
    }, section);

    let triggerCtx: gsap.Context | null = null;
    // deferred: see hooks/scrollLock.ts — creating the ScrollTrigger while
    // html.scroll-locked is still applied makes GSAP calculate a wrong
    // start position against a page with zero scrollable range
    const cancelWait = whenScrollUnlocked(() => {
      triggerCtx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-wish-card]");
        if (!cards.length) return;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            // replays on every crossing, either scroll direction — see
            // the matching note in useTextReveal.ts
            toggleActions: "play reverse play reverse",
          },
        });
      }, section);
    });

    return () => {
      cancelWait();
      triggerCtx?.revert();
      setCtx.revert();
    };
  }, [wishes.length]);

  return (
    <section
      id="ucapan"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-maroon-light to-maroon px-8 py-28 text-center"
    >
      <SectionFloral />

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Guestbook" title="Ucapan & Doa" />

        <SectionCard shape="scallop-top" className="mt-10 px-6 pb-7 pt-9">
          <div ref={listRef}>
            {wishes.length === 0 ? (
              <AnimatedWords
                as="p"
                text="Jadilah yang pertama mengirimkan ucapan & doa."
                variant="rise"
                groupSize={3}
                className="font-body text-[15px] font-normal italic text-on-maroon-soft"
              />
            ) : (
              <div className="flex max-h-[28rem] flex-col gap-3.5 overflow-y-auto pr-1.5 text-left">
                {wishes.map((wish) => (
                  <div
                    key={wish.id}
                    data-wish-card
                    className="border-y border-r border-accent/25 border-l-2 border-l-accent/60 bg-paper/70 px-6 py-5"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-11 w-9 shrink-0 items-center justify-center rounded-t-full border border-accent/42 font-display text-[20px] font-normal text-accent">
                        {wish.name.trim().charAt(0).toUpperCase() || "?"}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-display text-[20px] font-medium text-on-maroon">
                          {wish.name}
                        </div>
                        <div
                          className={[
                            "font-accent text-[11px] uppercase tracking-[0.26em]",
                            wish.attend === "hadir"
                              ? "text-sage-light"
                              : "text-on-maroon-soft",
                          ].join(" ")}
                        >
                          {wish.attend === "hadir"
                            ? wish.guests
                              ? `Hadir · ${wish.guests} orang`
                              : "Hadir"
                            : "Berhalangan hadir"}
                        </div>
                      </div>
                    </div>
                    {wish.message && (
                      <p className="mt-4 font-body text-[14.5px] font-normal italic leading-[1.75] text-on-maroon-soft">
                        {wish.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
