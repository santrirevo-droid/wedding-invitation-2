import type { Metadata, Viewport } from "next";
import { Amiri, DM_Sans, Italiana, Parisienne } from "next/font/google";
import BackgroundPattern from "@/components/BackgroundPattern";
import { couple, events, venue } from "@/lib/weddingData";
import "./globals.css";

/* Four families, and only four — every other --font-* token in globals.css
   aliases one of these. Re-themed from the previous Cormorant/Italianno/Jost
   set to match the herewego/ reference (see globals.css for the rest of
   that re-theme). */

// headings + all running copy. Italiana ships only weight 400/normal (no
// italic, no other weights) — any font-light/font-semibold/italic classes
// that reach font-display fall back to the browser's faux-bold/-italic,
// same trade-off herewego itself makes for the same font.
const italiana = Italiana({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// the couple's names, and nothing else — a true calligraphic face, used
// only at large sizes where its thin strokes and long swashes work
const parisienne = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

// tiny wide-tracked labels ("The Wedding Of", section eyebrows, IG handles).
// Kept geometric and quiet so it never competes with the serif.
const dmSans = DM_Sans({
  variable: "--font-meta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://nufus-amri.vercel.app";
const title = `${couple.groom.shortName} & ${couple.bride.shortName} — The Wedding Of`;
const description = `Undangan pernikahan digital ${couple.groom.name} & ${couple.bride.name} — ${events[0].date}, ${venue.name}.`;

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
  themeColor: "#f8e8e6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${italiana.variable} ${parisienne.variable} ${dmSans.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-maroon-deep font-body text-on-maroon">
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
