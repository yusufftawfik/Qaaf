"use client";

import * as React from "react";
import type { ResourceType } from "@/lib/types";
import { SURAHS, DOMAINS_IN_MAP_ORDER, getDomain } from "@/data/manhaj";
import { ALL_RESOURCES } from "@/data/resources";
import { SurahList } from "@/components/shared/SurahList";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Kind = "all" | "surah" | "resource";

const TYPE_OPTIONS: { value: ResourceType | "all"; label: string }[] = [
  { value: "all", label: "كل الأنواع" },
  { value: "book", label: "كتب" },
  { value: "video", label: "فيديو" },
  { value: "lecture", label: "محاضرات" },
  { value: "sermon", label: "خطب" },
  { value: "podcast", label: "بودكاست" },
  { value: "article", label: "مقالات" },
  { value: "paper", label: "أبحاث" },
  { value: "educational", label: "مواد تعليمية" },
];

export function SearchExplorer({
  initialQuery = "",
  initialType = "all",
}: {
  initialQuery?: string;
  initialType?: string;
}) {
  const [q, setQ] = React.useState(initialQuery);
  const [kind, setKind] = React.useState<Kind>("all");
  const [domain, setDomain] = React.useState<string | null>(null);
  const [type, setType] = React.useState<ResourceType | "all">(
    (TYPE_OPTIONS.find((t) => t.value === initialType)?.value as ResourceType) ?? "all"
  );

  const query = q.trim().toLowerCase();

  const surahResults =
    kind === "resource"
      ? []
      : SURAHS.filter((s) => {
          if (domain && s.domainSlug !== domain) return false;
          if (!query) return true;
          return (
            s.nameAr.includes(q.trim()) ||
            s.nameEn.toLowerCase().includes(query) ||
            String(s.nuzul) === query ||
            String(s.mushaf) === query ||
            (s.themeAr ?? "").includes(q.trim())
          );
        });

  const resourceResults =
    kind === "surah"
      ? []
      : ALL_RESOURCES.filter((r) => {
          if (domain && r.domainSlug !== domain) return false;
          if (type !== "all" && r.type !== type) return false;
          if (!query) return true;
          return (
            r.titleAr.includes(q.trim()) ||
            (r.titleEn ?? "").toLowerCase().includes(query) ||
            r.descriptionAr.includes(q.trim()) ||
            (r.tags ?? []).some((t) => t.includes(q.trim()))
          );
        });

  const total = surahResults.length + resourceResults.length;

  return (
    <div>
      {/* Filters */}
      <div className="card space-y-4 p-5">
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
          />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن سورة أو محور أو مصدر…"
            aria-label="بحث"
            className="w-full rounded-xl border border-parchment-200 bg-white/70 py-3 pr-11 pl-3 text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full border border-parchment-200 bg-white/60 p-0.5 text-sm">
            {([
              ["all", "الكل"],
              ["surah", "السور"],
              ["resource", "المصادر"],
            ] as [Kind, string][]).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setKind(value)}
                className={cn(
                  "rounded-full px-4 py-1.5 transition-colors",
                  kind === value ? "bg-navy-800 text-parchment-50" : "text-ink-soft hover:text-navy-900"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DOMAINS_IN_MAP_ORDER.map((d) => (
              <button
                key={d.slug}
                onClick={() => setDomain((v) => (v === d.slug ? null : d.slug))}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  domain === d.slug
                    ? "border-transparent bg-gold-500 text-navy-900"
                    : "border-parchment-200 bg-white/60 text-navy-800 hover:border-gold-400"
                )}
              >
                {d.titleAr}
              </button>
            ))}
          </div>

          {kind !== "surah" && (
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ResourceType | "all")}
              className="rounded-full border border-parchment-200 bg-white/60 px-3 py-1.5 text-sm text-navy-800 focus:border-gold-400 focus:outline-none"
              aria-label="نوع المصدر"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Results */}
      <p className="mt-6 text-sm text-ink-faint">
        {total} نتيجة {domain && `في «${getDomain(domain)?.titleAr}»`}
      </p>

      {surahResults.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-4 text-lg font-bold text-navy-900">
            السور ({surahResults.length})
          </h2>
          <SurahList surahs={surahResults.slice(0, 30)} />
        </section>
      )}

      {resourceResults.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-navy-900">
            المصادر ({resourceResults.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceResults.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="mt-10 rounded-2xl border border-parchment-200 bg-white/50 p-10 text-center">
          <Icon name="search" className="mx-auto h-8 w-8 text-ink-faint" />
          <p className="mt-3 text-ink-soft">لا نتائج مطابقة. جرّب كلمة أخرى أو أزل الفلاتر.</p>
        </div>
      )}
    </div>
  );
}
