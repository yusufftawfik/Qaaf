import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LETTERS,
  getLetter,
  getDomain,
  lettersByDomain,
  sectionsByLetter,
  surahsByLetter,
  surahsBySection,
} from "@/data/manhaj";
import { ALL_RESOURCES } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { SurahList } from "@/components/shared/SurahList";
import { RelatedThemes } from "@/components/shared/RelatedThemes";
import { RelatedResources } from "@/components/resources/ResourceCard";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return LETTERS.map((l) => ({ letterSlug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { letterSlug: string };
}): Metadata {
  const letter = getLetter(params.letterSlug);
  if (!letter) return { title: "المجموعة غير موجودة" };
  return {
    title: `${letter.letter} · ${letter.titleAr}`,
    description: letter.descriptionAr,
  };
}

export default function LetterPage({
  params,
}: {
  params: { letterSlug: string };
}) {
  const letter = getLetter(params.letterSlug);
  if (!letter) notFound();

  const domain = getDomain(letter.domainSlug)!;
  const sections = sectionsByLetter(letter.slug);
  const surahs = surahsByLetter(letter.slug);
  const siblings = lettersByDomain(domain.slug).filter((l) => l.slug !== letter.slug);
  const resources = ALL_RESOURCES.filter(
    (r) => r.letterSlug === letter.slug || r.domainSlug === domain.slug
  );

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخريطة", href: "/map" },
          { label: domain.titleAr, href: `/domains/${domain.slug}` },
          { label: letter.titleAr },
        ]}
        eyebrow={`مجموعة حرفية · ${letter.letter}`}
        title={`${letter.letter} · ${letter.titleAr}`}
        titleEn={`${letter.titleEn} — ${letter.functionEn}`}
        description={letter.descriptionAr}
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">{letter.functionAr}</Badge>
            <Badge tone="emerald">{surahs.length} سورة</Badge>
            <Badge tone="navy">نزول {letter.surahRange[0]}–{letter.surahRange[1]}</Badge>
          </div>
        }
      />

      <div className="container-page space-y-14 py-14">
        {sections.length > 1 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-navy-900">محاور المجموعة</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s) => (
                <div key={s.key} className="card p-5">
                  <h3 className="font-bold text-navy-900">{s.titleAr}</h3>
                  <p className="text-xs text-gold-700">{s.titleEn}</p>
                  {s.descriptionAr && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.descriptionAr}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-ink-faint">
                    نزول {s.surahRange[0]}–{s.surahRange[1]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-navy-900">سور المجموعة</h2>
          {sections.map((section) => (
            <div key={section.key}>
              {sections.length > 1 && (
                <h3 className="mb-4 text-lg font-semibold text-navy-900">
                  {section.titleAr}
                </h3>
              )}
              <SurahList surahs={surahsBySection(section.key)} color={domain.colorKey} />
            </div>
          ))}
        </section>

        <RelatedThemes
          title="مجموعات أخرى في المجال"
          chips={[
            { label: `المجال: ${domain.titleAr}`, href: `/domains/${domain.slug}`, tone: domain.colorKey },
            ...siblings.map((l) => ({
              label: `${l.letter} · ${l.titleAr}`,
              href: `/letters/${l.slug}`,
              tone: domain.colorKey,
            })),
          ]}
        />

        {resources.length > 0 && <RelatedResources resources={resources} />}
      </div>
    </div>
  );
}
