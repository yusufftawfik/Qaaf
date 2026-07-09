import { Hero } from "@/components/home/Hero";
import { CoreIdea } from "@/components/home/CoreIdea";
import { MapPreview } from "@/components/home/MapPreview";
import { DomainCards } from "@/components/home/DomainCards";
import { PersonaSelector } from "@/components/home/PersonaSelector";
import { JourneyStrip } from "@/components/home/JourneyStrip";
import { ResourcesTeaser } from "@/components/home/ResourcesTeaser";
import { NewsletterCTA } from "@/components/dialogue/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreIdea />
      <MapPreview />
      <DomainCards />
      <PersonaSelector />
      <JourneyStrip />
      <ResourcesTeaser />
      <div className="container-page py-16 sm:py-20">
        <NewsletterCTA />
      </div>
    </>
  );
}
