import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "المنهجية والرؤية",
  description: "منهجية أمة القرآن ورسالتها ورؤيتها.",
};

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "الرسالة",
    body: "أن نجعل قراءة القرآن بترتيب نزوله منهجًا عمليًا مُوجَّهًا لبناء الإنسان والعمران، في متناول كل باحث ومتعلّم.",
  },
  {
    icon: "sparkle",
    title: "الرؤية",
    body: "منصّة معرفية مرجعية تتحوّل فيها السور من نصوص متجاورة إلى خريطة حيّة لمشروع حضاري متكامل.",
  },
  {
    icon: "layers",
    title: "المنهجية",
    body: "التدرّج من الفرد إلى الحكم إلى الأمة، مع توثيق العلاقات بين السور والمحاور وربطها بالمصادر الداعمة.",
  },
];

const LINKS: { title: string; href: string; desc: string }[] = [
  { title: "منهاج النور", href: "/about/manhaj-al-noor", desc: "النظام المعرفي وكيفية قراءة الخريطة." },
  { title: "أمة القرآن", href: "/about/ummat-al-quran", desc: "هوية المنصّة ورسالتها." },
  { title: "المؤلّف", href: "/author/ali-mohammad-tawfik", desc: "علي محمد توفيق وأعماله." },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنهجية والرؤية" }]}
        eyebrow="عن المنصّة"
        title="المنهجية والرؤية"
        description="لماذا أمة القرآن، وكيف نقرأ، وإلى أين نتّجه."
      />
      <div className="container-page space-y-14 py-14">
        <section className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="card p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/12 text-gold-700">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <h2 className="text-lg font-bold text-navy-900">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="card-interactive group p-5">
              <h3 className="flex items-center justify-between font-bold text-navy-900 group-hover:text-gold-700">
                {l.title}
                <Icon name="chevron-left" className="h-4 w-4 text-ink-faint" />
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">{l.desc}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
