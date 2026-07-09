import type { Bab, Fasl } from "@/lib/types";

/**
 * Deep content (chapters / abwab and sections / fusool).
 *
 * Only the sample journey surah — Al-Alaq (سورة العلق) — is populated,
 * to demonstrate the full Surah → Chapter → Section → Content flow.
 * The bodies below are editorial PLACEHOLDERS; replace with Ali
 * Tawfik's actual analysis. Other surahs return an empty list and the
 * UI shows a "content in preparation" state.
 */

export const BABS: Bab[] = [
  {
    slug: "al-alaq-iqra",
    surahSlug: "al-alaq",
    order: 1,
    titleAr: "الباب الأول: أمر (اقرأ) وبناء الوعي",
    titleEn: "Chapter 1: The Command to Read",
    summaryAr:
      "أول ما نزل من القرآن كان أمرًا بالقراءة والعلم — تأسيسٌ للفرد قبل أي بناء للحكم أو الأمة.",
    fusoolSlugs: ["al-alaq-bism-rabbik", "al-alaq-qalam"],
  },
  {
    slug: "al-alaq-tughyan",
    surahSlug: "al-alaq",
    order: 2,
    titleAr: "الباب الثاني: الطغيان حين يستغني الإنسان",
    titleEn: "Chapter 2: Tyranny of Self-Sufficiency",
    summaryAr:
      "تحذير مبكّر: العلم بلا إخلاص يتحوّل استغناءً وطغيانًا. المرجع في النهاية إلى الله.",
    fusoolSlugs: ["al-alaq-istighna", "al-alaq-rujaa"],
  },
  {
    slug: "al-alaq-position",
    surahSlug: "al-alaq",
    order: 3,
    titleAr: "الباب الثالث: موقع السورة في الخريطة",
    titleEn: "Chapter 3: Position on the Map",
    summaryAr:
      "لماذا تفتتح العلق مجموعة النون (الإخلاص) ومجال الفرد المخلص؟ وكيف تتصل بما بعدها.",
    fusoolSlugs: ["al-alaq-first-revelation", "al-alaq-sujud"],
  },
];

export const FUSOOL: Fasl[] = [
  {
    slug: "al-alaq-bism-rabbik",
    babSlug: "al-alaq-iqra",
    surahSlug: "al-alaq",
    order: 1,
    titleAr: "الفصل الأول: القراءة باسم الرب",
    titleEn: "Reading in the name of the Lord",
    bodyAr: [
      "يبدأ الأمر بالقراءة مقيَّدًا بـ«باسم ربك الذي خلق»، فالقراءة ليست مجرد مهارة، بل صلة بين العلم والخالق. هنا يتأسّس الفرد المخلص: علمٌ منسوبٌ إلى مصدره، لا إلى ذات القارئ.",
      "هذا النص مبدئي (placeholder) بانتظار التحرير النهائي من تحليل الأستاذ علي محمد توفيق. الهدف هو إظهار كيف يتدفّق المحتوى التفصيلي داخل بنية الفصول.",
    ],
    keyIdeasAr: [
      "القراءة مقترنة بالخلق: العلم صلة لا مجرد أداة.",
      "الإخلاص يبدأ من نسبة العلم إلى مصدره.",
      "الفرد يُبنى قبل الحكم والأمة.",
    ],
    resourceSlugs: ["al-alaq-read", "manhaj-al-noor-foundations"],
  },
  {
    slug: "al-alaq-qalam",
    babSlug: "al-alaq-iqra",
    surahSlug: "al-alaq",
    order: 2,
    titleAr: "الفصل الثاني: العلم بالقلم",
    titleEn: "Knowledge by the Pen",
    bodyAr: [
      "«الذي علّم بالقلم، علّم الإنسان ما لم يعلم» — يُبرز النص أدوات حفظ العلم ونقله عبر الأجيال. القلم رمز للتوثيق والتراكم المعرفي الذي يقوم عليه العمران لاحقًا.",
      "نصّ مبدئي (placeholder). يُستكمل لاحقًا بالشرح والتخريج والربط بالمحاور.",
    ],
    keyIdeasAr: [
      "القلم أداة التراكم المعرفي.",
      "توثيق العلم شرط لبناء الأمة.",
      "من الفرد العالِم إلى المجتمع المتعلّم.",
    ],
    resourceSlugs: ["ep-2-sincere-individual"],
  },
  {
    slug: "al-alaq-istighna",
    babSlug: "al-alaq-tughyan",
    surahSlug: "al-alaq",
    order: 1,
    titleAr: "الفصل الأول: الاستغناء والطغيان",
    titleEn: "Self-sufficiency and Tyranny",
    bodyAr: [
      "«كلا إن الإنسان ليطغى، أن رآه استغنى» — تحذير من انقلاب العلم إلى غرور حين ينفصل عن الإخلاص. الطغيان هنا جذرٌ فرديّ قبل أن يصير ظاهرة في الحكم.",
      "نصّ مبدئي (placeholder) لإظهار البنية.",
    ],
    keyIdeasAr: [
      "الطغيان يبدأ شعورًا بالاستغناء.",
      "العلم بلا إخلاص خطر.",
      "إصلاح الفرد وقايةٌ لإصلاح الحكم.",
    ],
  },
  {
    slug: "al-alaq-rujaa",
    babSlug: "al-alaq-tughyan",
    surahSlug: "al-alaq",
    order: 2,
    titleAr: "الفصل الثاني: الرجعى إلى الله",
    titleEn: "The Return to God",
    bodyAr: [
      "«إن إلى ربك الرجعى» — تذكيرٌ بأن مآل العلم والقوة إلى الله، وهو ضابط الإخلاص الذي يمنع الطغيان.",
      "نصّ مبدئي (placeholder).",
    ],
    keyIdeasAr: ["المرجع إلى الله ضابط للسلوك.", "المسؤولية تلازم العلم والقوة."],
  },
  {
    slug: "al-alaq-first-revelation",
    babSlug: "al-alaq-position",
    surahSlug: "al-alaq",
    order: 1,
    titleAr: "الفصل الأول: أول الغيث — بداية النزول",
    titleEn: "The First Revelation",
    bodyAr: [
      "بوصفها أول ما نزل، تفتتح العلق كامل الخريطة. اختيار «اقرأ» بدايةً يضع العلم والوعي في قلب مشروع بناء الإنسان والعمران.",
      "نصّ مبدئي (placeholder).",
    ],
    keyIdeasAr: [
      "العلق = المحطة رقم ١ في ترتيب النزول.",
      "البداية بالعلم لا بالتشريع.",
      "مدخل مجموعة النون ومجال الفرد المخلص.",
    ],
    resourceSlugs: ["intro-manhaj-al-noor"],
  },
  {
    slug: "al-alaq-sujud",
    babSlug: "al-alaq-position",
    surahSlug: "al-alaq",
    order: 2,
    titleAr: "الفصل الثاني: السجود والاقتراب",
    titleEn: "Prostration and Nearness",
    bodyAr: [
      "«واسجد واقترب» — تختم السورة بالعبودية بوصفها ذروة الإخلاص وطريق القرب، ممهّدةً لما بعدها في مجموعة النون.",
      "نصّ مبدئي (placeholder).",
    ],
    keyIdeasAr: ["السجود ذروة الإخلاص.", "القرب ثمرة العبودية.", "جسر إلى السور التالية."],
  },
];

/* ---- Lookups ----------------------------------------------------- */

export const babsForSurah = (surahSlug: string) =>
  BABS.filter((b) => b.surahSlug === surahSlug).sort((a, b) => a.order - b.order);

export const getBab = (slug: string) => BABS.find((b) => b.slug === slug);

export const fusoolForBab = (babSlug: string) =>
  FUSOOL.filter((f) => f.babSlug === babSlug).sort((a, b) => a.order - b.order);

export const getFasl = (slug: string) => FUSOOL.find((f) => f.slug === slug);

/** Does this surah have authored deep content yet? */
export const surahHasContent = (surahSlug: string) =>
  BABS.some((b) => b.surahSlug === surahSlug);
