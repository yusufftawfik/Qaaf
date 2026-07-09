/**
 * Domain model for the Manhaj Al-Noor knowledge map.
 *
 * Hierarchy:
 *   Domain (المجال)  →  Letter group (المجموعة الحرفية)  →  Section (المحور)
 *      →  Surah (السورة)  →  Chapter / Bab (الباب)  →  Section / Fasl (الفصل)
 *      →  Detailed content  →  Resources
 */

export type DomainSlug =
  | "al-fard-al-mukhlis"
  | "al-hukm-al-adil"
  | "al-ummah-al-rashida";

export type LetterSlug = "noon" | "qaf" | "sad" | "ta" | "ra" | "jeem" | "meem";

export type ColorKey = "navy" | "emerald" | "gold";

export type Revelation = "Meccan" | "Medinan";

/** Top-level domain — one of the three pillars of the map. */
export interface Domain {
  slug: DomainSlug;
  order: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  colorKey: ColorKey;
  /** Quick-access accent hex (matches the Tailwind token). */
  accent: string;
  letters: LetterSlug[];
  /** Inclusive nuzul-order range covered by this domain. */
  surahRange: [number, number];
}

/** A letter group (ن، ق، ص، ط، ر، ج، م) inside a domain. */
export interface LetterGroup {
  slug: LetterSlug;
  /** The Arabic letter glyph, e.g. "ن". */
  letter: string;
  domainSlug: DomainSlug;
  /** Human meaning of the group, e.g. الإخلاص. */
  titleAr: string;
  titleEn: string;
  /** Governance / civilizational function, e.g. القيادة التنفيذية. */
  functionAr: string;
  functionEn: string;
  descriptionAr: string;
  descriptionEn: string;
  surahRange: [number, number];
  sectionKeys: string[];
}

/** A thematic axis (محور) inside a letter group — a column on the map. */
export interface MapSection {
  key: string;
  titleAr: string;
  titleEn: string;
  domainSlug: DomainSlug;
  letterSlug: LetterSlug;
  surahRange: [number, number];
  descriptionAr?: string;
}

/** A single surah node on the map. */
export interface Surah {
  /** Revelation order 1..114 — this is the number printed on the map. */
  nuzul: number;
  /** Standard mushaf order 1..114. */
  mushaf: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  revelation: Revelation;
  ayah: number;
  domainSlug: DomainSlug;
  letterSlug: LetterSlug;
  sectionKey: string;
  /** Ali Tawfik's per-surah theme from the map (partial — to be completed). */
  themeAr?: string;
  themeEn?: string;
  /** Optional one-line editorial summary (placeholder where missing). */
  summaryAr?: string;
}

/* ------------------------------------------------------------------ *
 * Deep content (sample-only for now)
 * ------------------------------------------------------------------ */

/** Chapter / باب inside a surah study. */
export interface Bab {
  slug: string;
  surahSlug: string;
  order: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  fusoolSlugs: string[];
}

/** Section / فصل inside a chapter. */
export interface Fasl {
  slug: string;
  babSlug: string;
  surahSlug: string;
  order: number;
  titleAr: string;
  titleEn: string;
  /** Detailed body content (placeholder markdown-ish paragraphs). */
  bodyAr: string[];
  keyIdeasAr: string[];
  resourceSlugs?: string[];
}

/* ------------------------------------------------------------------ *
 * Resources
 * ------------------------------------------------------------------ */

export type ResourceType =
  | "book"
  | "article"
  | "paper"
  | "video"
  | "podcast"
  | "lecture"
  | "sermon"
  | "educational";

export interface ResourceBase {
  slug: string;
  type: ResourceType;
  titleAr: string;
  titleEn?: string;
  descriptionAr: string;
  domainSlug?: DomainSlug;
  letterSlug?: LetterSlug;
  surahSlugs?: string[];
  tags?: string[];
  /** ISO date string. */
  date?: string;
}

export interface Book extends ResourceBase {
  type: "book";
  author: string;
  pages?: number;
  coverColor?: ColorKey;
  downloadUrl?: string;
}

export interface Media extends ResourceBase {
  type: "video" | "lecture" | "sermon";
  youtubeId: string;
  duration?: string;
}

export interface Podcast extends ResourceBase {
  type: "podcast";
  episode?: number;
  duration?: string;
  audioUrl?: string;
  rssUrl?: string;
}

export interface Writing extends ResourceBase {
  type: "article" | "paper";
  author: string;
  readingMinutes?: number;
}

export interface EducationalKit extends ResourceBase {
  type: "educational";
  audience: string;
  includes: string[];
}

export type Resource = Book | Media | Podcast | Writing | EducationalKit;

/* ------------------------------------------------------------------ *
 * Personas & products
 * ------------------------------------------------------------------ */

export interface Persona {
  slug: string;
  titleAr: string;
  titleEn: string;
  blurbAr: string;
  ctaAr: string;
  startHref: string;
  iconKey: string;
}

export interface Product {
  slug: string;
  titleAr: string;
  titleEn: string;
  status: "live" | "beta" | "coming-soon";
  taglineAr: string;
  descriptionAr: string;
  iconKey: string;
  features: string[];
}

/* ------------------------------------------------------------------ *
 * Breadcrumbs / navigation
 * ------------------------------------------------------------------ */

export interface Crumb {
  label: string;
  href?: string;
}
