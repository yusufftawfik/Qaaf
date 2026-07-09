import { DOMAINS } from "./manhaj";

export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}
export interface NavGroup {
  label: string;
  href?: string;
  items?: NavItem[];
}

export const PRIMARY_NAV: NavGroup[] = [
  { label: "الخريطة", href: "/map" },
  {
    label: "المجالات",
    items: DOMAINS.map((d) => ({
      label: d.titleAr,
      href: `/domains/${d.slug}`,
      desc: d.titleEn,
    })),
  },
  {
    label: "المصادر",
    items: [
      { label: "الكتب و PDF", href: "/resources/books", desc: "Books" },
      { label: "الفيديوهات", href: "/resources/videos", desc: "Videos" },
      { label: "البودكاست", href: "/resources/podcasts", desc: "Podcasts" },
      { label: "كل المصادر", href: "/resources", desc: "All resources" },
    ],
  },
  {
    label: "عن المنهاج",
    items: [
      { label: "منهاج النور", href: "/about/manhaj-al-noor" },
      { label: "أمة القرآن", href: "/about/ummat-al-quran" },
      { label: "المنهجية والرؤية", href: "/about" },
      { label: "المؤلّف: علي محمد توفيق", href: "/author/ali-mohammad-tawfik" },
    ],
  },
  { label: "المنتجات", href: "/products" },
];

export const FOOTER_NAV: NavGroup[] = [
  {
    label: "المنهاج",
    items: [
      { label: "الخريطة التفاعلية", href: "/map" },
      { label: "الفرد المخلص", href: "/domains/al-fard-al-mukhlis" },
      { label: "الحكم العادل", href: "/domains/al-hukm-al-adil" },
      { label: "الأمة الراشدة", href: "/domains/al-ummah-al-rashida" },
    ],
  },
  {
    label: "المصادر",
    items: [
      { label: "الكتب", href: "/resources/books" },
      { label: "الفيديوهات", href: "/resources/videos" },
      { label: "البودكاست", href: "/resources/podcasts" },
      { label: "البحث المتقدّم", href: "/search" },
    ],
  },
  {
    label: "المنصّة",
    items: [
      { label: "عن أمة القرآن", href: "/about/ummat-al-quran" },
      { label: "عن منهاج النور", href: "/about/manhaj-al-noor" },
      { label: "المؤلّف", href: "/author/ali-mohammad-tawfik" },
      { label: "المنتجات", href: "/products" },
    ],
  },
];
