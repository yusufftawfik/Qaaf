import type { Metadata } from "next";
import { MEDIA, CHANNEL } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { VideoEmbed } from "@/components/resources/VideoEmbed";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "الفيديوهات والمحاضرات",
  description: "محاضرات وخطب ودروس من قناة كنوز النور.",
};

const TYPE_LABEL: Record<string, string> = {
  video: "فيديو",
  lecture: "محاضرة",
  sermon: "خطبة",
};

export default function VideosPage() {
  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المصادر", href: "/resources" },
          { label: "الفيديوهات" },
        ]}
        eyebrow="مرئيات المنهاج"
        title="الفيديوهات والمحاضرات"
        description="محاضرات وخطب ودروس مرتبطة بمحاور الخريطة. المشغّل يُحمّل عند الطلب فقط."
        meta={
          <a
            href={CHANNEL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-4 py-2.5 text-sm font-semibold text-parchment-50 transition-colors hover:bg-navy-700"
          >
            <Icon name="play" className="h-4 w-4 text-gold-400" />
            زر قناة كنوز النور على يوتيوب
            <Icon name="external" className="h-3.5 w-3.5 opacity-70" />
          </a>
        }
      />
      <div className="container-page py-14">
        <div className="grid gap-8 md:grid-cols-2">
          {MEDIA.map((m) => (
            <article key={m.slug} className="space-y-3">
              <VideoEmbed youtubeId={m.youtubeId} title={m.titleAr} />
              <div className="flex items-center gap-2">
                <Badge tone="gold">{TYPE_LABEL[m.type]}</Badge>
                {m.duration && <span className="text-xs text-ink-faint">{m.duration}</span>}
              </div>
              <h2 className="font-bold text-navy-900">{m.titleAr}</h2>
              <p className="text-sm leading-relaxed text-ink-soft">{m.descriptionAr}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
