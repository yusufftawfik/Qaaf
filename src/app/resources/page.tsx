import type { Metadata } from "next";
import Link from "next/link";
import { ALL_RESOURCES, BOOKS, MEDIA, PODCASTS, WRITINGS, KITS } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "المصادر",
  description: "الكتب والفيديوهات والبودكاست والمقالات والأبحاث والمواد التعليمية.",
};

const CATEGORIES: {
  icon: IconName;
  title: string;
  href: string;
  count: number;
}[] = [
  { icon: "book", title: "الكتب و PDF", href: "/resources/books", count: BOOKS.length },
  { icon: "play", title: "الفيديوهات والمحاضرات", href: "/resources/videos", count: MEDIA.length },
  { icon: "headphones", title: "البودكاست", href: "/resources/podcasts", count: PODCASTS.length },
  { icon: "file", title: "المقالات والأبحاث", href: "/search?type=article", count: WRITINGS.length },
  { icon: "presentation", title: "المواد التعليمية", href: "/search?type=educational", count: KITS.length },
  { icon: "search", title: "بحث متقدّم", href: "/search", count: ALL_RESOURCES.length },
];

export default function ResourcesPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المصادر" }]}
        eyebrow="مكتبة المنهاج"
        title="المصادر"
        description="اقرأ وشاهد واستمع — كل مادة مرتبطة بمحورها في خريطة منهاج النور."
      />

      <div className="container-page space-y-14 py-14">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link key={c.href} href={c.href} className="card-interactive group flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-parchment-50">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block font-bold text-navy-900 group-hover:text-gold-700">
                  {c.title}
                </span>
                <span className="text-xs text-ink-faint">{c.count} عنصر</span>
              </span>
              <Icon name="chevron-left" className="h-5 w-5 text-ink-faint" />
            </Link>
          ))}
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-navy-900">مختارات</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_RESOURCES.slice(0, 6).map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
