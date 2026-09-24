import type { Metadata, Viewport } from "next";
import { Amiri, Bodoni_Moda, EB_Garamond, Italianno, Jost } from "next/font/google";
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
// A true Didone, and the reason the page reads as editorial rather than
// merely pretty: hairline serifs against heavy stems is the fashion-
// masthead contrast, which an old-style Garamond (the previous choice)
// deliberately avoids. Its optical-size axis keeps that contrast from
// getting spindly as the mastheads scale up.
//
// Note it starts at 400 — there is no 300 here, unlike Cormorant. Nothing
// may set `font-light` on this face: browsers synthesize bold and italic
// but never light, so it would silently render 400 and the class would be
// a lie. The mastheads say font-normal for that reason.
const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

// TEXT — every paragraph of running copy, and form fields.
// A Garamond for the small sizes, where the display face's hairlines would
// break up. Quieter and lower-contrast than the Didone above on purpose:
// two high-contrast faces at once makes a page shimmer. Carries a TRUE
// italic, which this invitation leans on heavily.
const ebGaramond = EB_Garamond({
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

// SCRIPT — the couple's names, nothing else.
// A flowing engraver's italic rather than a round copperplate: its own
// thick/thin contrast answers the Didone above, where a roundhand sits in
// a noticeably different register beside one. Still carries enough stroke
// weight to hold the .text-gilded foil gradient, which the very fine
// scripts (Pinyon, Tangerine) could not.
//
// It sets small on the body — roughly 1.3x the point size of a roundhand
// for the same apparent size — so every font-script size is scaled up to
// match, not left at the old values.
const italianno = Italianno({
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
      className={`${bodoni.variable} ${ebGaramond.variable} ${jost.variable} ${italianno.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-maroon-deep font-body text-on-maroon">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
