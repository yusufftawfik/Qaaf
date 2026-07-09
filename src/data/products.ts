import type { Product } from "@/lib/types";

/**
 * Future product templates that live inside the same platform.
 * Content is placeholder — swap in real descriptions when ready.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "manhaj-companion",
    titleAr: "رفيق المنهاج",
    titleEn: "Manhaj Companion",
    status: "beta",
    taglineAr: "مساعد قراءة يربط كل سورة بموقعها في الخريطة.",
    descriptionAr:
      "تطبيق مصاحب يرشدك عبر ترتيب النزول، ويقترح المحطة التالية بحسب مسارك واهتمامك.",
    iconKey: "compass",
    features: ["مسارات موجّهة", "تتبّع التقدّم", "تنبيهات القراءة", "وضع بلا اتصال"],
  },
  {
    slug: "educator-suite",
    titleAr: "حقيبة المعلّم",
    titleEn: "Educator Suite",
    status: "coming-soon",
    taglineAr: "خطط دروس وعروض جاهزة مبنية على محاور المنهاج.",
    descriptionAr:
      "أدوات لإعداد الدروس: ملخصات، أسئلة نقاش، شرائح عرض، وتقييمات — منظّمة حسب المجال والمجموعة الحرفية.",
    iconKey: "presentation",
    features: ["خطط دروس", "أسئلة نقاش", "شرائح قابلة للتحرير", "تقييمات"],
  },
  {
    slug: "khutbah-builder",
    titleAr: "منصّة الخطبة",
    titleEn: "Khutbah Builder",
    status: "coming-soon",
    taglineAr: "من محور في الخريطة إلى خطبة متكاملة.",
    descriptionAr:
      "اختر محورًا، فتُقترح لك الآيات والتطبيقات العملية والقصص، مع مخطط خطبة قابل للتخصيص.",
    iconKey: "mic",
    features: ["مخطط الخطبة", "آيات ذات صلة", "تطبيقات عملية", "تصدير PDF"],
  },
  {
    slug: "research-workspace",
    titleAr: "مساحة الباحث",
    titleEn: "Research Workspace",
    status: "coming-soon",
    taglineAr: "أدوات بحثية لعلاقات السور والمراجع.",
    descriptionAr:
      "لوحة بحث لتتبّع العلاقات بين السور والمحاور، مع حفظ الاقتباسات وتصدير المراجع.",
    iconKey: "search",
    features: ["خرائط علاقات", "مكتبة اقتباسات", "تصدير مراجع", "ملاحظات خاصة"],
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
