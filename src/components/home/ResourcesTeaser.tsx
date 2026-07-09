import Link from "next/link";
import { BOOKS, MEDIA, PODCASTS, CHANNEL } from "@/data/resources";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TILES: {
  icon: IconName;
  title: string;
  desc: string;
  href: string;
  count: number;
  unit: string;
}[] = [
  {
    icon: "book",
    title: "الكتب و PDF",
    desc: "مؤلفات المنهاج للتحميل والقراءة.",
    href: "/resources/books",
    count: BOOKS.length,
    unit: "كتاب",
  },
  {
    icon: "play",
    title: "الفيديوهات",
    desc: "محاضرات وخطب من قناة كنوز النور.",
    href: "/resources/videos",
    count: MEDIA.length,
    unit: "مقطع",
  },
  {
    icon: "headphones",
    title: "البودكاست",
    desc: "حلقات صوتية تتبع محاور الخريطة.",
    href: "/resources/podcasts",
    count: PODCASTS.length,
    unit: "حلقة",
  },
];

export function ResourcesTeaser() {
  return (
    <section className="border-y border-parchment-200 bg-parchment-100/60 texture-parchment">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="المصادر"
          title="اقرأ، شاهد، استمع"
          description="مكتبة متنامية من الكتب والفيديوهات والبودكاست، مرتبطة بمحاور المنهاج."
          action={
            <Link
              href={CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600"
            >
              <Icon name="play" className="h-4 w-4" />
              قناة كنوز النور
            </Link>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TILES.map((t) => (
            <Link key={t.href} href={t.href} className="card-interactive group flex items-center gap-4 p-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-800 text-parchment-50">
                <Icon name={t.icon} className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-bold text-navy-900 group-hover:text-gold-700">{t.title}</h3>
                <p className="mt-0.5 text-sm text-ink-soft">{t.desc}</p>
                <span className="mt-1 block text-xs text-ink-faint">
                  {t.count} {t.unit}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
