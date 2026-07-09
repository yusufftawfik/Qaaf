import Link from "next/link";
import type { Resource, ResourceType } from "@/lib/types";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

const META: Record<ResourceType, { label: string; icon: IconName; href: string }> = {
  book: { label: "كتاب", icon: "book", href: "/resources/books" },
  video: { label: "فيديو", icon: "play", href: "/resources/videos" },
  lecture: { label: "محاضرة", icon: "presentation", href: "/resources/videos" },
  sermon: { label: "خطبة", icon: "mic", href: "/resources/videos" },
  podcast: { label: "بودكاست", icon: "headphones", href: "/resources/podcasts" },
  article: { label: "مقال", icon: "file", href: "/resources" },
  paper: { label: "بحث", icon: "file", href: "/resources" },
  educational: { label: "مادة تعليمية", icon: "presentation", href: "/resources" },
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const meta = META[resource.type];
  return (
    <Link
      href={meta.href}
      className="card-interactive group flex flex-col p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800/6 text-navy-700">
          <Icon name={meta.icon} className="h-5 w-5" />
        </span>
        <Badge tone="gold">{meta.label}</Badge>
      </div>
      <h3 className="font-semibold leading-snug text-navy-900 group-hover:text-gold-700 clamp-2">
        {resource.titleAr}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft clamp-2">
        {resource.descriptionAr}
      </p>
      {resource.tags && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs text-ink-faint">
              #{t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function RelatedResources({
  resources,
  title = "مصادر داعمة",
}: {
  resources: Resource[];
  title?: string;
}) {
  if (!resources.length) return null;
  return (
    <section aria-label={title}>
      <h3 className="eyebrow mb-4">
        <span className="h-px w-6 bg-gold-500" />
        {title}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <ResourceCard key={r.slug} resource={r} />
        ))}
      </div>
    </section>
  );
}
