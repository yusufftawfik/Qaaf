import type { Persona } from "@/lib/types";

/**
 * Audience pathways. Each persona routes the visitor to the most
 * relevant entry point so they "start where they belong".
 */
export const PERSONAS: Persona[] = [
  {
    slug: "visitor",
    titleAr: "زائر لأول مرة",
    titleEn: "First-time visitor",
    blurbAr: "ابدأ من مقدمة بسيطة ومعاينة للخريطة ومسار مقترح.",
    ctaAr: "ابدأ من هنا",
    startHref: "/about/manhaj-al-noor",
    iconKey: "compass",
  },
  {
    slug: "researcher",
    titleAr: "باحث",
    titleEn: "Researcher",
    blurbAr: "التسلسل الهرمي، علاقات السور، فلاتر متقدمة، ومراجع.",
    ctaAr: "استكشف الخريطة",
    startHref: "/map",
    iconKey: "search",
  },
  {
    slug: "student",
    titleAr: "طالب",
    titleEn: "Student",
    blurbAr: "ملخصات مبسّطة، مسارات تعلّم متدرّجة، وتتبّع للتقدّم.",
    ctaAr: "ابدأ مسار التعلّم",
    startHref: "/surahs/al-alaq",
    iconKey: "book",
  },
  {
    slug: "educator",
    titleAr: "معلّم",
    titleEn: "Educator",
    blurbAr: "حقائب تعليمية، ملخصات جاهزة للدرس، وأسئلة للنقاش.",
    ctaAr: "المواد التعليمية",
    startHref: "/resources",
    iconKey: "presentation",
  },
  {
    slug: "khateeb",
    titleAr: "خطيب",
    titleEn: "Khateeb",
    blurbAr: "مادة للخطبة، تطبيقات عملية، وآيات ذات صلة.",
    ctaAr: "مادة الخطبة",
    startHref: "/resources/videos",
    iconKey: "mic",
  },
  {
    slug: "parent",
    titleAr: "وليّ أمر",
    titleEn: "Parent",
    blurbAr: "محاور الأخلاق، إرشاد عملي، وأمثلة مبسّطة للأبناء.",
    ctaAr: "محاور التربية",
    startHref: "/domains/al-fard-al-mukhlis",
    iconKey: "home",
  },
  {
    slug: "policy",
    titleAr: "باحث في الحوكمة",
    titleEn: "Policy researcher",
    blurbAr: "العدل، القيادة، التشريع، وإدارة الأزمات.",
    ctaAr: "مجال الحكم العادل",
    startHref: "/domains/al-hukm-al-adil",
    iconKey: "scale",
  },
  {
    slug: "curious",
    titleAr: "زائر يستكشف بموضوعية",
    titleEn: "Curious / academic",
    blurbAr: "نبرة أكاديمية محترمة، وأقل قدر من المصطلحات الداخلية.",
    ctaAr: "تعرّف على المنهج",
    startHref: "/about/manhaj-al-noor",
    iconKey: "globe",
  },
];

export const getPersona = (slug: string) =>
  PERSONAS.find((p) => p.slug === slug);
