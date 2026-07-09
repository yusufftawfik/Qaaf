"use client";

import * as React from "react";
import Link from "next/link";
import type { ColorKey, Surah } from "@/lib/types";
import {
  DOMAINS_IN_MAP_ORDER,
  getDomain,
  getLetter,
  getSection,
  sectionsByDomain,
  surahsBySection,
} from "@/data/manhaj";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/* ---- Per-domain colour styling ----------------------------------- */
const STYLE: Record<
  ColorKey,
  { band: string; num: string; hover: string; ring: string; dot: string }
> = {
  emerald: {
    band: "from-emerald-700 to-emerald-800",
    num: "bg-emerald-600/12 text-emerald-800",
    hover: "hover:border-emerald-500/70",
    ring: "ring-emerald-500",
    dot: "bg-emerald-600",
  },
  navy: {
    band: "from-navy-700 to-navy-900",
    num: "bg-navy-800/8 text-navy-800",
    hover: "hover:border-navy-600/70",
    ring: "ring-navy-600",
    dot: "bg-navy-700",
  },
  gold: {
    band: "from-gold-600 to-gold-700",
    num: "bg-gold-500/15 text-gold-700",
    hover: "hover:border-gold-500/80",
    ring: "ring-gold-500",
    dot: "bg-gold-500",
  },
};

type Filters = {
  query: string;
  domain: string | null;
  revelation: "Meccan" | "Medinan" | null;
};

function useMatcher({ query, domain, revelation }: Filters) {
  const q = query.trim().toLowerCase();
  return React.useCallback(
    (s: Surah) => {
      if (domain && s.domainSlug !== domain) return false;
      if (revelation && s.revelation !== revelation) return false;
      if (q) {
        const hit =
          s.nameAr.includes(query.trim()) ||
          s.nameEn.toLowerCase().includes(q) ||
          String(s.nuzul) === q ||
          String(s.mushaf) === q;
        if (!hit) return false;
      }
      return true;
    },
    [q, query, domain, revelation]
  );
}

/* ---- A single surah node ----------------------------------------- */
function SurahNode({
  surah,
  color,
  active,
  onHover,
}: {
  surah: Surah;
  color: ColorKey;
  active: boolean;
  onHover: (s: Surah | null) => void;
}) {
  const st = STYLE[color];
  return (
    <Link
      href={`/surahs/${surah.slug}`}
      onMouseEnter={() => onHover(surah)}
      onFocus={() => onHover(surah)}
      onMouseLeave={() => onHover(null)}
      title={`${surah.nuzul}. سورة ${surah.nameAr}`}
      className={cn(
        "group flex items-center gap-2 rounded-lg border border-parchment-200 bg-white/70 px-2 py-1.5 transition-all duration-150",
        st.hover,
        "hover:-translate-y-px hover:shadow-card",
        !active && "opacity-25 saturate-0"
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold tabular-nums",
          st.num
        )}
      >
        {surah.nuzul}
      </span>
      <span className="min-w-0 text-[12px] font-medium leading-tight text-navy-900 clamp-2">
        {surah.nameAr}
      </span>
    </Link>
  );
}

/* ---- The detail / legend side panel ------------------------------ */
function DetailPanel({ surah }: { surah: Surah | null }) {
  if (!surah) {
    return (
      <div className="card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-bold text-navy-900">
          <Icon name="compass" className="h-5 w-5 text-gold-600" />
          دليل الخريطة
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-ink-soft">
          مرّر فوق أي سورة لعرض تفاصيلها، أو انقر للانتقال إليها. الرقم على كل
          خلية هو <strong className="text-navy-900">ترتيب النزول</strong>.
        </p>
        <ul className="space-y-2.5 text-sm">
          {DOMAINS_IN_MAP_ORDER.map((d) => (
            <li key={d.slug} className="flex items-center gap-2.5">
              <span className={cn("h-3 w-3 rounded-full", STYLE[d.colorKey].dot)} />
              <span className="text-navy-800">{d.titleAr}</span>
              <span className="text-xs text-ink-faint">{d.subtitleAr}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const domain = getDomain(surah.domainSlug)!;
  const letter = getLetter(surah.letterSlug)!;
  const section = getSection(surah.sectionKey)!;
  const st = STYLE[domain.colorKey];

  return (
    <div className="card overflow-hidden">
      <div className={cn("bg-gradient-to-br p-5 text-parchment-50 texture-navy", st.band)}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-parchment-100/80">ترتيب النزول</span>
          <span className="wordmark text-3xl font-bold">{surah.nuzul}</span>
        </div>
        <h3 className="wordmark mt-1 text-2xl font-bold">سورة {surah.nameAr}</h3>
        <p className="text-sm text-parchment-100/80">{surah.nameEn}</p>
      </div>
      <div className="space-y-4 p-5">
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-parchment-100 py-2">
            <dt className="text-[11px] text-ink-faint">المصحف</dt>
            <dd className="font-bold text-navy-900">{surah.mushaf}</dd>
          </div>
          <div className="rounded-lg bg-parchment-100 py-2">
            <dt className="text-[11px] text-ink-faint">الآيات</dt>
            <dd className="font-bold text-navy-900">{surah.ayah}</dd>
          </div>
          <div className="rounded-lg bg-parchment-100 py-2">
            <dt className="text-[11px] text-ink-faint">النزول</dt>
            <dd className="font-bold text-navy-900">
              {surah.revelation === "Meccan" ? "مكية" : "مدنية"}
            </dd>
          </div>
        </dl>

        {surah.themeAr && (
          <p className="rounded-lg bg-gold-500/10 px-3 py-2 text-sm text-gold-700">
            المحور: <strong>{surah.themeAr}</strong>
          </p>
        )}

        <div className="space-y-1.5 text-sm">
          <PanelRow label="المجال" value={domain.titleAr} href={`/domains/${domain.slug}`} />
          <PanelRow
            label="المجموعة"
            value={`${letter.letter} · ${letter.titleAr}`}
            href={`/letters/${letter.slug}`}
          />
          <PanelRow label="المحور" value={section.titleAr} href={`/letters/${letter.slug}`} />
        </div>

        <Link
          href={`/surahs/${surah.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-800 py-2.5 text-sm font-semibold text-parchment-50 transition-colors hover:bg-navy-700"
        >
          افتح السورة
          <Icon name="arrow-left" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function PanelRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-parchment-100"
    >
      <span className="text-ink-faint">{label}</span>
      <span className="flex items-center gap-1 font-medium text-navy-900">
        {value}
        <Icon name="chevron-left" className="h-3.5 w-3.5 text-ink-faint" />
      </span>
    </Link>
  );
}

/* ---- Toolbar ----------------------------------------------------- */
function Toolbar({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const active =
    filters.query || filters.domain || filters.revelation ? true : false;
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] flex-1">
        <Icon
          name="search"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
        />
        <input
          value={filters.query}
          onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
          placeholder="ابحث باسم السورة أو رقم النزول…"
          aria-label="بحث في الخريطة"
          className="w-full rounded-xl border border-parchment-200 bg-white/70 py-2.5 pr-9 pl-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {DOMAINS_IN_MAP_ORDER.map((d) => (
          <button
            key={d.slug}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                domain: f.domain === d.slug ? null : d.slug,
              }))
            }
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
              filters.domain === d.slug
                ? "border-transparent bg-navy-800 text-parchment-50"
                : "border-parchment-200 bg-white/60 text-navy-800 hover:border-gold-400"
            )}
          >
            <span className={cn("h-2.5 w-2.5 rounded-full", STYLE[d.colorKey].dot)} />
            {d.titleAr}
          </button>
        ))}
      </div>

      <div className="flex rounded-full border border-parchment-200 bg-white/60 p-0.5 text-sm">
        {(["Meccan", "Medinan"] as const).map((r) => (
          <button
            key={r}
            onClick={() =>
              setFilters((f) => ({ ...f, revelation: f.revelation === r ? null : r }))
            }
            className={cn(
              "rounded-full px-3 py-1 transition-colors",
              filters.revelation === r
                ? "bg-gold-500 text-navy-900"
                : "text-ink-soft hover:text-navy-900"
            )}
          >
            {r === "Meccan" ? "مكية" : "مدنية"}
          </button>
        ))}
      </div>

      {active && (
        <button
          onClick={() => setFilters({ query: "", domain: null, revelation: null })}
          className="flex items-center gap-1 text-sm text-ink-faint hover:text-navy-900"
        >
          <Icon name="close" className="h-4 w-4" />
          مسح
        </button>
      )}
    </div>
  );
}

/* ================================================================== *
 *  Main component
 * ================================================================== */
export function ManhajMap() {
  const [filters, setFilters] = React.useState<Filters>({
    query: "",
    domain: null,
    revelation: null,
  });
  const [hovered, setHovered] = React.useState<Surah | null>(null);
  const matches = useMatcher(filters);

  return (
    <div>
      <Toolbar filters={filters} setFilters={setFilters} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
        {/* ---------- Board (desktop) ---------- */}
        <div className="min-w-0 space-y-5">
          {DOMAINS_IN_MAP_ORDER.map((domain) => {
            const st = STYLE[domain.colorKey];
            const cols = sectionsByDomain(domain.slug);
            return (
              <section
                key={domain.slug}
                aria-label={domain.titleAr}
                className="overflow-hidden rounded-2xl border border-parchment-200 bg-white/40"
              >
                <Link
                  href={`/domains/${domain.slug}`}
                  className={cn(
                    "group flex items-center justify-between gap-4 bg-gradient-to-l p-4 text-parchment-50 texture-navy",
                    st.band
                  )}
                >
                  <div>
                    <h3 className="wordmark text-xl font-bold">{domain.titleAr}</h3>
                    <p className="text-xs text-parchment-100/80">
                      {domain.titleEn} · {domain.subtitleAr}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm opacity-90 transition-opacity group-hover:opacity-100">
                    استكشف
                    <Icon name="arrow-left" className="h-4 w-4" />
                  </span>
                </Link>

                <div className="hidden gap-3 overflow-x-auto p-4 lg:flex">
                  {cols.map((section) => {
                    const letter = getLetter(section.letterSlug)!;
                    const surahs = surahsBySection(section.key);
                    return (
                      <div key={section.key} className="w-[136px] shrink-0">
                        <Link
                          href={`/letters/${letter.slug}`}
                          className="mb-2 block rounded-lg bg-parchment-100 px-2 py-1.5 transition-colors hover:bg-parchment-200"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="wordmark text-lg font-bold text-gold-700">
                              {letter.letter}
                            </span>
                            <span className="text-[12px] font-semibold leading-tight text-navy-900 clamp-2">
                              {section.titleAr}
                            </span>
                          </span>
                        </Link>
                        <div className="space-y-1.5">
                          {surahs.map((s) => (
                            <SurahNode
                              key={s.slug}
                              surah={s}
                              color={domain.colorKey}
                              active={matches(s)}
                              onHover={setHovered}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ---------- Mobile stacked ---------- */}
                <div className="space-y-3 p-4 lg:hidden">
                  {cols.map((section) => {
                    const letter = getLetter(section.letterSlug)!;
                    const surahs = surahsBySection(section.key).filter(matches);
                    if (!surahs.length) return null;
                    return (
                      <details key={section.key} className="group rounded-xl border border-parchment-200 bg-white/60">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-3">
                          <span className="flex items-center gap-2">
                            <span className="wordmark text-lg font-bold text-gold-700">
                              {letter.letter}
                            </span>
                            <span className="text-sm font-semibold text-navy-900">
                              {section.titleAr}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 text-xs text-ink-faint">
                            {surahs.length}
                            <Icon
                              name="chevron-down"
                              className="h-4 w-4 transition-transform group-open:rotate-180"
                            />
                          </span>
                        </summary>
                        <div className="flex flex-wrap gap-1.5 p-3 pt-0">
                          {surahs.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/surahs/${s.slug}`}
                              className="flex items-center gap-1.5 rounded-lg border border-parchment-200 bg-white px-2 py-1 text-[13px]"
                            >
                              <span className={cn("rounded px-1 text-[11px] font-bold", STYLE[domain.colorKey].num)}>
                                {s.nuzul}
                              </span>
                              {s.nameAr}
                            </Link>
                          ))}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* ---------- Sticky detail panel (desktop) ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <DetailPanel surah={hovered} />
          </div>
        </aside>
      </div>
    </div>
  );
}
