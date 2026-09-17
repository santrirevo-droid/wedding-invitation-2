"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Confirm-and-edit step shown before a WhatsApp invite is sent — lets the
 * sender personalise the greeting (add a nickname, soften the wording, add
 * a note) instead of blasting the same generic template to everyone.
 * Deliberately a plain in-page overlay rather than a library dialog: this
 * app has exactly one modal, so pulling in a whole dialog primitive for it
 * isn't worth the dependency.
 */
export default function ShareMessageDialog({
  guestName,
  defaultMessage,
  onCancel,
  onSend,
}: {
  guestName: string;
  defaultMessage: string;
  onCancel: () => void;
  onSend: (message: string) => void;
}) {
  const [message, setMessage] = useState(defaultMessage);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-message-heading"
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onClick={onCancel}
    >
      <div
        className="card-stock flex max-h-[88vh] w-full flex-col gap-4 rounded-t-2xl p-6 sm:max-w-lg sm:rounded-[3px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 id="share-message-heading" className="text-xl font-bold text-ink">
            Edit Pesan untuk {guestName}
          </h2>
          <p className="mt-1 text-base text-ink-soft">
            Sesuaikan kalimat pengantar sebelum dikirim. Tautan undangan sebaiknya tetap
            disertakan agar tamu bisa membuka halamannya.
          </p>
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={12}
          className="w-full flex-1 resize-y rounded-xl border-2 border-border bg-paper px-4 py-3 text-lg leading-relaxed text-ink outline-none transition-colors focus:border-gold-dark"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMessage(defaultMessage)}
            className="text-base font-semibold text-ink-soft underline decoration-border underline-offset-4 hover:text-ink"
          >
            Kembalikan ke teks asli
          </button>

          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="min-h-12 rounded-lg border border-border px-5 text-base font-semibold text-ink"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => onSend(message)}
              disabled={message.trim().length === 0}
              className="min-h-12 rounded-lg bg-sage px-5 text-base font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              Kirim via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
