import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Resource } from "@/lib/types";
import { FUSOOL, getFasl, getBab, fusoolForBab } from "@/data/content";
import { getSurahBySlug, getDomain, getLetter } from "@/data/manhaj";
import { getResource } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { RelatedResources } from "@/components/resources/ResourceCard";
import { CommentsPanel } from "@/components/dialogue/CommentsPanel";
import { QuestionForm } from "@/components/dialogue/QuestionForm";
import { NewsletterCTA } from "@/components/dialogue/NewsletterCTA";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return FUSOOL.map((f) => ({ sectionSlug: f.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { sectionSlug: string };
}): Metadata {
  const fasl = getFasl(params.sectionSlug);
  if (!fasl) return { title: "الفصل غير موجود" };
  return { title: fasl.titleAr, description: fasl.keyIdeasAr[0] };
}

export default function SectionPage({
  params,
}: {
  params: { sectionSlug: string };
}) {
  const fasl = getFasl(params.sectionSlug);
  if (!fasl) notFound();

  const bab = getBab(fasl.babSlug)!;
  const surah = getSurahBySlug(fasl.surahSlug)!;
  const domain = getDomain(surah.domainSlug)!;
  const letter = getLetter(surah.letterSlug)!;

  const siblings = fusoolForBab(bab.slug);
  const idx = siblings.findIndex((f) => f.slug === fasl.slug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  const resources = (fasl.resourceSlugs ?? [])
    .map(getResource)
    .filter(Boolean) as Resource[];

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخريطة", href: "/map" },
          { label: domain.titleAr, href: `/domains/${domain.slug}` },
          { label: letter.titleAr, href: `/letters/${letter.slug}` },
          { label: `سورة ${surah.nameAr}`, href: `/surahs/${surah.slug}` },
          { label: bab.titleAr, href: `/chapters/${bab.slug}` },
          { label: `الفصل ${fasl.order}` },
        ]}
        eyebrow={`فصل · ${bab.titleAr}`}
        title={fasl.titleAr}
        titleEn={fasl.titleEn}
      />

      <div className="container-page py-14">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Detailed content */}
          <article className="space-y-5 text-[16px] leading-loose text-ink">
            {fasl.bodyAr.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>

          {/* Key ideas */}
          {fasl.keyIdeasAr.length > 0 && (
            <aside className="rounded-2xl border border-gold-300/60 bg-gold-500/[0.06] p-6">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-navy-900">
                <Icon name="sparkle" className="h-5 w-5 text-gold-600" />
                أفكار مفتاحية
              </h2>
              <ul className="space-y-2.5">
                {fasl.keyIdeasAr.map((idea, i) => (
                  <li key={i} className="flex gap-2.5 text-[15px] text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {idea}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {resources.length > 0 && <RelatedResources resources={resources} />}

          {/* Fasl nav */}
          <nav className="flex items-center justify-between gap-3 border-t border-parchment-200 pt-6">
            {prev ? (
              <Button href={`/sections/${prev.slug}`} variant="ghost" icon="arrow-right">
                الفصل السابق
              </Button>
            ) : (
              <Button href={`/chapters/${bab.slug}`} variant="ghost" icon="arrow-right">
                عودة إلى الباب
              </Button>
            )}
            {next ? (
              <Button href={`/sections/${next.slug}`} variant="ghost" iconRight="arrow-left">
                الفصل التالي
              </Button>
            ) : (
              <Button href={`/surahs/${surah.slug}`} variant="ghost" iconRight="arrow-left">
                عودة إلى السورة
              </Button>
            )}
          </nav>

          <div className="grid gap-6 lg:grid-cols-2">
            <CommentsPanel />
            <QuestionForm />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
