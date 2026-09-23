import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Great_Vibes, Jost, Lora } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import { couple, events, venue } from "@/lib/weddingData";
import "./globals.css";

/* ── The type system ──────────────────────────────────────────────────────
   Five families, one job each, and every --font-* token in globals.css
   aliases one of them. The split that matters is display-vs-text: a
   Garamond cut for large sizes and a separate screen-first serif for
   running copy, which is what the previous single-family setup (Italiana
   doing both) could not do — see each note below. */

// DISPLAY — section mastheads, card headings, dates, large numerals.
// An old-style Garamond: organic, hand-cut warmth that suits the botanical
// ground far better than a cold high-contrast Didone would. It also ships a
// real 300, so the airy `font-light` mastheads finally resolve to an actual
// weight instead of silently rendering at 400 (a font-weight the browser
// cannot synthesize — unlike bold/italic, light has no faux fallback).
// Already the face app/opengraph-image.tsx renders in, so the share card
// and the page it links to are now finally the same typeface.
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

// TEXT — every paragraph of running copy, and form fields.
// A screen-first text serif: moderate stroke contrast that survives at
// 15px where a display face's hairlines break up, and — the reason this
// family is here at all — a TRUE italic. This invitation sets a lot of
// prose in italic, all of which was previously a browser-synthesized
// slant of an upright display face.
const lora = Lora({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

// META — eyebrows, buttons, field labels, nav, countdown units.
// Geometric/Futura-descended. This whole layer is uppercase, so the small
// x-height costs nothing, while the uniform strokes and circular bowls
// carry the quiet luxury-fashion register the layer wants at 10–11px with
// wide tracking.
const jost = Jost({
  variable: "--font-meta",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// SCRIPT — the couple's names and the monogram initials, nothing else.
// Formal roundhand with enough stroke weight to actually carry the
// .text-gilded foil gradient; a hairline script leaves the gradient almost
// nothing to paint, which is what made the old foil read as flat colour.
const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

// ARABIC — the Qur'anic passage. A scholarly Naskh with proper support for
// the full diacritic stack, which general-purpose faces mangle.
const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

const siteUrl = "https://nufus-amri.vercel.app";
const title = `${couple.bride.shortName} & ${couple.groom.shortName} — The Wedding Of`;
const description = `Undangan pernikahan digital ${couple.bride.name} & ${couple.groom.name} — ${events[0].date}, ${venue.name}.`;

export const metadata: Metadata = {
  // required so the file-based opengraph-image below resolves to an
  // absolute URL — WhatsApp/Telegram/etc refuse relative og:image URLs
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    locale: "id_ID",
    type: "website",
  },
};

// Without this, browsers with an auto-dark-theme feature (e.g. Android
// Chrome's "Auto Dark Theme for Web Contents") guess at whether this page is
// dark-mode-eligible and can repaint it with mismatched, near-invisible
// low-contrast colors. Declaring it explicitly stops that.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f1edd8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${lora.variable} ${jost.variable} ${greatVibes.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-maroon-deep font-body text-on-maroon">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
