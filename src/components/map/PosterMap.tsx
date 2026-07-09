import Link from "next/link";
import type { Surah } from "@/lib/types";
import {
  DOMAINS_IN_MAP_ORDER,
  getLetter,
  getSection,
  sectionsByDomain,
  surahsBySection,
  surahTheme,
} from "@/data/manhaj";
import { MapEmblem } from "./MapEmblem";
import { ScaleToFit } from "./ScaleToFit";
import { cn } from "@/lib/utils";

/** Natural (unscaled) width of the poster; ScaleToFit shrinks it to fit. */
const DESIGN_WIDTH = 1240;

/* A single clickable surah cell (number + name), styled like a poster cell. */
function Cell({ surah, highlight }: { surah: Surah; highlight?: boolean }) {
  return (
    <Link
      href={`/surahs/${surah.slug}`}
      title={`${surah.nuzul}. سورة ${surah.nameAr} — ${surahTheme(surah)}`}
      className={cn(
        "group flex min-h-[32px] items-center gap-1.5 px-1.5 py-1 transition-colors",
        highlight
          ? "bg-gold-500/20 hover:bg-gold-500/30"
          : "bg-parchment-50 hover:bg-gold-100"
      )}
    >
      <span className="flex h-5 min-w-[20px] items-center justify-center rounded bg-navy-900/[0.07] px-1 text-[10px] font-bold tabular-nums text-navy-700 group-hover:bg-navy-900 group-hover:text-parchment-50">
        {surah.nuzul}
      </span>
      <span className="text-[11px] font-semibold leading-tight text-navy-900">
        {surah.nameAr}
      </span>
    </Link>
  );
}

/* One thematic sub-column: letter + section header, then its cells. */
function SubColumn({ sectionKey }: { sectionKey: string }) {
  const section = getSection(sectionKey)!;
  // Poster orders cells top→bottom by DESCENDING nuzul (e.g. 22 → 1).
  const surahs = [...surahsBySection(sectionKey)].reverse();
  const letter = getLetter(section.letterSlug)!;

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-gold-300/50 bg-gold-300/30">
      <Link
        href={`/letters/${letter.slug}`}
        className="flex flex-col items-center gap-0.5 bg-parchment-100 px-1 py-2 text-center transition-colors hover:bg-parchment-200"
      >
        <span className="wordmark text-lg font-bold leading-none text-gold-700">
          {letter.letter}
        </span>
        <span className="text-[10.5px] font-bold leading-tight text-navy-900">
          {section.titleAr}
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
 * poster. All three domains sit side by side horizontally (right→left:
 * individual → governance → nation) exactly as on the printed map, and the
 * whole board scales to fit any screen width via ScaleToFit.
 */
export function PosterMap() {
  const domains = DOMAINS_IN_MAP_ORDER;
  const gridCols = domains
    .map((d) => `${sectionsByDomain(d.slug).length}fr`)
    .join(" ");

  return (
    <ScaleToFit designWidth={DESIGN_WIDTH}>
      <section className="relative overflow-hidden rounded-3xl border border-parchment-200 bg-parchment-50 texture-parchment p-6 shadow-card">
        {/* Title */}
        <header className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-l from-gold-500 to-transparent" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-700">
              أمة القرآن
            </span>
            <span className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent" />
          </div>
          <h1 className="wordmark text-5xl font-bold text-navy-900">منهاج النور</h1>
          <p className="mt-2 text-lg text-gold-700">
            بناء الإنسان والعمران بترتيب نزول القرآن
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            انقر أي خلية للانتقال إلى صفحة السورة، أو رأس العمود للمجموعة والمجال
          </p>
        </header>

        {/* Three domains, side by side */}
        <div className="grid items-stretch gap-4" style={{ gridTemplateColumns: gridCols }}>
          {domains.map((domain) => {
            const sections = sectionsByDomain(domain.slug);
            const isGovernance = domain.slug === "al-hukm-al-adil";
            return (
              <div key={domain.slug} className="flex h-full flex-col">
                <Link
                  href={`/domains/${domain.slug}`}
                  className="mb-3 block rounded-xl bg-navy-900 texture-navy px-4 py-3 text-center transition-colors hover:bg-navy-800"
                >
                  <span className="wordmark block text-xl font-bold text-gold-300">
                    {domain.titleAr}
                  </span>
                  <span className="text-[11px] text-parchment-200/70">
                    {domain.subtitleAr}
                  </span>
                </Link>

                <div
                  className="grid items-start gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${sections.length}, minmax(0,1fr))`,
                  }}
                >
                  {sections.map((s) => (
                    <SubColumn key={s.key} sectionKey={s.key} />
                  ))}
                </div>

                {/* Governance is shortest, so the emblem fills its gap — as on
                    the poster. Other groups get a plain spacer. */}
                {isGovernance ? (
                  <div className="flex flex-1 items-center justify-center py-6">
                    <MapEmblem />
                  </div>
                ) : (
                  <div className="flex-1" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </ScaleToFit>
  );
}
