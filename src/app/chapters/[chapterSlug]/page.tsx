import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BABS, getBab, fusoolForBab, babsForSurah } from "@/data/content";
import { getSurahBySlug, getDomain, getLetter } from "@/data/manhaj";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return BABS.map((b) => ({ chapterSlug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { chapterSlug: string };
}): Metadata {
  const bab = getBab(params.chapterSlug);
  if (!bab) return { title: "الباب غير موجود" };
  return { title: bab.titleAr, description: bab.summaryAr };
}

export default function ChapterPage({
  params,
}: {
  params: { chapterSlug: string };
}) {
  const bab = getBab(params.chapterSlug);
  if (!bab) notFound();

  const surah = getSurahBySlug(bab.surahSlug)!;
  const domain = getDomain(surah.domainSlug)!;
  const letter = getLetter(surah.letterSlug)!;
  const fusool = fusoolForBab(bab.slug);

  const siblings = babsForSurah(surah.slug);
  const idx = siblings.findIndex((b) => b.slug === bab.slug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخريطة", href: "/map" },
          { label: domain.titleAr, href: `/domains/${domain.slug}` },
          { label: letter.titleAr, href: `/letters/${letter.slug}` },
          { label: `سورة ${surah.nameAr}`, href: `/surahs/${surah.slug}` },
          { label: `الباب ${bab.order}` },
        ]}
        eyebrow={`باب · سورة ${surah.nameAr}`}
        title={bab.titleAr}
        titleEn={bab.titleEn}
        description={bab.summaryAr}
      />

      <div className="container-page max-w-4xl py-14">
        <h2 className="mb-6 text-2xl font-bold text-navy-900">فصول هذا الباب</h2>
        <ol className="space-y-3">
          {fusool.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/sections/${f.slug}`}
                className="card-interactive group flex items-start gap-4 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-sm font-bold text-gold-700">
                  {f.order}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-navy-900 group-hover:text-gold-700">
                    {f.titleAr}
                  </h3>
                  {f.keyIdeasAr[0] && (
                    <p className="mt-1 text-sm text-ink-soft clamp-2">{f.keyIdeasAr[0]}</p>
                  )}
                </div>
                <Icon name="arrow-left" className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              </Link>
            </li>
          ))}
        </ol>

        {/* Chapter nav */}
        <nav className="mt-10 flex items-center justify-between gap-3 border-t border-parchment-200 pt-6">
          {prev ? (
            <Button href={`/chapters/${prev.slug}`} variant="ghost" icon="arrow-right">
              الباب السابق
            </Button>
          ) : (
            <Button href={`/surahs/${surah.slug}`} variant="ghost" icon="arrow-right">
              عودة إلى السورة
            </Button>
          )}
          {next && (
            <Button href={`/chapters/${next.slug}`} variant="ghost" iconRight="arrow-left">
              الباب التالي
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
}
