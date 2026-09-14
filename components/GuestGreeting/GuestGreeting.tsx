"use client";

import { useGuestName } from "@/hooks/useGuestName";

function GreetingCardShell({ guestName }: { guestName: string }) {
  return (
    <div className="w-full max-w-[17rem] border border-accent/20 bg-white/[0.025] px-7 py-5 text-center backdrop-blur-[2px]">
      <p className="font-accent text-[9px] font-light uppercase tracking-[0.36em] text-on-maroon-soft">
        Kepada Yth.
      </p>
      <p className="mt-1.5 font-accent text-[9px] font-light uppercase tracking-[0.26em] text-on-maroon-soft/65">
        Bapak / Ibu / Saudara&#47;i
      </p>

      {guestName && (
        <>
          <span className="rule-gild mx-auto mt-4 block w-12" />
          <p className="mt-3.5 font-display text-[26px] font-light leading-tight text-on-maroon">
            {guestName}
          </p>
        </>
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
