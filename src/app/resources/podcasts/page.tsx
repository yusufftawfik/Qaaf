import type { Metadata } from "next";
import { PODCASTS, PODCAST_FEED } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { PodcastCard } from "@/components/resources/PodcastCard";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "البودكاست",
  description: "حلقات صوتية تتبع محاور منهاج النور.",
};

export default function PodcastsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المصادر", href: "/resources" },
          { label: "البودكاست" },
        ]}
        eyebrow="مسموعات المنهاج"
        title={PODCAST_FEED.title}
        description="حلقات صوتية قصيرة تسير مع الخريطة، محطة تلو الأخرى."
      />
      <div className="container-page max-w-3xl py-14">
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-gold-300/60 bg-gold-500/[0.06] p-4">
          <Icon name="headphones" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <div className="text-sm text-ink-soft">
            <p>
              <strong className="text-navy-900">تهيئة RSS مبدئية:</strong>{" "}
              {PODCAST_FEED.note} عند توفّر الخلاصة، سيُربط العنوان{" "}
              <code className="rounded bg-parchment-200 px-1.5 py-0.5 text-xs" dir="ltr">
                {PODCAST_FEED.rssUrl}
              </code>{" "}
              تلقائيًا بكل منصّات البودكاست.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {PODCASTS.map((p) => (
            <PodcastCard key={p.slug} podcast={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
