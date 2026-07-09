import type { Metadata } from "next";
import Link from "next/link";
import { DOMAINS_IN_MAP_ORDER } from "@/data/manhaj";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { PatternDivider } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "عن منهاج النور",
  description:
    "منهاج النور: قراءة القرآن بترتيب نزوله كخريطة موجّهة لبناء الإنسان والعمران.",
};

export default function AboutManhajPage() {
  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "عن المنهاج", href: "/about" },
          { label: "منهاج النور" },
        ]}
        eyebrow="النظام المعرفي"
        title="منهاج النور"
        titleEn="Manhaj Al-Noor"
        description="بناء الإنسان والعمران بترتيب نزول القرآن — لا كفهرس للمحتوى، بل كخريطة موجّهة للرحلة."
      />

      <div className="container-page max-w-3xl py-14">
        <article className="space-y-6 text-[16px] leading-loose text-ink-soft">
          <p>
            منهاج النور نظام معرفي يقرأ القرآن الكريم بحسب{" "}
            <strong className="text-navy-900">ترتيب نزوله</strong>، لا ترتيبه في
            المصحف. هذه القراءة تكشف عن تدرّجٍ في البناء: يبدأ الوحي ببناء الفرد من
            الداخل، ثم يؤسّس لقواعد الحكم العادل، وصولًا إلى بناء الأمة وعمرانها.
          </p>
          <p>
            الفكرة الجوهرية أن الوحي جاء مرتّبًا ترتيبًا تربويًا وحضاريًا. حين نتتبّع
            هذا الترتيب، تتحوّل السور من نصوص متجاورة إلى{" "}
            <strong className="text-navy-900">محطات في مشروع متكامل</strong> لبناء
            الإنسان والعمران.
          </p>
        </article>

        <PatternDivider className="my-12" />

        <h2 className="mb-6 text-2xl font-bold text-navy-900">المجالات الثلاثة</h2>
        <div className="space-y-4">
          {DOMAINS_IN_MAP_ORDER.map((d, i) => (
            <Link
              key={d.slug}
              href={`/domains/${d.slug}`}
              className="card-interactive group flex gap-4 p-5"
            >
              <span className="wordmark flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-xl font-bold text-gold-400">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-navy-900 group-hover:text-gold-700">
                  {d.titleAr} · {d.subtitleAr}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {d.descriptionAr}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-900 texture-navy p-8 text-center">
          <h2 className="wordmark text-2xl font-bold text-parchment-50">
            الخريطة هي قلب التجربة
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-parchment-200/80">
            أفضل طريقة لفهم المنهاج هي أن تراه. استكشف الخريطة التفاعلية وتنقّل بين
            مجالاتها ومجموعاتها وسورها.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/map" variant="gold" size="lg" iconRight="arrow-left">
              افتح الخريطة التفاعلية
            </Button>
          </div>
        </div>

        <p className="mt-10 rounded-xl border border-parchment-200 bg-white/50 p-5 text-sm leading-relaxed text-ink-soft">
          <strong className="text-navy-900">للزائر الباحث بموضوعية:</strong> هذه
          المنصّة تقدّم قراءة منهجية للنص القرآني بلغة أكاديمية محترمة، ويمكن تصفّحها
          بأقل قدر من المصطلحات الداخلية عبر صفحات التعريف والمجالات.
        </p>
      </div>
    </div>
  );
}
