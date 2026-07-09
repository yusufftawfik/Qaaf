import Link from "next/link";
import { PERSONAS } from "@/data/personas";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PersonaSelector() {
  return (
    <section className="border-y border-parchment-200 bg-parchment-100/60 texture-parchment">
      <div className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="مسارات موجّهة"
          title="من أين تبدأ؟"
          description="اختر ما يصفك، فنأخذك إلى المدخل الأنسب لك في المنهاج."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map((p) => (
            <Link
              key={p.slug}
              href={p.startHref}
              className="card-interactive group flex flex-col p-5"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800/6 text-navy-700 transition-colors group-hover:bg-gold-500/15 group-hover:text-gold-700">
                <Icon name={p.iconKey as IconName} className="h-6 w-6" />
              </span>
              <h3 className="font-bold text-navy-900">{p.titleAr}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
                {p.blurbAr}
              </p>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold-700">
                {p.ctaAr}
                <Icon name="arrow-left" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
