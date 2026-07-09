import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  DOMAINS,
  getDomain,
  lettersByDomain,
  sectionsByDomain,
  surahsByDomain,
  surahsBySection,
} from "@/data/manhaj";
import { resourcesForDomain } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurahList } from "@/components/shared/SurahList";
import { RelatedThemes } from "@/components/shared/RelatedThemes";
import { RelatedResources } from "@/components/resources/ResourceCard";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ domainSlug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { domainSlug: string };
}): Metadata {
  const domain = getDomain(params.domainSlug);
  if (!domain) return { title: "المجال غير موجود" };
  return { title: domain.titleAr, description: domain.descriptionAr };
}

export default function DomainPage({
  params,
}: {
  params: { domainSlug: string };
}) {
  const domain = getDomain(params.domainSlug);
  if (!domain) notFound();

  const letters = lettersByDomain(domain.slug);
  const sections = sectionsByDomain(domain.slug);
  const surahs = surahsByDomain(domain.slug);
  const resources = resourcesForDomain(domain.slug);

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخريطة", href: "/map" },
          { label: domain.titleAr },
        ]}
        eyebrow="مجال"
        title={domain.titleAr}
        titleEn={domain.titleEn}
        description={domain.descriptionAr}
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">{domain.subtitleAr}</Badge>
            <Badge tone="navy">{letters.length} مجموعات</Badge>
            <Badge tone="emerald">{surahs.length} سورة</Badge>
          </div>
        }
      />

      <div className="container-page space-y-16 py-14">
        {/* Letter groups */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-navy-900">المجموعات الحرفية</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {letters.map((l) => {
              const count = surahs.filter((s) => s.letterSlug === l.slug).length;
              return (
                <Link
                  key={l.slug}
                  href={`/letters/${l.slug}`}
                  className="card-interactive group flex gap-4 p-6"
                >
                  <span className="wordmark flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-3xl font-bold text-gold-400">
                    {l.letter}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-gold-700">
                      {l.titleAr}
                    </h3>
                    <p className="text-sm text-ink-soft">{l.functionAr}</p>
                    <p className="mt-2 text-xs text-ink-faint">
                      {count} سورة · نزول {l.surahRange[0]}–{l.surahRange[1]}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Surahs grouped by section */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-navy-900">السور بترتيب نزولها</h2>
          {sections.map((section) => (
            <div key={section.key}>
              <div className="mb-4 flex items-center gap-2">
                <Icon name="layers" className="h-5 w-5 text-gold-600" />
                <h3 className="text-lg font-semibold text-navy-900">{section.titleAr}</h3>
                <span className="text-sm text-ink-faint">{section.titleEn}</span>
              </div>
              <SurahList surahs={surahsBySection(section.key)} color={domain.colorKey} />
            </div>
          ))}
        </section>

        <RelatedThemes
          title="مجالات أخرى في المنهاج"
          chips={DOMAINS.filter((d) => d.slug !== domain.slug).map((d) => ({
            label: d.titleAr,
            href: `/domains/${d.slug}`,
            tone: d.colorKey,
          }))}
        />

        {resources.length > 0 && <RelatedResources resources={resources} />}
      </div>
    </div>
  );
}
