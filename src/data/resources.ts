import type {
  Book,
  EducationalKit,
  Media,
  Podcast,
  Resource,
  Writing,
} from "@/lib/types";

/**
 * YouTube channel configuration — "كنوز النور".
 * Replace individual `youtubeId`s below with real video IDs.
 */
export const CHANNEL = {
  handle: "@كنوزالنور-ص4س",
  channelId: "UCsnGggxTgpyi6FePbKM2Z8A",
  url: "https://www.youtube.com/@كنوزالنور-ص4س",
  uploadsEmbed:
    "https://www.youtube.com/embed?listType=playlist&list=UUsnGggxTgpyi6FePbKM2Z8A",
};

/**
 * Podcast configuration — placeholder RSS until a real feed exists.
 */
export const PODCAST_FEED = {
  title: "بودكاست منهاج النور",
  rssUrl: "https://example.com/manhaj-al-noor/feed.xml", // TODO: replace
  note: "لا يوجد خلاصة RSS فعلية بعد — هذه تهيئة مبدئية.",
};

export const BOOKS: Book[] = [
  {
    slug: "manhaj-al-noor-foundations",
    type: "book",
    titleAr: "منهاج النور: بناء الإنسان والعمران",
    titleEn: "Manhaj Al-Noor: Building Human & Civilization",
    author: "علي محمد توفيق",
    descriptionAr:
      "الكتاب المؤسِّس الذي يشرح قراءة القرآن بترتيب نزوله كمنهج متكامل لبناء الفرد ثم الحكم ثم الأمة.",
    pages: 320,
    coverColor: "navy",
    downloadUrl: "#",
    domainSlug: "al-fard-al-mukhlis",
    tags: ["تأسيسي", "منهجية"],
    date: "2024-01-01",
  },
  {
    slug: "sincere-individual",
    type: "book",
    titleAr: "الفرد المخلص",
    titleEn: "The Sincere Individual",
    author: "علي محمد توفيق",
    descriptionAr:
      "دراسة في مجموعتي النون والقاف: كيف يبني القرآن النية والطهارة واليقين والمجد الأخلاقي.",
    pages: 210,
    coverColor: "emerald",
    downloadUrl: "#",
    domainSlug: "al-fard-al-mukhlis",
    tags: ["الفرد", "الإخلاص"],
    date: "2024-06-01",
  },
  {
    slug: "just-governance",
    type: "book",
    titleAr: "الحكم العادل",
    titleEn: "Just Governance",
    author: "علي محمد توفيق",
    descriptionAr:
      "قراءة في السلطات التنفيذية والتشريعية والقضائية وإدارة الأزمات كما ترتّبها مجموعات ص ط ر ج.",
    pages: 264,
    coverColor: "gold",
    downloadUrl: "#",
    domainSlug: "al-hukm-al-adil",
    tags: ["الحوكمة", "العدل"],
    date: "2025-02-01",
  },
];

export const MEDIA: Media[] = [
  {
    slug: "intro-manhaj-al-noor",
    type: "video",
    titleAr: "مدخل إلى منهاج النور",
    descriptionAr: "لماذا نقرأ القرآن بترتيب نزوله؟ نظرة عامة على الخريطة.",
    youtubeId: "PLACEHOLDER1",
    duration: "18:24",
    domainSlug: "al-fard-al-mukhlis",
    tags: ["مقدمة"],
  },
  {
    slug: "al-alaq-read",
    type: "lecture",
    titleAr: "العلق: أمر (اقرأ) وبناء الوعي",
    descriptionAr: "أول ما نزل — كيف تؤسّس سورة العلق للفرد المخلص.",
    youtubeId: "PLACEHOLDER2",
    duration: "27:10",
    surahSlugs: ["al-alaq"],
    domainSlug: "al-fard-al-mukhlis",
    letterSlug: "noon",
    tags: ["العلق", "الإخلاص"],
  },
  {
    slug: "khutbah-justice",
    type: "sermon",
    titleAr: "خطبة: العدل أساس العمران",
    descriptionAr: "مادة خطبة عن العدل مستندة إلى مجال الحكم العادل.",
    youtubeId: "PLACEHOLDER3",
    duration: "22:40",
    domainSlug: "al-hukm-al-adil",
    tags: ["خطبة", "العدل"],
  },
  {
    slug: "economic-power",
    type: "lecture",
    titleAr: "القوة الاقتصادية للأمة",
    descriptionAr: "قراءة في محور القوة الاقتصادية ضمن مجموعة الميم.",
    youtubeId: "PLACEHOLDER4",
    duration: "31:05",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    tags: ["الاقتصاد", "الأمة"],
  },
];

export const PODCASTS: Podcast[] = [
  {
    slug: "ep-1-why-nuzul-order",
    type: "podcast",
    episode: 1,
    titleAr: "الحلقة ١: لماذا ترتيب النزول؟",
    descriptionAr: "نناقش الفكرة المركزية للمنهاج وأثرها على الفهم.",
    duration: "34:12",
    audioUrl: "#",
    rssUrl: PODCAST_FEED.rssUrl,
    domainSlug: "al-fard-al-mukhlis",
    tags: ["منهجية"],
  },
  {
    slug: "ep-2-sincere-individual",
    type: "podcast",
    episode: 2,
    titleAr: "الحلقة ٢: كيف يُبنى الفرد المخلص؟",
    descriptionAr: "رحلة في مجموعة النون من العلق إلى الإخلاص.",
    duration: "41:58",
    audioUrl: "#",
    rssUrl: PODCAST_FEED.rssUrl,
    domainSlug: "al-fard-al-mukhlis",
    letterSlug: "noon",
    tags: ["الفرد"],
  },
];

export const WRITINGS: Writing[] = [
  {
    slug: "article-map-as-method",
    type: "article",
    titleAr: "الخريطة بوصفها منهجًا لا فهرسًا",
    descriptionAr: "لماذا منهاج النور خريطة معرفية موجّهة وليس مكتبة محتوى.",
    author: "علي محمد توفيق",
    readingMinutes: 9,
    tags: ["منهجية"],
    date: "2025-03-10",
  },
  {
    slug: "paper-governance-sequence",
    type: "paper",
    titleAr: "تسلسل السلطات في المرحلة المدنية",
    descriptionAr: "ورقة بحثية في ترتيب السلطات التنفيذية والتشريعية والقضائية.",
    author: "علي محمد توفيق",
    readingMinutes: 24,
    domainSlug: "al-hukm-al-adil",
    tags: ["الحوكمة", "بحث"],
    date: "2025-04-22",
  },
];

export const KITS: EducationalKit[] = [
  {
    slug: "kit-sincere-individual",
    type: "educational",
    titleAr: "حقيبة: الفرد المخلص",
    descriptionAr: "خطة درس كاملة حول مجموعة النون مع أسئلة نقاش وتقييم.",
    audience: "معلّمون · حلقات",
    includes: ["ملخص جاهز", "٦ أسئلة نقاش", "شرائح عرض", "ورقة تقييم"],
    domainSlug: "al-fard-al-mukhlis",
    letterSlug: "noon",
    tags: ["تعليمي"],
  },
];

export const ALL_RESOURCES: Resource[] = [
  ...BOOKS,
  ...MEDIA,
  ...PODCASTS,
  ...WRITINGS,
  ...KITS,
];

/* ---- Lookups ----------------------------------------------------- */

export const getResource = (slug: string) =>
  ALL_RESOURCES.find((r) => r.slug === slug);

export const resourcesForSurah = (surahSlug: string) =>
  ALL_RESOURCES.filter((r) => r.surahSlugs?.includes(surahSlug));

export const resourcesForDomain = (domainSlug: string) =>
  ALL_RESOURCES.filter((r) => r.domainSlug === domainSlug);

export const resourcesByType = (type: Resource["type"]) =>
  ALL_RESOURCES.filter((r) => r.type === type);
