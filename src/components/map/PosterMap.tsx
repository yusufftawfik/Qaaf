import Link from "next/link";
import type { Surah } from "@/lib/types";
import {
  DOMAINS_IN_MAP_ORDER,
  getLetter,
  lettersByDomain,
  sectionsByDomain,
  surahsBySection,
  surahTheme,
} from "@/data/manhaj";
import { MapEmblem } from "./MapEmblem";
import { ScaleToFit } from "./ScaleToFit";
import { cn } from "@/lib/utils";

/** Natural (unscaled) width of the poster; ScaleToFit fits it to the page. */
const DESIGN_WIDTH = 1200;

/** Compact column titles (the poster's per-column theme headers). */
const SHORT: Record<string, string> = {
  ikhlas: "الإخلاص",
  majd: "المجد",
  executive: "القيادة التنفيذية",
  crisis: "إدارة الشدائد",
  legislative: "الحكمة والتشريع",
  judicial: "فصل الخطاب",
  economic: "القوة الاقتصادية",
  light: "الإخراج إلى النور",
  moral: "الردع الأخلاقي",
  defense: "الدفاع والحقوق",
  behavioral: "القوة السلوكية",
  foreign: "الشئون الخارجية",
};

/* A single clickable surah cell: number + name (as on the poster).
   The WHOLE box highlights on hover (gold fill + inset ring). */
function Cell({ surah, highlight }: { surah: Surah; highlight?: boolean }) {
  return (
    <Link
      href={`/surahs/${surah.slug}`}
      title={`${surah.nuzul}. سورة ${surah.nameAr} — ${surahTheme(surah)}`}
      className={cn(
        "group relative flex min-h-[21px] items-center gap-1 px-1.5 py-0.5 transition-colors",
        "hover:z-10 hover:bg-gold-200 hover:ring-2 hover:ring-inset hover:ring-gold-500",
        highlight ? "bg-gold-500/20" : "bg-parchment-50"
      )}
    >
      <span className="flex h-[15px] min-w-[17px] items-center justify-center rounded-sm bg-navy-900/[0.07] text-[9px] font-bold tabular-nums text-navy-700 group-hover:bg-navy-900 group-hover:text-parchment-50">
        {surah.nuzul}
      </span>
      <span className="truncate text-[11px] font-semibold leading-none text-navy-900">
        {surah.nameAr}
      </span>
    </Link>
  );
}

/* One theme column: short header + its surah cells (ascending nuzul). */
function ThemeColumn({ sectionKey }: { sectionKey: string }) {
  const surahs = surahsBySection(sectionKey);
  const letter = getLetter(surahs[0].letterSlug)!;
  return (
    <div className="flex flex-col overflow-hidden rounded border border-gold-300/50 bg-gold-300/25">
      <Link
        href={`/letters/${letter.slug}`}
        className="flex min-h-[26px] items-center justify-center bg-parchment-100 px-1 py-1 text-center transition-colors hover:bg-parchment-200"
      >
        <span className="text-[9px] font-bold leading-tight text-navy-900">
          {SHORT[sectionKey]}
        </span>
      </Link>
      <div className="flex flex-col gap-px">
        {surahs.map((s) => (
          <Cell key={s.slug} surah={s} highlight={s.nuzul === 1} />
        ))}
      </div>
    </div>
  );
}

/**
 * PosterMap — a faithful, fully clickable rendition of the Manhaj Al-Noor
 * poster. Three domains sit side by side (right→left: individual → governance →
 * nation); each has a letter band (ن ق / ص ط ر ج / م) over its theme columns,
 * with cells in ascending nuzul order. The whole board scales to any width.
 */
export function PosterMap() {
  const domains = DOMAINS_IN_MAP_ORDER;
  const gridCols = domains.map((d) => `${sectionsByDomain(d.slug).length}fr`).join(" ");

  return (
    <ScaleToFit designWidth={DESIGN_WIDTH}>
      <section className="relative overflow-hidden rounded-3xl border border-parchment-200 bg-parchment-50 texture-parchment p-4 shadow-card">
        {/* Title */}
        <header className="mb-4 text-center">
          <div className="mb-1.5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-l from-gold-500 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
              أمة القرآن
            </span>
            <span className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent" />
          </div>
          <h1 className="wordmark text-4xl font-bold text-navy-900">منهاج النور</h1>
          <p className="mt-1 text-base text-gold-700">
            بناء الإنسان والعمران بترتيب نزول القرآن
          </p>
        </header>

        {/* Three domains, side by side */}
        <div className="grid items-stretch gap-3" style={{ gridTemplateColumns: gridCols }}>
          {domains.map((domain) => {
            const sections = sectionsByDomain(domain.slug);
            const letters = lettersByDomain(domain.slug);
            const isGovernance = domain.slug === "al-hukm-al-adil";
            const colTemplate = `repeat(${sections.length}, minmax(0,1fr))`;
            return (
              <div key={domain.slug} className="flex h-full flex-col">
                {/* Domain band */}
                <Link
                  href={`/domains/${domain.slug}`}
                  className="mb-1.5 block rounded-lg bg-navy-900 texture-navy px-3 py-2 text-center transition-colors hover:bg-navy-800"
                >
                  <span className="wordmark block text-lg font-bold leading-tight text-gold-300">
                    {domain.titleAr}
                  </span>
                </Link>

                {/* Letter band (letters span their theme columns) */}
                <div
                  className="mb-1.5 grid gap-1"
                  style={{ gridTemplateColumns: colTemplate }}
                >
                  {letters.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/letters/${l.slug}`}
                      style={{ gridColumn: `span ${l.sectionKeys.length}` }}
                      className="flex items-center justify-center rounded bg-navy-800/90 py-1 transition-colors hover:bg-navy-700"
                    >
                      <span className="wordmark text-base font-bold text-gold-300">
                        {l.letter}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Theme columns */}
                <div className="grid items-start gap-1" style={{ gridTemplateColumns: colTemplate }}>
                  {sections.map((s) => (
                    <ThemeColumn key={s.key} sectionKey={s.key} />
                  ))}
                </div>

                {/* Governance is shortest → emblem fills its gap, as on the poster. */}
                {isGovernance ? (
                  <div className="flex flex-1 items-center justify-center py-4">
                    <MapEmblem />
                  </div>
                ) : (
                  <div className="flex-1" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-[11px] text-ink-faint">
          انقر أي خلية للانتقال إلى صفحة السورة — الأرقام بترتيب النزول
        </p>
      </section>
    </ScaleToFit>
  );
}
