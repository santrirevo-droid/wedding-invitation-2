import type { Metadata } from "next";
import Link from "next/link";
import { guestListFamily } from "@/lib/families";
import { couple, events } from "@/lib/weddingData";
import GuestListClient from "@/components/GuestList/GuestListClient";

export const metadata: Metadata = {
  title: `Daftar Tamu — ${couple.groom.shortName} & ${couple.bride.shortName}`,
  description: "Halaman untuk menambahkan nama tamu yang ingin diundang.",
};

export default function DaftarTamuPage() {
  return (
    <GuestListClient
      family={guestListFamily}
      intro={
        <>
          <p className="mt-2 text-xl text-on-maroon-soft">
            {couple.groom.shortName} &amp; {couple.bride.shortName} — {events[0].date}
          </p>
          <p className="mt-4 text-xl leading-relaxed text-on-maroon-soft">
            Tuliskan nama-nama tamu yang ingin Anda undang, satu nama per baris.
          </p>
        </>
      }
      footer={
        <p className="mt-12 text-center text-base text-on-maroon-soft">
          <Link href="/daftar-tamu/rekap" className="underline decoration-accent/60 underline-offset-4">
            Lihat rekap &amp; cek nama ganda
          </Link>
        </p>
      }
    />
  );
}
