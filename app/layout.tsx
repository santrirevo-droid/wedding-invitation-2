import type { Metadata, Viewport } from "next";
import { EB_Garamond, Amiri, Jost, Parisienne } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import { couple, events, venue } from "@/lib/weddingData";
import "./globals.css";

// the one serif that carries everything except the couple's name and
// section flourishes — --font-body and --font-accent both alias to this
// in globals.css. Google-hosted, so no local-font license risk (replaces
// the earlier Cormorant Garamond + locally-bundled files below).
const ebGaramond = EB_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

// couple's name, RSVP heading, and the "Mempelai" section eyebrow all share
// this flowing script — one elegant flourish face instead of two
// competing local script fonts
const parisienne = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

// used only for the Mempelai section's descriptive body copy and the
// couple's Instagram handles — a clean geometric sans as counterweight to
// the serif/script above (also replaces the TT Fors trial font, which
// carried a no-public-site license clause)
const jost = Jost({
  variable: "--font-mempelai",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// used only for the couple's full names (Mempelai section headings) — bold
// italic Garamond instead of a separate local serif
const ebGaramondFullname = EB_Garamond({
  variable: "--font-fullname",
  subsets: ["latin"],
  weight: "700",
  style: "italic",
});

// used only for the couple's Instagram handles
const jostHandle = Jost({
  variable: "--font-handle",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// used only for the RSVP section's "Konfirmasi Kehadiran" heading — same
// script family as the couple's name for a cohesive, restrained look
const parisienneRsvp = Parisienne({
  variable: "--font-rsvp",
  subsets: ["latin"],
  weight: "400",
});

// used only for the "Mempelai" section heading
const parisienneTitle = Parisienne({
  variable: "--font-title-mempelai",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${couple.groom.shortName} & ${couple.bride.shortName} — The Wedding Of`,
  description: `Undangan pernikahan digital ${couple.groom.name} & ${couple.bride.name} — ${events[0].date}, ${venue.name}.`,
};

// Without this, browsers with an auto-dark-theme feature (e.g. Android
// Chrome's "Auto Dark Theme for Web Contents") guess at whether this light
// pink design is dark-mode-eligible and can repaint it with mismatched,
// near-invisible low-contrast colors. Declaring it explicitly stops that.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${ebGaramond.variable} ${amiri.variable} ${parisienne.variable} ${jost.variable} ${ebGaramondFullname.variable} ${jostHandle.variable} ${parisienneRsvp.variable} ${parisienneTitle.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-white font-body text-ink">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
