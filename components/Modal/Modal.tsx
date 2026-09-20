"use client";

import { useEffect, type ReactNode } from "react";

/**
 * A centred overlay card — the RSVP and Gift sections both open one of
 * these rather than sitting inline on the page, matching the herewego/
 * reference's modal-driven "kehadiran / tanda kasih" pattern instead of
 * two long always-visible sections.
 */
export default function Modal({
  titleId,
  onClose,
  children,
}: {
  titleId: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.documentElement.classList.add("scroll-locked");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/55 p-5 backdrop-blur-[2px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="card-stock relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[4px] px-7 py-10 text-center sm:px-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-3 flex h-9 w-9 cursor-pointer items-center justify-center text-2xl font-light leading-none text-ink-soft transition-colors hover:text-ink"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
