"use client";

import { useRef, useState } from "react";
import Botanical, { SectionFloral } from "@/components/Botanical";
import SectionHeading from "@/components/SectionHeading";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { bankAccounts, giftAddress } from "@/lib/weddingData";

export default function Gift() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.12, y: 26 });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function handleCopy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((cur) => (cur === key ? null : cur)), 1800);
  }

  const copyButtonClass =
    "mt-6 inline-flex min-h-11 cursor-pointer items-center justify-center border px-7 py-3 font-accent text-[9.5px] font-medium uppercase tracking-[0.3em] transition-colors duration-300";

  return (
    <section
      id="tanda-kasih"
      ref={sectionRef}
      className="relative overflow-hidden px-8 py-28 text-center"
    >
      <SectionFloral />

      <div className="relative mx-auto max-w-md">
        <SectionHeading eyebrow="Tanda Kasih" title="Amplop Digital" />

        <p
          data-reveal
          className="mt-7 font-display text-[19px] font-light italic leading-[1.75] text-on-maroon-soft"
        >
          Kehadiran dan doa restu Anda sudah lebih dari cukup bagi kami.
          Bila berkenan memberi tanda kasih, kami sediakan pilihan berikut.
        </p>

        <div className="mt-11 flex flex-col gap-6">
          {bankAccounts.map((account) => (
            <div
              key={account.bank}
              data-reveal
              className="card-stock rounded-[3px] px-7 py-9"
            >
              <p className="font-accent text-[9px] font-light uppercase tracking-[0.4em] text-ink-soft/75">
                Transfer Bank
              </p>
              <div className="mt-3 font-display text-[26px] font-light leading-tight text-ink">
                {account.bank}
              </div>

              <Botanical variant="garland" className="mx-auto my-5 w-36 text-gold/45" />

              <div className="font-display text-[24px] font-normal tabular-nums tracking-[0.18em] text-gold-dark">
                {account.number}
              </div>
              <div className="mt-2 font-display text-[16px] font-light italic text-ink-soft">
                a.n. {account.holder}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(account.number, account.bank)}
                className={[
                  copyButtonClass,
                  copiedKey === account.bank
                    ? "border-sage-dark bg-sage-dark text-paper"
                    : "border-gold-dark/45 text-gold-dark hover:border-gold-dark hover:bg-gold-dark/5",
                ].join(" ")}
              >
                {copiedKey === account.bank ? "Tersalin ✓" : "Salin Nomor"}
              </button>
            </div>
          ))}

          <div data-reveal className="card-stock rounded-[3px] px-7 py-9">
            <p className="font-accent text-[9px] font-light uppercase tracking-[0.4em] text-ink-soft/75">
              Kirim Hadiah
            </p>
            <div className="mt-3 font-display text-[26px] font-light leading-tight text-ink">
              Alamat Pengiriman
            </div>

            <Botanical variant="garland" className="mx-auto my-5 w-36 text-gold/45" />

            <div className="mx-auto max-w-[19rem] font-display text-[17px] font-light leading-[1.65] text-gold">
              {giftAddress.address}
            </div>
            <div className="mt-2 font-display text-[16px] font-light italic text-ink-soft">
              a.n. {giftAddress.recipient}
            </div>

            <button
              type="button"
              onClick={() => handleCopy(giftAddress.address, "address")}
              className={[
                copyButtonClass,
                copiedKey === "address"
                  ? "border-sage-dark bg-sage-dark text-paper"
                  : "border-gold-dark/45 text-gold-dark hover:border-gold-dark hover:bg-gold-dark/5",
              ].join(" ")}
            >
              {copiedKey === "address" ? "Tersalin ✓" : "Salin Alamat"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
