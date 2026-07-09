import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "عن أمة القرآن",
  description: "هوية منصّة أمة القرآن ورسالتها.",
};

export default function AboutUmmatPage() {
  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "عن المنهاج", href: "/about" },
          { label: "أمة القرآن" },
        ]}
        eyebrow="هوية المنصّة"
        title="أمة القرآن"
        titleEn="Ummat Al-Quran"
        description="منصّة معرفية تجمع أعمال الأستاذ علي محمد توفيق حول التدبّر والبناء الحضاري في نظامٍ واحد موجّه."
      />
      <div className="container-page max-w-3xl py-14">
        <article className="space-y-6 text-[16px] leading-loose text-ink-soft">
          <p>
            «أمة القرآن» هي الهوية الجديدة التي تحتضن نظام{" "}
            <strong className="text-navy-900">منهاج النور</strong>. تبني المنصّة على
            إرثٍ من الكتابات في التدبّر وربط القرآن ببناء الإنسان والحكم والمجتمع
            والتعليم والحضارة، وتعيد تنظيمه كخريطة معرفية حيّة بدل أن يكون أرشيفًا
            متفرّقًا.
          </p>
          <p>
            رسالتنا أن يعرف كل زائر — طالبًا كان أو باحثًا أو معلّمًا أو خطيبًا أو
            وليّ أمر — أين يقف من المنهاج، وما معنى ما يقرأ، وإلى أين يمضي بعده. لذا
            صُمّمت المنصّة حول التوجيه لا مجرّد العرض.
          </p>
          <p>
            هذه نسخة أوّلية (Prototype) تُبرز التجربة الأساسية: الصفحة الرئيسية،
            والخريطة التفاعلية، ومسارًا نموذجيًا كاملًا من الخريطة إلى المصدر. ويتوسّع
            البناء لاحقًا ليشمل بقية السور والمصادر والمنتجات.
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/about/manhaj-al-noor" variant="primary" iconRight="arrow-left">
            تعرّف على منهاج النور
          </Button>
          <Button href="/author/ali-mohammad-tawfik" variant="outline">
            المؤلّف: علي محمد توفيق
          </Button>
        </div>
      </div>
    </div>
  );
}
