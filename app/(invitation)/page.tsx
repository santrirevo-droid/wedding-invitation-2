import Acara from "@/components/Acara";
import Footer from "@/components/Footer";
import { GiftSection } from "@/components/Gift";
import Hero from "@/components/Hero";
import Mempelai from "@/components/Mempelai";
import OpeningQuote from "@/components/OpeningQuote";
import OurStory from "@/components/OurStory";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";

/**
 * No separators between sections: every section now opens with its own
 * drawn flourish under the heading, so the standalone dividers the template
 * used to stack between them just doubled the ornament. The rhythm comes
 * from the shared py-28 and the repeated masthead instead.
 *
 * Gift (Tanda Kasih) and RSVP each render directly as their own section —
 * no modal tap needed to see either. RSVP sits last, right before the
 * guestbook it feeds.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <OpeningQuote />
      <Mempelai />
      <Acara />
      <GiftSection />
      <OurStory />
      <RSVP />
      <Wishes />
      <Footer />
    </main>
  );
}
