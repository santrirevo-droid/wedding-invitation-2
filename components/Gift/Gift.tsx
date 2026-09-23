"use client";

import { useState } from "react";
import Botanical from "@/components/Botanical";
import { bankAccounts, giftAddress } from "@/lib/weddingData";

/**
 * The envelope this card is named after: a flap folded down over the card
 * stock and closed with a wax seal. The seal is opaque `bg-paper`, so it
 * covers the point where the two fold lines meet the way a real one would —
 * that overlap is what stops it reading as a drawn triangle.
 */
function EnvelopeFlap() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 text-gold"
    >
      <svg
        viewBox="0 0 400 84"
        preserveAspectRatio="none"
        fill="none"
        className="h-[84px] w-full"
      >
        <path d="M0 0 200 72 400 0Z" fill="currentColor" opacity="0.05" />
        <path
          d="M0 0 200 72 400 0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="absolute left-1/2 top-[72px] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/35 bg-paper">
        <span className="h-2 w-2 rotate-45 bg-gold/55" />
      </span>
    </div>
  );
}

/**
 * "Tanda Kasih" — rendered directly inside its own card in RSVP.tsx,
 * right under the RSVP form, so guests see it without an extra tap.
 */
export default function GiftModalContent() {
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

  const cardClass =
    "card-stock relative overflow-hidden rounded-[4px] px-6 pb-8 pt-[6.25rem]";
  const copyButtonClass =
    "mt-5 inline-flex min-h-11 cursor-pointer items-center justify-center border px-6 py-3 font-accent text-[11px] font-medium uppercase tracking-[0.3em] transition-colors duration-300";

  return (
    <div>
      <p className="font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
        A token of love
      </p>
      <h2 className="text-gilded mt-3 font-display text-[2.5rem] font-light leading-[1.06]">
        Tanda kasih
        <br />
        <span className="font-script text-[1.1em] leading-[1.18] [word-spacing:0.16em]">untuk kami.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-[19rem] font-body text-[14.5px] font-normal leading-[1.8] text-on-maroon-soft">
        Kehadiran dan doa restu Anda sudah lebih dari cukup. Bila berkenan,
        tanda kasih dapat dikirim melalui:
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {bankAccounts.map((account) => (
          <div key={account.number} className={cardClass}>
            <EnvelopeFlap />

            <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-ink-soft">
              Transfer Bank
            </p>
            <div className="mt-3 font-display text-[27px] font-medium leading-tight text-ink">
              {account.bank}
            </div>

            <Botanical variant="garland" className="mx-auto my-4 w-32 text-gold/60" />

            <div className="font-accent text-[21px] font-medium tabular-nums tracking-[0.2em] text-gold-dark">
              {account.number}
            </div>
            <div className="mt-2 font-body text-[14px] font-normal text-ink-soft">
              a.n. {account.holder}
            </div>

            <button
              type="button"
              onClick={() => handleCopy(account.number, account.number)}
              className={[
                copyButtonClass,
                copiedKey === account.number
                  ? "border-sage-dark bg-sage-dark text-paper"
                  : "border-gold-dark/45 text-gold-dark hover:border-gold-dark hover:bg-gold-dark/5",
              ].join(" ")}
            >
              {copiedKey === account.number ? "Tersalin ✓" : "Salin Nomor"}
            </button>
          </div>
        ))}

        <div className={cardClass}>
          <EnvelopeFlap />

          <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-ink-soft">
            Kirim Hadiah
          </p>
          <div className="mt-3 font-display text-[27px] font-medium leading-tight text-ink">
            Alamat Pengiriman
          </div>

          <Botanical variant="garland" className="mx-auto my-4 w-32 text-gold/60" />

          <div className="mx-auto max-w-[18rem] font-body text-[14.5px] font-normal leading-[1.7] text-gold-dark">
            {giftAddress.address}
          </div>
          <div className="mt-2 font-body text-[14px] font-normal text-ink-soft">
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
  );
}
