import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PROMISES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "أين أنت",
    body: "موقعك دائمًا ظاهر في تسلسل المنهاج: المجال ثم المجموعة ثم السورة.",
  },
  {
    icon: "sparkle",
    title: "ماذا تعني هذه الصفحة",
    body: "لكل محطة معنى واضح ودورها في بناء الإنسان والعمران.",
  },
  {
    icon: "layers",
    title: "كيف تتصل بالكل",
    body: "روابط حيّة تربط كل سورة بمحاورها وأخواتها في الخريطة.",
  },
  {
    icon: "arrow-left",
    title: "إلى أين بعدها",
    body: "توصية دائمة بالمحطة التالية: اقرأ، أو شاهد، أو استمع، أو تابع.",
  },
];

export function CoreIdea() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="الفكرة الجوهرية"
        title="خريطة موجّهة، لا مدوّنة"
        description="كل زائر ينبغي أن يعرف في كل لحظة موقعه من منهاج النور وما يعنيه وإلى أين يمضي."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map((p) => (
          <div key={p.title} className="card p-6 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/12 text-gold-700">
              <Icon name={p.icon} className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold text-navy-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
