import Link from "next/link";
import { DOMAINS_IN_MAP_ORDER, getLetter, surahsByDomain } from "@/data/manhaj";
import type { ColorKey } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const ACCENT: Record<ColorKey, string> = {
  emerald: "bg-emerald-600",
  navy: "bg-navy-700",
  gold: "bg-gold-500",
};

export function DomainCards() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="المجالات الثلاثة"
        title="من الفرد إلى الأمة"
        description="ثلاثة مجالات كبرى ترتّب رحلة البناء: الفرد المخلص، ثم الحكم العادل، ثم الأمة الراشدة."
        action={
          <Link
            href="/map"
            className="flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-600"
          >
            الخريطة الكاملة
            <Icon name="arrow-left" className="h-4 w-4" />
          </Link>
        }
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {DOMAINS_IN_MAP_ORDER.map((d) => (
          <Link
            key={d.slug}
            href={`/domains/${d.slug}`}
            className="card-interactive group flex flex-col overflow-hidden"
          >
            <span className={cn("h-1.5 w-full", ACCENT[d.colorKey])} />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="wordmark text-2xl font-bold text-navy-900">
                  {d.titleAr}
                </h3>
                <span className="text-sm text-ink-faint">{surahsByDomain(d.slug).length} سورة</span>
              </div>
              <p className="text-sm text-gold-700">{d.titleEn}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft clamp-3">
                {d.descriptionAr}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {d.letters.map((l) => {
                  const letter = getLetter(l)!;
                  return (
                    <span
                      key={l}
                      className="flex items-center gap-1.5 rounded-lg bg-parchment-100 px-2.5 py-1 text-xs"
                    >
                      <span className="wordmark font-bold text-gold-700">{letter.letter}</span>
                      <span className="text-navy-800">{letter.titleAr}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
