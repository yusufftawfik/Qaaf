import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DOMAINS_IN_MAP_ORDER, getLetter } from "@/data/manhaj";
import { cn } from "@/lib/utils";

const TILE: Record<string, string> = {
  emerald: "border-emerald-400/30 bg-emerald-500/10",
  navy: "border-parchment-50/15 bg-parchment-50/5",
  gold: "border-gold-400/30 bg-gold-500/10",
};

/** Decorative mini-map motif shown beside the hero copy. */
function MapMotif() {
  return (
    <div className="relative mx-auto grid max-w-md grid-cols-3 gap-3" aria-hidden="true">
      {DOMAINS_IN_MAP_ORDER.map((d, i) => (
        <div
          key={d.slug}
          className={cn(
            "rounded-2xl border p-3 backdrop-blur-sm",
            TILE[d.colorKey],
            i === 1 && "translate-y-4"
          )}
        >
          <p className="wordmark mb-2 text-sm font-bold text-parchment-50">
            {d.titleAr}
          </p>
          <div className="flex flex-wrap gap-1">
            {d.letters.map((l) => (
              <span
                key={l}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-950/40 text-sm font-bold text-gold-300"
              >
                {getLetter(l)?.letter}
              </span>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {Array.from({ length: 3 }).map((_, k) => (
              <span
                key={k}
                className="block h-1.5 rounded-full bg-parchment-50/15"
                style={{ width: `${90 - k * 18}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 texture-navy">
      <div className="absolute inset-0 bg-gradient-to-bl from-navy-800 via-navy-900 to-navy-950" />
      <div className="container-page relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="animate-fade-up">
          <div className="eyebrow text-gold-400">
            <span className="h-px w-6 bg-gold-500" />
            أمة القرآن
          </div>
          <h1 className="wordmark mt-4 text-5xl font-bold leading-tight text-parchment-50 sm:text-6xl">
            منهاج النور
          </h1>
          <p className="mt-4 max-w-xl text-xl text-gold-300">
            بناء الإنسان والعمران بترتيب نزول القرآن
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment-200/80">
            ليست مكتبة محتوى، بل خريطة معرفية موجّهة. في كل صفحة تعرف أين أنت، وماذا
            تعني، وكيف تتصل بالكل، وإلى أين تذهب بعدها.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/map" variant="gold" size="lg" iconRight="arrow-left">
              استكشف الخريطة
            </Button>
            <Button href="/about/manhaj-al-noor" variant="light" size="lg">
              ابدأ من هنا
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <MapMotif />
        </div>
      </div>

      <Link
        href="/map"
        className="relative block border-t border-parchment-50/10 bg-navy-950/40 py-4 text-center text-sm text-parchment-200/70 transition-colors hover:text-gold-300 lg:hidden"
      >
        استكشف الخريطة الكاملة ←
      </Link>
    </section>
  );
}
