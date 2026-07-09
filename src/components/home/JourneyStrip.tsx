import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const STEPS = [
  { label: "الرئيسية", href: "/" },
  { label: "الخريطة", href: "/map" },
  { label: "المجال", href: "/domains/al-fard-al-mukhlis" },
  { label: "المجموعة", href: "/letters/noon" },
  { label: "السورة", href: "/surahs/al-alaq" },
  { label: "الباب", href: "/chapters/al-alaq-iqra" },
  { label: "الفصل", href: "/sections/al-alaq-bism-rabbik" },
  { label: "المصدر", href: "/resources" },
];

export function JourneyStrip() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="المسار الأساسي"
        title="رحلة موجّهة من الخريطة إلى المصدر"
        description="مسار واحد متصل ينقلك من الصورة الكبرى إلى التفاصيل ثم إلى ما تقرأه أو تشاهده بعد ذلك."
        action={
          <Button href="/surahs/al-alaq" variant="outline" iconRight="arrow-left">
            جرّب المسار الكامل
          </Button>
        }
      />

      <ol className="mt-10 flex flex-wrap items-center gap-y-4">
        {STEPS.map((step, i) => (
          <li key={step.href} className="flex items-center">
            <Link
              href={step.href}
              className="group flex items-center gap-2 rounded-xl border border-parchment-200 bg-white/60 px-3 py-2 transition-colors hover:border-gold-400"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-parchment-50">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-navy-900 group-hover:text-gold-700">
                {step.label}
              </span>
            </Link>
            {i < STEPS.length - 1 && (
              <Icon name="chevron-left" className="mx-1 h-4 w-4 shrink-0 text-gold-500" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
