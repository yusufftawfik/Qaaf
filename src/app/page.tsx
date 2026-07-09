import { PosterMap } from "@/components/map/PosterMap";
import { CoreIdea } from "@/components/home/CoreIdea";
import { PersonaSelector } from "@/components/home/PersonaSelector";
import { JourneyStrip } from "@/components/home/JourneyStrip";
import { ResourcesTeaser } from "@/components/home/ResourcesTeaser";
import { NewsletterCTA } from "@/components/dialogue/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      {/* The Manhaj Al-Noor poster IS the homepage — every cell is clickable. */}
      <section className="container-page pt-8">
        <PosterMap />
      </section>
      <CoreIdea />
      <PersonaSelector />
      <JourneyStrip />
      <ResourcesTeaser />
      <div className="container-page py-16 sm:py-20">
        <NewsletterCTA />
      </div>
    </>
  );
}
