import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ManhajMap } from "@/components/map/ManhajMap";
import { PatternDivider } from "@/components/ui/SectionHeading";
import { DOMAINS, SURAHS } from "@/data/manhaj";

export const metadata: Metadata = {
  title: "الخريطة المعرفية التفاعلية",
  description:
    "الخريطة الكاملة لمنهاج النور: ثلاثة مجالات، سبع مجموعات حرفية، و١١٤ سورة بترتيب نزولها.",
};

export default function MapPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }, { label: "الخريطة" }]} />

      <header className="mt-6 text-center">
        <div className="eyebrow justify-center">
          <span className="h-px w-6 bg-gold-500" />
          منهاج النور
          <span className="h-px w-6 bg-gold-500" />
        </div>
        <h1 className="wordmark mt-3 text-4xl font-bold text-navy-900 sm:text-5xl">
          الخريطة المعرفية التفاعلية
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-ink-soft">
          بناء الإنسان والعمران بترتيب نزول القرآن
        </p>

        <dl className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
          {[
            { n: DOMAINS.length, l: "مجالات كبرى" },
            { n: 7, l: "مجموعات حرفية" },
            { n: SURAHS.length, l: "سورة بترتيب النزول" },
          ].map((s) => (
            <div key={s.l} className="card px-4 py-5">
              <dd className="wordmark text-3xl font-bold text-gold-600">{s.n}</dd>
              <dt className="mt-1 text-sm text-ink-soft">{s.l}</dt>
            </div>
          ))}
        </dl>
      </header>

      <PatternDivider className="my-10" />

      <ManhajMap />

      <section className="mt-12 rounded-2xl border border-parchment-200 bg-white/50 p-6 sm:p-8">
        <h2 className="mb-3 text-lg font-bold text-navy-900">كيف تقرأ الخريطة؟</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">
          تُقرأ الخريطة من الفرد إلى الأمة: يبدأ المنهاج ببناء{" "}
          <strong className="text-navy-900">الفرد المخلص</strong> (مجموعتا ن و ق)، ثم
          ينتقل إلى <strong className="text-navy-900">الحكم العادل</strong> بسلطاته
          التنفيذية والتشريعية والقضائية وإدارة الأزمات (ص، ط، ر، ج)، وصولًا إلى{" "}
          <strong className="text-navy-900">الأمة الراشدة</strong> وبناء العمران
          (مجموعة م). الرقم على كل خلية هو ترتيب نزولها، لا ترتيبها في المصحف.
        </p>
      </section>
    </div>
  );
}
