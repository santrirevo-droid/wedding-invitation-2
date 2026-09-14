"use client";

import { useGuestName } from "@/hooks/useGuestName";

function GreetingCardShell({ guestName }: { guestName: string }) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-border/90 bg-gradient-to-b from-paper to-[#f1e4cd] px-6 py-5 text-center shadow-[0_10px_28px_-18px_rgba(61,42,26,0.3)] ring-1 ring-inset ring-accent/10">
      <p className="font-body text-base leading-tight text-ink-soft">Kepada Yth.</p>
      <p className="font-body text-base leading-tight text-ink-soft">Bapak/Ibu/Saudara/i</p>
      {guestName && (
        <p className="mt-1.5 font-body text-2xl font-semibold leading-tight text-ink">{guestName}</p>
      )}
    </div>
  );
}

/** Personalized greeting card — reads the guest's name from the URL. */
export default function GuestGreeting() {
  const guestName = useGuestName();
  return <GreetingCardShell guestName={guestName} />;
}

/** Suspense fallback: identical shell with the generic sapaan, so there's
 * no layout shift once the real (possibly personalized) card hydrates in. */
export function GuestGreetingFallback() {
  return <GreetingCardShell guestName="" />;
}
