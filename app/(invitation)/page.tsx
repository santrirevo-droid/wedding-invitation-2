import Acara from "@/components/Acara";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mempelai from "@/components/Mempelai";
import Moments from "@/components/Moments";
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
 * Gift is no longer its own section — its content moved into a modal RSVP
 * opens (see components/RSVP), matching the herewego/ reference's
 * "confirm attendance / send a gift" pair of actions instead of two long
 * always-visible sections.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <OpeningQuote />
      <Mempelai />
      <Acara />
      <Moments />
      <RSVP />
      <Wishes />
      <OurStory />
      <Footer />
    </main>
  );
}
