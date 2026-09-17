"use client";

import { DEFAULT_WHATSAPP_MESSAGE_TEMPLATE } from "@/lib/inviteLink";

/**
 * The WhatsApp invite wording, edited once here rather than per guest —
 * {{nama}} and {{link}} are swapped in automatically for whoever the send
 * icon is tapped for (see fillWhatsAppTemplate).
 */
export default function MessageTemplateEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <section className="card-stock mt-6 flex flex-col gap-3 rounded-[3px] p-7">
      <div>
        <label className="mb-1 block text-lg font-semibold text-ink" htmlFor="wa-template">
          Pesan Pengantar WhatsApp
        </label>
        <p className="text-base text-ink-soft">
          Sesuaikan kalimatnya di sini sebelum dikirim. Tulis{" "}
          <code className="rounded bg-maroon px-1.5 py-0.5 text-sm">{"{{nama}}"}</code> dan{" "}
          <code className="rounded bg-maroon px-1.5 py-0.5 text-sm">{"{{link}}"}</code> di mana
          saja — otomatis diganti nama tamu dan tautan undangannya masing-masing saat dikirim.
        </p>
      </div>

      <textarea
        id="wa-template"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        className="w-full resize-y rounded-xl border-2 border-border bg-paper px-4 py-3 text-lg leading-relaxed text-ink outline-none transition-colors focus:border-gold-dark"
      />

      {value !== DEFAULT_WHATSAPP_MESSAGE_TEMPLATE && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_WHATSAPP_MESSAGE_TEMPLATE)}
          className="self-start text-base font-semibold text-ink-soft underline decoration-border underline-offset-4 hover:text-ink"
        >
          Kembalikan ke teks asli
        </button>
      )}
    </section>
  );
}
