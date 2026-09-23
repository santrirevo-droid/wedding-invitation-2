"use client";

import { Suspense, useRef, useState, type FormEvent } from "react";
import AnimatedWords from "@/components/AnimatedWords";
import { SectionFloral } from "@/components/Botanical";
import GiftModalContent from "@/components/Gift";
import { GuestNameAutofill } from "@/components/GuestGreeting";
import SectionCard from "@/components/SectionCard";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

type SentWish = {
  name: string;
  attend: "hadir" | "tidak";
  guests: string;
  message: string;
};

// the one place the sans carries lowercase running text: a form field is
// UI, not stationery, and what a guest types (their own name, a message)
// has to stay unambiguous while they type it — the display serif's
// hairlines at input size were the weakest text on the page
const fieldClass =
  "min-h-12 w-full border border-accent/32 bg-paper/75 px-4 py-3.5 font-accent text-[15px] font-normal text-on-maroon outline-none transition-colors placeholder:text-on-maroon-soft/55 focus:border-accent/75";
const labelClass =
  "mb-2.5 block font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark";

function RSVPFormContent() {
  const { wishes, addWish } = useWishes();
  const [attend, setAttend] = useState<"hadir" | "tidak">("hadir");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentWish, setSentWish] = useState<SentWish | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Mohon isi nama Anda terlebih dahulu.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    const payload: SentWish = {
      name: name.trim(),
      attend,
      guests: attend === "hadir" ? guests : "",
      message: message.trim(),
    };
    try {
      await addWish(payload);
      setSentWish(payload);
      setName("");
      setMessage("");
    } catch {
      setErrorMessage("Gagal mengirim ucapan. Periksa koneksi Anda dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sentWish) {
    return (
      <div className="text-left">
        <p className="text-center font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
          Ucapan Terkirim
        </p>
        <div className="mt-5 border-y border-r border-accent/28 border-l-2 border-l-accent/65 bg-paper/75 px-6 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-9 shrink-0 items-center justify-center rounded-t-full border border-accent/45 font-display text-[20px] font-normal text-accent">
              {sentWish.name.trim().charAt(0).toUpperCase() || "?"}
            </span>
            <div className="min-w-0">
              <div className="truncate font-display text-[20px] font-medium text-on-maroon">
                {sentWish.name}
              </div>
              <div
                className={[
                  "font-accent text-[11px] uppercase tracking-[0.24em]",
                  sentWish.attend === "hadir" ? "text-sage-light" : "text-on-maroon-soft",
                ].join(" ")}
              >
                {sentWish.attend === "hadir"
                  ? sentWish.guests
                    ? `Hadir · ${sentWish.guests} orang`
                    : "Hadir"
                  : "Berhalangan hadir"}
              </div>
            </div>
          </div>
          {sentWish.message && (
            <p className="mt-4 font-body text-[14.5px] font-normal leading-[1.75] text-on-maroon-soft">
              {sentWish.message}
            </p>
          )}
        </div>
        <p className="mt-5 text-center font-body text-[14px] font-normal italic text-on-maroon-soft">
          Terima kasih — {wishes.length} ucapan telah masuk.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5 text-left">
      <Suspense fallback={null}>
        <GuestNameAutofill setName={setName} />
      </Suspense>

      <div>
        <label className={labelClass} htmlFor="rsvp-name">
          Nama
        </label>
        <input
          id="rsvp-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          placeholder="Nama Anda"
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div>
        <span className={labelClass}>Kehadiran</span>
        <div className="flex gap-3">
          {(["hadir", "tidak"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAttend(value)}
              className={[
                "min-h-12 flex-1 cursor-pointer border px-3 py-3.5 font-accent text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-300",
                attend === value
                  ? "border-accent-dark bg-accent-dark text-paper"
                  : "border-accent/32 bg-paper/70 text-on-maroon-soft hover:border-accent/65",
              ].join(" ")}
            >
              {value === "hadir" ? "Hadir" : "Berhalangan"}
            </button>
          ))}
        </div>
      </div>

      {attend === "hadir" && (
        <div>
          <label className={labelClass} htmlFor="rsvp-guests">
            Jumlah Tamu
          </label>
          <input
            id="rsvp-guests"
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor="rsvp-message">
          Ucapan &amp; Doa
        </label>
        <textarea
          id="rsvp-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan & doa untuk kedua mempelai…"
          className={`${fieldClass} resize-none`}
        />
      </div>

      {errorMessage && (
        <p className="font-body text-[14px] italic text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 min-h-12 cursor-pointer bg-accent-dark py-4 font-accent text-[11px] font-medium uppercase tracking-[0.36em] text-paper transition-[filter] duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {isSubmitting ? "Mengirim…" : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.09, y: 24 });

  const { wishes } = useWishes();
  const hadirCount = wishes.filter((w) => w.attend === "hadir").length;

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-maroon to-maroon-light px-8 py-28 text-center"
    >
      <SectionFloral />

      <SectionCard shape="rounded" className="relative mx-auto max-w-md px-7 py-10 sm:px-9">
        <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-accent-dark">
          With love
        </p>
        {/* text-gilded moved onto each word (via wordClassName) rather than
            this h2 — background-clip:text only paints the box it's set on,
            and AnimatedWords' inline-block word spans are a separate box
            from their ancestor, so a gradient on the h2 alone renders the
            words invisible */}
        <h2 className="mt-3 font-display text-[clamp(2.35rem,8.6vw,3.2rem)] font-light leading-[1.1]">
          <AnimatedWords
            as="span"
            text="Kehadiran Anda adalah"
            variant="slideRight"
            groupSize={2}
            wordClassName="text-gilded inline-block"
          />
          <br />
          <AnimatedWords
            as="span"
            text="hadiah terindah."
            variant="slideRight"
            groupSize={2}
            className="font-script text-[1.15em] leading-[1.18] [word-spacing:0.16em]"
            wordClassName="text-gilded inline-block"
          />
        </h2>
        <AnimatedWords
          as="p"
          text="Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."
          variant="slideRight"
          groupSize={3}
          className="mx-auto mt-6 max-w-sm font-body text-[15px] font-normal leading-[1.8] text-on-maroon-soft"
        />

        <div data-reveal className="mt-9 flex items-stretch justify-center gap-10">
          <div>
            <div className="text-gilded font-display text-[38px] font-light leading-none tabular-nums lining-nums">
              {wishes.length}
            </div>
            <div className="mt-2.5 font-accent text-[11px] font-normal uppercase tracking-[0.3em] text-on-maroon-soft">
              Ucapan
            </div>
          </div>
          <div className="w-px bg-accent/20" />
          <div>
            <div className="text-gilded font-display text-[38px] font-light leading-none tabular-nums lining-nums">
              {hadirCount}
            </div>
            <div className="mt-2.5 font-accent text-[11px] font-normal uppercase tracking-[0.3em] text-on-maroon-soft">
              Hadir
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard shape="rounded" className="relative mx-auto mt-8 max-w-md px-7 py-10 text-left sm:px-9">
        <p className="text-center font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
          RSVP
        </p>
        <h2 className="text-gilded mt-3 text-center font-display text-[2.3rem] font-light leading-[1.06]">
          Konfirmasi
          <br />
          <span className="font-script text-[1.1em] leading-[1.18] [word-spacing:0.16em]">
            kehadiran Anda.
          </span>
        </h2>
        <RSVPFormContent />
      </SectionCard>

      <SectionCard shape="rounded" className="relative mx-auto mt-8 max-w-md px-7 py-10 sm:px-9">
        <GiftModalContent />
      </SectionCard>
    </section>
  );
}
