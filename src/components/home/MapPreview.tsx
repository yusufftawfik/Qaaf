import Link from "next/link";
import { DOMAINS_IN_MAP_ORDER, surahsByDomain } from "@/data/manhaj";
import type { ColorKey } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CHIP: Record<ColorKey, string> = {
  emerald: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  navy: "bg-parchment-50/8 text-parchment-100 border-parchment-50/15",
  gold: "bg-gold-500/15 text-gold-200 border-gold-400/25",
};
const LABEL: Record<ColorKey, string> = {
  emerald: "text-emerald-300",
  navy: "text-parchment-100",
  gold: "text-gold-300",
};

export function MapPreview() {
  return (
    <section className="relative overflow-hidden bg-navy-900 texture-navy">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="eyebrow text-gold-400">
            <span className="h-px w-6 bg-gold-500" />
            الخريطة قلب التجربة
          </div>
          <h2 className="wordmark mt-4 text-3xl font-bold text-parchment-50 sm:text-4xl">
            ١١٤ سورة، رحلة واحدة موجّهة
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-parchment-200/80">
            كل خلية في الخريطة عقدة قابلة للنقر تنقلك إلى مجالها ومجموعتها وسورتها.
            الأرقام بترتيب النزول — من (اقرأ) إلى اكتمال الرسالة.
          </p>
          <div className="mt-8">
            <Button href="/map" variant="gold" size="lg" iconRight="arrow-left">
              افتح الخريطة التفاعلية
            </Button>
          </div>
        </div>

        <Link
          href="/map"
          aria-label="افتح الخريطة التفاعلية"
          className="group grid gap-3 rounded-3xl border border-parchment-50/10 bg-navy-950/30 p-4 sm:grid-cols-3"
        >
          {DOMAINS_IN_MAP_ORDER.map((d) => (
            <div key={d.slug} className="rounded-2xl bg-navy-800/40 p-3">
              <p className={cn("wordmark mb-2 text-sm font-bold", LABEL[d.colorKey])}>
                {d.titleAr}
              </p>
              <div className="flex flex-wrap gap-1">
                {surahsByDomain(d.slug).map((s) => (
                  <span
                    key={s.slug}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-bold tabular-nums transition-transform group-hover:scale-105",
                      CHIP[d.colorKey]
                    )}
                  >
                    {s.nuzul}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Link>
      </div>
    </section>
  );
}
