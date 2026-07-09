import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  SURAHS,
  getSurahBySlug,
  getDomain,
  getLetter,
  getSection,
  prevSurah,
  nextSurah,
  surahsBySection,
} from "@/data/manhaj";
import { babsForSurah, surahHasContent } from "@/data/content";
import { resourcesForSurah, resourcesForDomain } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrevNextSurah } from "@/components/shared/PrevNextSurah";
import { RelatedThemes } from "@/components/shared/RelatedThemes";
import { RelatedResources } from "@/components/resources/ResourceCard";
import { CommentsPanel } from "@/components/dialogue/CommentsPanel";
import { QuestionForm } from "@/components/dialogue/QuestionForm";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return SURAHS.map((s) => ({ surahSlug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { surahSlug: string };
}): Metadata {
  const surah = getSurahBySlug(params.surahSlug);
  if (!surah) return { title: "السورة غير موجودة" };
  return {
    title: `سورة ${surah.nameAr}`,
    description: `المحطة ${surah.nuzul} في ترتيب النزول — محور ${surah.themeAr}.`,
  };
}

export default function SurahPage({
  params,
}: {
  params: { surahSlug: string };
}) {
  const surah = getSurahBySlug(params.surahSlug);
  if (!surah) notFound();

  const domain = getDomain(surah.domainSlug)!;
  const letter = getLetter(surah.letterSlug)!;
  const section = getSection(surah.sectionKey)!;
  const prev = prevSurah(surah.nuzul);
  const next = nextSurah(surah.nuzul);
  const babs = babsForSurah(surah.slug);
  const hasContent = surahHasContent(surah.slug);

  const resources = [
    ...resourcesForSurah(surah.slug),
    ...resourcesForDomain(surah.domainSlug),
  ].filter((r, i, arr) => arr.findIndex((x) => x.slug === r.slug) === i);

  const siblings = surahsBySection(surah.sectionKey).filter((s) => s.slug !== surah.slug);

  const summary =
    surah.slug === "al-alaq"
      ? [
          "سورة العلق هي أول ما نزل من القرآن، وبها يفتتح منهاج النور كامل الخريطة. يبدأ الخطاب بأمرٍ بالقراءة مقيَّدٍ باسم الرب الخالق، فيؤسّس للعلم بوصفه صلةً بالله لا مجرّد مهارة.",
          "تنتقل السورة من فضل العلم والقلم إلى التحذير من طغيان الإنسان حين يستغني، ثم تختم بالسجود والاقتراب — فتضع لبنة الفرد المخلص التي يقوم عليها كل بناءٍ لاحق في الحكم والأمة.",
        ]
      : [
          `سورة ${surah.nameAr} هي المحطة رقم ${surah.nuzul} في ترتيب النزول، ضمن مجموعة «${letter.titleAr}» في مجال «${domain.titleAr}»، وتقع في محور «${section.titleAr}».`,
          "الملخص التفصيلي لهذه السورة قيد الإعداد ضمن مادة المنهاج. هذه صفحة كاملة البنية بانتظار المحتوى النهائي.",
        ];

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "الخريطة", href: "/map" },
          { label: domain.titleAr, href: `/domains/${domain.slug}` },
          { label: letter.titleAr, href: `/letters/${letter.slug}` },
          { label: `سورة ${surah.nameAr}` },
        ]}
        eyebrow={`سورة · نزول ${surah.nuzul}`}
        title={`سورة ${surah.nameAr}`}
        titleEn={surah.nameEn}
        meta={
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold">المحور: {surah.themeAr}</Badge>
            <Badge tone="navy">المصحف {surah.mushaf}</Badge>
            <Badge tone="emerald">{surah.ayah} آية</Badge>
            <Badge tone="neutral">{surah.revelation === "Meccan" ? "مكية" : "مدنية"}</Badge>
          </div>
        }
      />

      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main */}
          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-navy-900">ملخص السورة</h2>
              <div className="space-y-4 text-[15px] leading-loose text-ink-soft">
                {summary.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* Chapters / Abwab */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-navy-900">الأبواب</h2>
                {hasContent && (
                  <span className="text-sm text-ink-faint">{babs.length} أبواب</span>
                )}
              </div>

              {hasContent ? (
                <div className="space-y-3">
                  {babs.map((bab) => (
                    <Link
                      key={bab.slug}
                      href={`/chapters/${bab.slug}`}
                      className="card-interactive group flex items-start gap-4 p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-parchment-50">
                        <Icon name="layers" className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-navy-900 group-hover:text-gold-700">
                          {bab.titleAr}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft clamp-2">
                          {bab.summaryAr}
                        </p>
                        <span className="mt-2 block text-xs text-ink-faint">
                          {bab.fusoolSlugs.length} فصول
                        </span>
                      </div>
                      <Icon name="arrow-left" className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="card flex items-center gap-4 p-6">
                  <Icon name="file" className="h-6 w-6 shrink-0 text-ink-faint" />
                  <p className="text-sm text-ink-soft">
                    الأبواب والفصول التفصيلية لهذه السورة قيد الإعداد. تصفّح المسار
                    النموذجي الكامل عبر{" "}
                    <Link href="/surahs/al-alaq" className="font-semibold text-gold-700 hover:underline">
                      سورة العلق
                    </Link>
                    .
                  </p>
                </div>
              )}
            </section>

            <PrevNextSurah prev={prev} next={next} />

            <div className="grid gap-6 lg:grid-cols-2">
              <CommentsPanel />
              <QuestionForm />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="card p-5">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-navy-900">
                  <Icon name="compass" className="h-5 w-5 text-gold-600" />
                  موقعك في الخريطة
                </h3>
                <ol className="space-y-2 text-sm">
                  <MapRow label="المجال" value={domain.titleAr} href={`/domains/${domain.slug}`} />
                  <MapRow
                    label="المجموعة"
                    value={`${letter.letter} · ${letter.titleAr}`}
                    href={`/letters/${letter.slug}`}
                  />
                  <MapRow label="المحور" value={section.titleAr} href={`/letters/${letter.slug}`} />
                  <li className="flex items-center justify-between rounded-lg bg-gold-500/10 px-3 py-2">
                    <span className="text-ink-faint">السورة</span>
                    <span className="font-semibold text-navy-900">
                      نزول {surah.nuzul} من ١١٤
                    </span>
                  </li>
                </ol>
              </div>

              {siblings.length > 0 && (
                <RelatedThemes
                  title="سور في المحور نفسه"
                  chips={siblings.slice(0, 6).map((s) => ({
                    label: `${s.nuzul}. ${s.nameAr}`,
                    href: `/surahs/${s.slug}`,
                    tone: domain.colorKey,
                  }))}
                />
              )}
            </div>
          </aside>
        </div>

        {resources.length > 0 && (
          <div className="mt-16">
            <RelatedResources resources={resources.slice(0, 6)} title="مصادر داعمة لهذه السورة" />
          </div>
        )}
      </div>
    </div>
  );
}

function MapRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-parchment-100"
      >
        <span className="text-ink-faint">{label}</span>
        <span className="flex items-center gap-1 font-medium text-navy-900">
          {value}
          <Icon name="chevron-left" className="h-3.5 w-3.5 text-ink-faint" />
        </span>
      </Link>
    </li>
  );
}
