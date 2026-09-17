"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buildInviteLink, buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/inviteLink";
import ShareMessageDialog from "./ShareMessageDialog";

type GuestEntry = {
  id: string;
  name: string;
  familySlug: string;
  familyLabel: string;
  relation: string;
  guestCount: number;
  createdAt: number;
};

type DuplicateCluster = {
  entries: { id: string; name: string; familyLabel: string }[];
};

export default function RekapClient() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [clusters, setClusters] = useState<DuplicateCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shareTarget, setShareTarget] = useState<GuestEntry | null>(null);

  async function handleCopyLink(entry: GuestEntry) {
    const link = buildInviteLink(window.location.origin, entry.name);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId((current) => (current === entry.id ? null : current)), 2000);
    } catch {
      // clipboard access failure — rare, not worth replacing the whole page for
    }
  }

  function handleConfirmSend(message: string) {
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setShareTarget(null);
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/guest-list/rekap", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error ?? "Gagal memuat data.");
          return;
        }
        setEntries(data.entries ?? []);
        setClusters(data.duplicateClusters ?? []);
      } catch {
        if (!cancelled) setError("Gagal memuat data. Periksa koneksi Anda.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <p className="text-xl text-on-maroon-soft">Memuat…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="text-3xl font-bold text-on-maroon">Rekap Daftar Tamu</h1>
        <p className="mt-4 text-lg font-medium text-red-700">{error}</p>
      </main>
    );
  }

  const totalPeople = entries.reduce((sum, entry) => sum + entry.guestCount, 0);

  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
        Ringkasan
      </p>
      <h1 className="mt-2 text-4xl font-bold text-on-maroon">Rekap Daftar Tamu</h1>
      <span className="rule-gild mt-5 block w-16" />
      <p className="mt-5 text-xl text-on-maroon-soft">
        {entries.length} nama · {totalPeople} orang
      </p>

      {clusters.length > 0 && (
        <section className="notice-caution mt-8 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gold-dark">
            ⚠ Kemungkinan Nama Duplikat ({clusters.length})
          </h2>
          <p className="mt-1 text-lg text-ink-soft">
            Periksa apakah nama-nama ini merujuk ke orang yang sama.
          </p>
          <ul className="mt-4 flex flex-col gap-4">
            {clusters.map((cluster, i) => (
              <li key={i} className="rounded-xl bg-paper p-4">
                <ul className="flex flex-col gap-1">
                  {cluster.entries.map((entry) => (
                    <li key={entry.id} className="text-lg text-ink">
                      {entry.name}{" "}
                      <span className="text-base text-ink-soft">— {entry.familyLabel}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ol className="mt-10 flex flex-col gap-3">
        {entries.map((entry, index) => (
          <li key={entry.id} className="card-stock flex gap-4 rounded-[3px] px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-dark text-base font-bold text-paper">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xl font-medium text-ink">
                {entry.name}
                {entry.guestCount > 1 && (
                  <span className="ml-2 text-base font-normal text-ink-soft">
                    · {entry.guestCount} orang
                  </span>
                )}
              </p>
              {entry.relation && (
                <p className="mt-0.5 truncate text-base text-ink-soft">{entry.relation}</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => setShareTarget(entry)}
                  className="min-h-11 rounded-lg bg-sage px-4 text-base font-semibold text-white transition-colors hover:brightness-95"
                >
                  Kirim WhatsApp
                </button>
                <button
                  onClick={() => handleCopyLink(entry)}
                  className="min-h-11 rounded-lg border border-border px-4 text-base font-semibold text-ink transition-colors hover:bg-maroon"
                >
                  {copiedId === entry.id ? "Tersalin!" : "Salin Link"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-base text-on-maroon-soft">
        Untuk menghapus atau mengubah nama, buka{" "}
        <Link href="/daftar-tamu" className="underline decoration-accent/60 underline-offset-4">
          /daftar-tamu
        </Link>
        .
      </p>

      {shareTarget && (
        <ShareMessageDialog
          guestName={shareTarget.name}
          defaultMessage={buildWhatsAppMessage(
            buildInviteLink(window.location.origin, shareTarget.name),
            shareTarget.name
          )}
          onCancel={() => setShareTarget(null)}
          onSend={handleConfirmSend}
        />
      )}
    </main>
  );
}
