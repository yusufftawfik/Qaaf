import type {
  Domain,
  LetterGroup,
  LetterSlug,
  MapSection,
  Surah,
  DomainSlug,
} from "@/lib/types";
import { inRange, slugify } from "@/lib/utils";

/* ================================================================== *
 *  MANHAJ AL-NOOR — authoritative map structure
 *
 *  Source of truth: the "منهاج النور" map (Ali Mohammad Tawfik).
 *  Surahs are ordered by REVELATION order (ترتيب النزول), 1..114,
 *  matching the standard Egyptian chronological order. Every number,
 *  name, mushaf index and revelation place below was cross-checked
 *  against the map's anchor cells.
 * ================================================================== */

/* ---- 1. Domains (المجالات) --------------------------------------- */

export const DOMAINS: Domain[] = [
  {
    slug: "al-fard-al-mukhlis",
    order: 1,
    titleAr: "الفرد المخلص",
    titleEn: "The Sincere Individual",
    subtitleAr: "ن · ق",
    subtitleEn: "Letter groups Noon & Qaf",
    descriptionAr:
      "بناء الإنسان المخلص من الداخل: النية، الطهارة، اليقين، والمجد الأخلاقي. هنا تبدأ الرحلة — قبل الحكم وقبل الأمة، يُبنى الفرد.",
    descriptionEn:
      "Forming the sincere human being from within — intention, purity, certainty and moral honour. The journey begins here: before governance and before nation, the individual is built.",
    colorKey: "emerald",
    accent: "#226B54",
    letters: ["noon", "qaf"],
    surahRange: [1, 37],
  },
  {
    slug: "al-hukm-al-adil",
    order: 2,
    titleAr: "الحُكم العادل",
    titleEn: "Just Governance",
    subtitleAr: "ص · ط · ر · ج",
    subtitleEn: "Letter groups Sad, Ta, Ra & Jeem",
    descriptionAr:
      "من الفرد إلى المؤسسة: القيادة التنفيذية، وإدارة الشدائد والأمن، والسلطة التشريعية، والسلطة القضائية. أركان الحكم العادل بترتيب نزولها.",
    descriptionEn:
      "From the individual to the institution: executive leadership, crisis management and security, legislative authority, and judicial authority — the pillars of just governance in the order they were revealed.",
    colorKey: "navy",
    accent: "#14324F",
    letters: ["sad", "ta", "ra", "jeem"],
    surahRange: [38, 66],
  },
  {
    slug: "al-ummah-al-rashida",
    order: 3,
    titleAr: "الأمة الراشدة",
    titleEn: "The Guided Nation",
    subtitleAr: "م",
    subtitleEn: "Letter group Meem",
    descriptionAr:
      "بناء العمران: القوة الاقتصادية، والخروج من الظلمات إلى النور، والردع الأخلاقي، والدفاع وحقوق الإنسان، والقوة السلوكية، والشئون الخارجية.",
    descriptionEn:
      "Building civilization: economic power, deliverance from darkness to light, moral deterrence, defense and human rights, behavioural strength, and foreign affairs.",
    colorKey: "gold",
    accent: "#A9842E",
    letters: ["meem"],
    surahRange: [67, 114],
  },
];

/* ---- 2. Sections (المحاور) — the columns of the map -------------- */

export const SECTIONS: MapSection[] = [
  // Domain 1
  {
    key: "ikhlas",
    titleAr: "الإخلاص",
    titleEn: "Sincerity",
    domainSlug: "al-fard-al-mukhlis",
    letterSlug: "noon",
    surahRange: [1, 22],
    descriptionAr: "تأسيس النية والطهارة الداخلية والصلة بالله.",
  },
  {
    key: "majd",
    titleAr: "المجد",
    titleEn: "Honour & Glory",
    domainSlug: "al-fard-al-mukhlis",
    letterSlug: "qaf",
    surahRange: [23, 37],
    descriptionAr: "رفعة الإنسان المخلص ومجده الأخلاقي.",
  },
  // Domain 2
  {
    key: "executive",
    titleAr: "القيادة التنفيذية",
    titleEn: "Executive Leadership",
    domainSlug: "al-hukm-al-adil",
    letterSlug: "sad",
    surahRange: [38, 44],
    descriptionAr: "قواعد الإصلاح وإدارة الحكم التنفيذي.",
  },
  {
    key: "crisis",
    titleAr: "إدارة الشدائد والأمن القومي",
    titleEn: "Crisis Management & National Security",
    domainSlug: "al-hukm-al-adil",
    letterSlug: "ta",
    surahRange: [45, 49],
    descriptionAr: "المواجهة والصمود وإدارة الأزمات.",
  },
  {
    key: "legislative",
    titleAr: "الحكمة والسلطة التشريعية",
    titleEn: "Wisdom & Legislative Authority",
    domainSlug: "al-hukm-al-adil",
    letterSlug: "ra",
    surahRange: [50, 57],
    descriptionAr: "التشريع المُحكم وضبط السلطة بالحكمة.",
  },
  {
    key: "judicial",
    titleAr: "فصل الخطاب والسلطة القضائية",
    titleEn: "Decisive Judgment & Judicial Authority",
    domainSlug: "al-hukm-al-adil",
    letterSlug: "jeem",
    surahRange: [58, 66],
    descriptionAr: "العدل في الحكم وفصل الخصومات.",
  },
  // Domain 3
  {
    key: "economic",
    titleAr: "القوة الاقتصادية",
    titleEn: "Economic Power",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [67, 71],
    descriptionAr: "أسس القوة الاقتصادية للأمة.",
  },
  {
    key: "light",
    titleAr: "الإخراج من الظلمات إلى النور",
    titleEn: "From Darkness into Light",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [72, 73],
    descriptionAr: "تحرير الوعي الجمعي من الظلمات.",
  },
  {
    key: "moral",
    titleAr: "الردع الأخلاقي",
    titleEn: "Moral Deterrence",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [74, 83],
    descriptionAr: "حماية القيم عبر الردع الأخلاقي.",
  },
  {
    key: "defense",
    titleAr: "الدفاع وحقوق الإنسان",
    titleEn: "Defense & Human Rights",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [84, 95],
    descriptionAr: "الدفاع عن الأمة وصون حقوق الإنسان.",
  },
  {
    key: "behavioral",
    titleAr: "القوة السلوكية",
    titleEn: "Behavioural Strength",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [96, 110],
    descriptionAr: "ضبط سلوك المجتمع ومعاملاته.",
  },
  {
    key: "foreign",
    titleAr: "الشئون الخارجية",
    titleEn: "Foreign Affairs",
    domainSlug: "al-ummah-al-rashida",
    letterSlug: "meem",
    surahRange: [111, 114],
    descriptionAr: "العلاقات الخارجية واكتمال الرسالة.",
  },
];

/* ---- 3. Letter groups (المجموعات الحرفية) ------------------------ */

export const LETTERS: LetterGroup[] = [
  {
    slug: "noon",
    letter: "ن",
    domainSlug: "al-fard-al-mukhlis",
    titleAr: "الإخلاص",
    titleEn: "Sincerity",
    functionAr: "تأسيس الفرد المخلص",
    functionEn: "Founding the sincere individual",
    descriptionAr:
      "أول ما نزل من القرآن. مجموعة تبني النية والقراءة والطهارة والصلة بالله قبل أي بناء آخر.",
    descriptionEn:
      "The first revealed group — building intention, reading, purity and the bond with God before any other construction.",
    surahRange: [1, 22],
    sectionKeys: ["ikhlas"],
  },
  {
    slug: "qaf",
    letter: "ق",
    domainSlug: "al-fard-al-mukhlis",
    titleAr: "المجد",
    titleEn: "Honour & Glory",
    functionAr: "مجد الفرد المخلص",
    functionEn: "The glory of the sincere individual",
    descriptionAr: "رفعة الإنسان حين يخلص، ومجده الأخلاقي أمام الله والناس.",
    descriptionEn:
      "The elevation of the human being through sincerity, and moral honour before God and people.",
    surahRange: [23, 37],
    sectionKeys: ["majd"],
  },
  {
    slug: "sad",
    letter: "ص",
    domainSlug: "al-hukm-al-adil",
    titleAr: "القيادة",
    titleEn: "Leadership",
    functionAr: "السلطة التنفيذية",
    functionEn: "Executive authority",
    descriptionAr: "قواعد الإصلاح وقيادة الأمة تنفيذيًا بعدل ورؤية.",
    descriptionEn: "The rules of reform and leading the nation with justice and vision.",
    surahRange: [38, 44],
    sectionKeys: ["executive"],
  },
  {
    slug: "ta",
    letter: "ط",
    domainSlug: "al-hukm-al-adil",
    titleAr: "إدارة الشدائد",
    titleEn: "Crisis Management",
    functionAr: "الأمن القومي",
    functionEn: "National security",
    descriptionAr: "المواجهة والصمود وإدارة الأزمات والأمن.",
    descriptionEn: "Confrontation, steadfastness, and the management of crises and security.",
    surahRange: [45, 49],
    sectionKeys: ["crisis"],
  },
  {
    slug: "ra",
    letter: "ر",
    domainSlug: "al-hukm-al-adil",
    titleAr: "الحكمة",
    titleEn: "Wisdom",
    functionAr: "السلطة التشريعية",
    functionEn: "Legislative authority",
    descriptionAr: "التشريع المُحكم وضبط السلطة بالحكمة والاتفاق.",
    descriptionEn: "Sound legislation and the regulation of authority through wisdom.",
    surahRange: [50, 57],
    sectionKeys: ["legislative"],
  },
  {
    slug: "jeem",
    letter: "ج",
    domainSlug: "al-hukm-al-adil",
    titleAr: "فصل الخطاب",
    titleEn: "Decisive Judgment",
    functionAr: "السلطة القضائية",
    functionEn: "Judicial authority",
    descriptionAr: "العدل في الحكم وفصل الخصومات بالبيّنة.",
    descriptionEn: "Justice in ruling and the settlement of disputes by evidence.",
    surahRange: [58, 66],
    sectionKeys: ["judicial"],
  },
  {
    slug: "meem",
    letter: "م",
    domainSlug: "al-ummah-al-rashida",
    titleAr: "الأمة",
    titleEn: "The Nation",
    functionAr: "بناء العمران",
    functionEn: "Building civilization",
    descriptionAr:
      "المرحلة المدنية الكبرى: اقتصاد، وأخلاق، ودفاع وحقوق، وسلوك، وعلاقات خارجية — حتى اكتمال الرسالة.",
    descriptionEn:
      "The great civic stage: economy, ethics, defense and rights, behaviour and foreign relations — until the message is complete.",
    surahRange: [67, 114],
    sectionKeys: ["economic", "light", "moral", "defense", "behavioral", "foreign"],
  },
];

/* ---- 4. Surahs (السور) — full 114, by revelation order ----------- *
 * Tuple layout: [nuzul, mushaf, nameAr, nameEn, revelation, ayah]
 * revelation: "M" = Meccan (مكية), "D" = Medinan (مدنية)
 * -------------------------------------------------------------------*/

type Raw = [number, number, string, string, "M" | "D", number];

const RAW_SURAHS: Raw[] = [
  [1, 96, "العلق", "Al-Alaq", "M", 19],
  [2, 68, "القلم", "Al-Qalam", "M", 52],
  [3, 73, "المزمل", "Al-Muzzammil", "M", 20],
  [4, 74, "المدثر", "Al-Muddaththir", "M", 56],
  [5, 1, "الفاتحة", "Al-Fatihah", "M", 7],
  [6, 111, "المسد", "Al-Masad", "M", 5],
  [7, 81, "التكوير", "At-Takwir", "M", 29],
  [8, 87, "الأعلى", "Al-A'la", "M", 19],
  [9, 92, "الليل", "Al-Layl", "M", 21],
  [10, 89, "الفجر", "Al-Fajr", "M", 30],
  [11, 93, "الضحى", "Ad-Duha", "M", 11],
  [12, 94, "الشرح", "Ash-Sharh", "M", 8],
  [13, 103, "العصر", "Al-Asr", "M", 3],
  [14, 100, "العاديات", "Al-Adiyat", "M", 11],
  [15, 108, "الكوثر", "Al-Kawthar", "M", 3],
  [16, 102, "التكاثر", "At-Takathur", "M", 8],
  [17, 107, "الماعون", "Al-Ma'un", "M", 7],
  [18, 109, "الكافرون", "Al-Kafirun", "M", 6],
  [19, 105, "الفيل", "Al-Fil", "M", 5],
  [20, 113, "الفلق", "Al-Falaq", "M", 5],
  [21, 114, "الناس", "An-Nas", "M", 6],
  [22, 112, "الإخلاص", "Al-Ikhlas", "M", 4],
  [23, 53, "النجم", "An-Najm", "M", 62],
  [24, 80, "عبس", "Abasa", "M", 42],
  [25, 97, "القدر", "Al-Qadr", "M", 5],
  [26, 91, "الشمس", "Ash-Shams", "M", 15],
  [27, 85, "البروج", "Al-Buruj", "M", 22],
  [28, 95, "التين", "At-Tin", "M", 8],
  [29, 106, "قريش", "Quraysh", "M", 4],
  [30, 101, "القارعة", "Al-Qari'ah", "M", 11],
  [31, 75, "القيامة", "Al-Qiyamah", "M", 40],
  [32, 104, "الهمزة", "Al-Humazah", "M", 9],
  [33, 77, "المرسلات", "Al-Mursalat", "M", 50],
  [34, 50, "ق", "Qaf", "M", 45],
  [35, 90, "البلد", "Al-Balad", "M", 20],
  [36, 86, "الطارق", "At-Tariq", "M", 17],
  [37, 54, "القمر", "Al-Qamar", "M", 55],
  [38, 38, "ص", "Sad", "M", 88],
  [39, 7, "الأعراف", "Al-A'raf", "M", 206],
  [40, 72, "الجن", "Al-Jinn", "M", 28],
  [41, 36, "يس", "Ya-Sin", "M", 83],
  [42, 25, "الفرقان", "Al-Furqan", "M", 77],
  [43, 35, "فاطر", "Fatir", "M", 45],
  [44, 19, "مريم", "Maryam", "M", 98],
  [45, 20, "طه", "Ta-Ha", "M", 135],
  [46, 56, "الواقعة", "Al-Waqi'ah", "M", 96],
  [47, 26, "الشعراء", "Ash-Shu'ara", "M", 227],
  [48, 27, "النمل", "An-Naml", "M", 93],
  [49, 28, "القصص", "Al-Qasas", "M", 88],
  [50, 17, "الإسراء", "Al-Isra", "M", 111],
  [51, 10, "يونس", "Yunus", "M", 109],
  [52, 11, "هود", "Hud", "M", 123],
  [53, 12, "يوسف", "Yusuf", "M", 111],
  [54, 15, "الحجر", "Al-Hijr", "M", 99],
  [55, 6, "الأنعام", "Al-An'am", "M", 165],
  [56, 37, "الصافات", "As-Saffat", "M", 182],
  [57, 31, "لقمان", "Luqman", "M", 34],
  [58, 34, "سبأ", "Saba", "M", 54],
  [59, 39, "الزمر", "Az-Zumar", "M", 75],
  [60, 40, "غافر", "Ghafir", "M", 85],
  [61, 41, "فصلت", "Fussilat", "M", 54],
  [62, 42, "الشورى", "Ash-Shura", "M", 53],
  [63, 43, "الزخرف", "Az-Zukhruf", "M", 89],
  [64, 44, "الدخان", "Ad-Dukhan", "M", 59],
  [65, 45, "الجاثية", "Al-Jathiyah", "M", 37],
  [66, 46, "الأحقاف", "Al-Ahqaf", "M", 35],
  [67, 51, "الذاريات", "Adh-Dhariyat", "M", 60],
  [68, 88, "الغاشية", "Al-Ghashiyah", "M", 26],
  [69, 18, "الكهف", "Al-Kahf", "M", 110],
  [70, 16, "النحل", "An-Nahl", "M", 128],
  [71, 71, "نوح", "Nuh", "M", 28],
  [72, 14, "إبراهيم", "Ibrahim", "M", 52],
  [73, 21, "الأنبياء", "Al-Anbiya", "M", 112],
  [74, 23, "المؤمنون", "Al-Mu'minun", "M", 118],
  [75, 32, "السجدة", "As-Sajdah", "M", 30],
  [76, 52, "الطور", "At-Tur", "M", 49],
  [77, 67, "الملك", "Al-Mulk", "M", 30],
  [78, 69, "الحاقة", "Al-Haqqah", "M", 52],
  [79, 70, "المعارج", "Al-Ma'arij", "M", 44],
  [80, 78, "النبأ", "An-Naba", "M", 40],
  [81, 79, "النازعات", "An-Nazi'at", "M", 46],
  [82, 82, "الانفطار", "Al-Infitar", "M", 19],
  [83, 84, "الانشقاق", "Al-Inshiqaq", "M", 25],
  [84, 30, "الروم", "Ar-Rum", "M", 60],
  [85, 29, "العنكبوت", "Al-Ankabut", "M", 69],
  [86, 83, "المطففين", "Al-Mutaffifin", "M", 36],
  [87, 2, "البقرة", "Al-Baqarah", "D", 286],
  [88, 8, "الأنفال", "Al-Anfal", "D", 75],
  [89, 3, "آل عمران", "Al-i-Imran", "D", 200],
  [90, 33, "الأحزاب", "Al-Ahzab", "D", 73],
  [91, 60, "الممتحنة", "Al-Mumtahanah", "D", 13],
  [92, 4, "النساء", "An-Nisa", "D", 176],
  [93, 99, "الزلزلة", "Az-Zalzalah", "D", 8],
  [94, 57, "الحديد", "Al-Hadid", "D", 29],
  [95, 47, "محمد", "Muhammad", "D", 38],
  [96, 13, "الرعد", "Ar-Ra'd", "D", 43],
  [97, 55, "الرحمن", "Ar-Rahman", "D", 78],
  [98, 76, "الإنسان", "Al-Insan", "D", 31],
  [99, 65, "الطلاق", "At-Talaq", "D", 12],
  [100, 98, "البينة", "Al-Bayyinah", "D", 8],
  [101, 59, "الحشر", "Al-Hashr", "D", 24],
  [102, 24, "النور", "An-Nur", "D", 64],
  [103, 22, "الحج", "Al-Hajj", "D", 78],
  [104, 63, "المنافقون", "Al-Munafiqun", "D", 11],
  [105, 58, "المجادلة", "Al-Mujadilah", "D", 22],
  [106, 49, "الحجرات", "Al-Hujurat", "D", 18],
  [107, 66, "التحريم", "At-Tahrim", "D", 12],
  [108, 64, "التغابن", "At-Taghabun", "D", 18],
  [109, 61, "الصف", "As-Saff", "D", 14],
  [110, 62, "الجمعة", "Al-Jumu'ah", "D", 11],
  [111, 48, "الفتح", "Al-Fath", "D", 29],
  [112, 5, "المائدة", "Al-Ma'idah", "D", 120],
  [113, 9, "التوبة", "At-Tawbah", "D", 129],
  [114, 110, "النصر", "An-Nasr", "D", 3],
];

/**
 * Ali Tawfik's per-surah micro-themes as printed on the map.
 * Only a verified subset is filled in; the rest fall back to the
 * section title. Transcribe the remaining cells from the map to
 * complete this record.
 */
const THEME_OVERRIDES: Record<number, { ar: string; en: string }> = {
  1: { ar: "اقرأ", en: "Read" },
  2: { ar: "القلم والبيان", en: "The Pen & Clarity" },
  5: { ar: "أمّ المنهج", en: "The Opening Method" },
  22: { ar: "التوحيد الخالص", en: "Pure Monotheism" },
  38: { ar: "قيادة الإصلاح", en: "Leadership of Reform" },
  45: { ar: "الصمود والمواجهة", en: "Steadfastness" },
  50: { ar: "مدخل الحكمة", en: "Gateway of Wisdom" },
  67: { ar: "أسس القوة", en: "Foundations of Strength" },
  114: { ar: "اكتمال الرسالة", en: "Completion of the Message" },
};

/* ---- 5. Build the derived Surah list ----------------------------- */

function classify(nuzul: number): {
  domainSlug: DomainSlug;
  letterSlug: LetterSlug;
  sectionKey: string;
} {
  const section = SECTIONS.find((s) => inRange(nuzul, s.surahRange));
  if (!section) throw new Error(`No section for nuzul ${nuzul}`);
  return {
    domainSlug: section.domainSlug,
    letterSlug: section.letterSlug,
    sectionKey: section.key,
  };
}

export const SURAHS: Surah[] = RAW_SURAHS.map(
  ([nuzul, mushaf, nameAr, nameEn, rev, ayah]) => {
    const cls = classify(nuzul);
    const override = THEME_OVERRIDES[nuzul];
    const section = SECTIONS.find((s) => s.key === cls.sectionKey)!;
    return {
      nuzul,
      mushaf,
      slug: slugify(nameEn),
      nameAr,
      nameEn,
      revelation: rev === "M" ? "Meccan" : "Medinan",
      ayah,
      ...cls,
      themeAr: override?.ar ?? section.titleAr,
      themeEn: override?.en ?? section.titleEn,
    };
  }
);

/* ---- 6. Lookups & relationships ---------------------------------- */

export const getDomain = (slug: string) =>
  DOMAINS.find((d) => d.slug === slug);

export const getLetter = (slug: string) =>
  LETTERS.find((l) => l.slug === slug);

export const getSection = (key: string) =>
  SECTIONS.find((s) => s.key === key);

export const getSurahBySlug = (slug: string) =>
  SURAHS.find((s) => s.slug === slug);

export const getSurahByNuzul = (nuzul: number) =>
  SURAHS.find((s) => s.nuzul === nuzul);

export const lettersByDomain = (domainSlug: string) =>
  LETTERS.filter((l) => l.domainSlug === domainSlug);

export const sectionsByLetter = (letterSlug: string) =>
  SECTIONS.filter((s) => s.letterSlug === letterSlug);

export const sectionsByDomain = (domainSlug: string) =>
  SECTIONS.filter((s) => s.domainSlug === domainSlug);

export const surahsByLetter = (letterSlug: string) =>
  SURAHS.filter((s) => s.letterSlug === letterSlug);

export const surahsBySection = (key: string) =>
  SURAHS.filter((s) => s.sectionKey === key);

export const surahsByDomain = (domainSlug: string) =>
  SURAHS.filter((s) => s.domainSlug === domainSlug);

export const prevSurah = (nuzul: number) => getSurahByNuzul(nuzul - 1);
export const nextSurah = (nuzul: number) => getSurahByNuzul(nuzul + 1);

export const surahTheme = (s: Surah) => s.themeAr ?? getSection(s.sectionKey)?.titleAr ?? "";

/** Domains in map (RTL) order — right-most first. */
export const DOMAINS_IN_MAP_ORDER = [...DOMAINS].sort((a, b) => a.order - b.order);
