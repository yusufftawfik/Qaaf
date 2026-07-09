import type { Podcast } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <article className="card-interactive flex items-center gap-4 p-4">
      <a
        href={podcast.audioUrl ?? "#"}
        aria-label={`استماع: ${podcast.titleAr}`}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-parchment-50 transition-colors hover:bg-emerald-600"
      >
        <Icon name="headphones" className="h-6 w-6" />
      </a>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          {podcast.episode && <Badge tone="emerald">حلقة {podcast.episode}</Badge>}
          {podcast.duration && (
            <span className="text-xs text-ink-faint">{podcast.duration}</span>
          )}
        </div>
        <h3 className="font-semibold leading-snug text-navy-900 clamp-1">
          {podcast.titleAr}
        </h3>
        <p className="mt-0.5 text-sm text-ink-soft clamp-2">{podcast.descriptionAr}</p>
      </div>
    </article>
  );
}
