"use client";

import { Suspense, useId, useRef, useState, type FormEvent } from "react";
import { SectionFloral } from "@/components/Botanical";
import FloralLayer from "@/components/FloralLayer";
import GiftModalContent from "@/components/Gift";
import { GuestNameAutofill } from "@/components/GuestGreeting";
import Modal from "@/components/Modal";
import { useFloralParallax } from "@/hooks/useFloralParallax";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useWishes } from "@/hooks/useWishes";

type SentWish = {
  name: string;
  attend: "hadir" | "tidak";
  guests: string;
  message: string;
};

const fieldClass =
  "min-h-12 w-full border border-accent/32 bg-paper/75 px-4 py-3.5 font-display text-[17px] font-normal text-on-maroon outline-none transition-colors placeholder:text-on-maroon-soft/55 focus:border-accent/75";
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
            <span className="flex h-11 w-9 shrink-0 items-center justify-center rounded-t-full border border-accent/45 font-display text-lg font-normal text-accent">
              {sentWish.name.trim().charAt(0).toUpperCase() || "?"}
            </span>
            <div className="min-w-0">
              <div className="truncate font-display text-[18px] font-normal text-on-maroon">
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
            <p className="mt-4 font-display text-[16px] font-normal leading-[1.7] text-on-maroon-soft">
              {sentWish.message}
            </p>
          )}
        </div>
        <p className="mt-5 text-center font-display text-[15px] font-normal italic text-on-maroon-soft">
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
        <p className="font-display text-[15px] italic text-red-700">{errorMessage}</p>
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
  const sprayRef = useRef<HTMLImageElement>(null);
  useRevealOnScroll(sectionRef, { stagger: 0.09, y: 24 });
  useFloralParallax(sectionRef, sprayRef);

  const { wishes } = useWishes();
  const hadirCount = wishes.filter((w) => w.attend === "hadir").length;

  const [openModal, setOpenModal] = useState<"rsvp" | "gift" | null>(null);
  const rsvpTitleId = useId();
  const giftTitleId = useId();

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="relative overflow-hidden px-8 py-28 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-4 w-[22rem] select-none opacity-30 mix-blend-multiply sm:-right-16 sm:w-[27rem]"
      >
        <FloralLayer
          ref={sprayRef}
          src="/floral/floral-wc-spray-e.png"
          width={1024}
          height={1536}
          sizes="(min-width: 640px) 432px, 352px"
          className="h-auto w-full"
        />
      </div>

      <SectionFloral />

      <div className="relative mx-auto max-w-md">
        <p className="font-accent text-[11px] font-normal uppercase tracking-[0.4em] text-accent-dark">
          With love
        </p>
        <h2 className="text-gilded mt-3 font-display text-[clamp(2.4rem,9vw,3.2rem)] font-normal leading-[1.08]">
          Kehadiran Anda adalah
          <br />
          <span className="font-script text-[1.2em] leading-none">hadiah terindah.</span>
        </h2>
        <p
          data-reveal
          className="mx-auto mt-6 max-w-sm font-display text-[17px] font-normal leading-[1.75] text-on-maroon-soft"
        >
          Merupakan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
          hadir dan memberikan doa restu.
        </p>

        <div data-reveal className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setOpenModal("rsvp")}
            className="min-h-12 w-full cursor-pointer bg-accent-dark px-8 py-3.5 font-accent text-[11px] font-medium uppercase tracking-[0.32em] text-paper transition-[filter] duration-300 hover:brightness-105 sm:w-auto"
          >
            Konfirmasi Kehadiran
          </button>
          <button
            type="button"
            onClick={() => setOpenModal("gift")}
            className="min-h-12 w-full cursor-pointer border border-accent-dark/45 bg-paper/60 px-8 py-3.5 font-accent text-[11px] font-medium uppercase tracking-[0.32em] text-accent-dark transition-colors duration-300 hover:border-accent-dark hover:bg-accent-dark/5 sm:w-auto"
          >
            Kirim Tanda Kasih
          </button>
        </div>

        <div data-reveal className="mt-12 flex items-stretch justify-center gap-10">
          <div>
            <div className="text-gilded font-display text-[34px] font-normal leading-none tabular-nums">
              {wishes.length}
            </div>
            <div className="mt-2.5 font-accent text-[11px] font-normal uppercase tracking-[0.3em] text-on-maroon-soft">
              Ucapan
            </div>
          </div>
          <div className="w-px bg-accent/20" />
          <div>
            <div className="text-gilded font-display text-[34px] font-normal leading-none tabular-nums">
              {hadirCount}
            </div>
            <div className="mt-2.5 font-accent text-[11px] font-normal uppercase tracking-[0.3em] text-on-maroon-soft">
              Hadir
            </div>
          </div>
        </div>
      </div>

      {openModal === "rsvp" && (
        <Modal titleId={rsvpTitleId} onClose={() => setOpenModal(null)}>
          <p className="font-accent text-[11px] font-normal uppercase tracking-[0.38em] text-accent-dark">
            RSVP
          </p>
          <h2
            id={rsvpTitleId}
            className="text-gilded mt-3 font-display text-[2.1rem] font-normal leading-[1.05]"
          >
            Konfirmasi
            <br />
            <span className="font-script text-[1.15em] leading-none">kehadiran Anda.</span>
          </h2>
          <RSVPFormContent />
        </Modal>
      )}

      {openModal === "gift" && (
        <Modal titleId={giftTitleId} onClose={() => setOpenModal(null)}>
          <GiftModalContent />
        </Modal>
      )}
    </section>
  );
}
