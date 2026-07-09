# أمة القرآن — منهاج النور · Ummat Al-Quran — Manhaj Al-Noor

A guided **knowledge-map platform** (not a blog or content library) built around the
*Manhaj Al-Noor* map: **building the human being and civilization by the order of Qur'anic
revelation** (بناء الإنسان والعمران بترتيب نزول القرآن).

The experience is organized so that on every page the visitor always knows **where they are**
in the hierarchy, **what the page means**, **how it connects to the whole map**, and **what to
read / watch / listen to next**.

> This is a **front-end prototype**. Per the agreed scope, the **homepage** and the
> **interactive map** are the most polished parts, plus **one complete sample journey**
> (Home → Map → Domain → Letter group → Surah → Chapter → Section → Resource). The rest of
> the routes are real, navigable scaffolds wired to the same scalable data layer, ready to be
> filled in.

---

## 1. Tech stack (and why)

- **Next.js 14 (App Router)** · **TypeScript** · **Tailwind CSS** — exactly as requested.
  App Router gives us first-class static generation for the 100+ map nodes, nested layouts,
  and clean file-based routing that mirrors the Manhaj hierarchy.
- **next/font** for self-hosted Arabic type (IBM Plex Sans Arabic + Reem Kufi + Amiri).
- **Zero heavy UI dependencies** — the icon set, buttons, cards and the map are hand-built so
  the bundle stays small and the visual language is fully ours.

## 2. Quick start

```bash
# from the project root (this folder)
npm install
npm run dev          # http://localhost:3000
```

Other scripts: `npm run build` (production build) · `npm start` (serve build) · `npm run lint`.

> The build was **not** run in the authoring environment, so please `npm install` first. If
> `next/font` cannot reach Google Fonts on a restricted network, swap the three fonts in
> `src/app/layout.tsx` for local files or system fallbacks.

## 3. Project structure

```
ummat-al-quran/
├─ src/
│  ├─ app/                        # routes (App Router)
│  │  ├─ layout.tsx               # RTL <html>, fonts, header/footer
│  │  ├─ globals.css              # tokens, base styles, utilities
│  │  ├─ page.tsx                 # HOME (polished)
│  │  ├─ map/page.tsx             # INTERACTIVE MAP (polished)
│  │  ├─ domains/[domainSlug]/
│  │  ├─ letters/[letterSlug]/
│  │  ├─ surahs/[surahSlug]/      # rich sample: al-alaq
│  │  ├─ chapters/[chapterSlug]/
│  │  ├─ sections/[sectionSlug]/
│  │  ├─ resources/ (+ books, videos, podcasts)
│  │  ├─ about/ (+ manhaj-al-noor, ummat-al-quran)
│  │  ├─ author/ali-mohammad-tawfik/
│  │  ├─ search/
│  │  ├─ products/[productSlug]/
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ layout/     SiteHeader, SiteFooter, Breadcrumbs, PageHeader
│  │  ├─ map/        ManhajMap (board + filters + detail panel + mobile)
│  │  ├─ home/       Hero, CoreIdea, MapPreview, DomainCards,
│  │  │              PersonaSelector, JourneyStrip, ResourcesTeaser
│  │  ├─ surah/…     (shared/) PrevNextSurah, RelatedThemes, SurahList
│  │  ├─ resources/  ResourceCard, BookCard, VideoEmbed (lazy), PodcastCard
│  │  ├─ dialogue/   CommentsPanel, QuestionForm, NewsletterCTA
│  │  ├─ search/     SearchExplorer (advanced filters)
│  │  └─ ui/         Button, Badge, Icon, Logo, SectionHeading
│  ├─ data/          manhaj.ts, personas.ts, resources.ts, products.ts,
│  │                 content.ts, navigation.ts
│  └─ lib/           types.ts, utils.ts
├─ tailwind.config.ts             # design tokens
└─ package.json
```

## 4. Routes

| Route | Purpose | State |
|---|---|---|
| `/` | Home — hero, core idea, map preview, personas, journey, resources | **Polished** |
| `/map` | Interactive Manhaj Al-Noor map | **Polished** |
| `/domains/[domainSlug]` | Domain overview + letter groups + surahs | Sample journey |
| `/letters/[letterSlug]` | Letter group + thematic axes + surahs | Sample journey |
| `/surahs/[surahSlug]` | Surah summary, chapters, map position, prev/next, dialogue | Rich for `al-alaq` |
| `/chapters/[chapterSlug]` | Chapter (باب) → list of sections | Sample (al-alaq) |
| `/sections/[sectionSlug]` | Section (فصل) — detailed content + resources + dialogue | Sample (al-alaq) |
| `/resources` `/resources/books` `/resources/videos` `/resources/podcasts` | Library | Scaffold + samples |
| `/about` `/about/manhaj-al-noor` `/about/ummat-al-quran` | Methodology / identity | Scaffold |
| `/author/ali-mohammad-tawfik` | Author page | Scaffold |
| `/search` | Advanced filtered search over surahs + resources | Working |
| `/products` `/products/[productSlug]` | Future product templates | Scaffold |

---

## 5. UX strategy (summary)

**Principle: the map is the product.** Everything is a lens onto one authoritative structure —
3 domains → 7 letter groups → thematic axes → 114 surahs (by revelation order) → chapters →
sections → detailed content → resources.

Four guarantees drive the design (surfaced literally on the home page and structurally
everywhere):

1. **Where am I?** — persistent hierarchy breadcrumbs + a "موقعك في الخريطة" card on content pages.
2. **What does this mean?** — every domain/letter/section/surah carries a short editorial meaning.
3. **How does it connect?** — related themes (sibling surahs / axes) and related resources on every major page.
4. **Where next?** — previous/next surah by revelation order, and a recommended resource.

**Audience pathways.** A persona selector routes each of the eight audiences (visitor,
researcher, student, educator, khateeb, parent, policy researcher, curious/academic) to the
entry point that fits them, instead of dropping everyone on the same generic landing.

**Two reading modes of the map.** Desktop shows an elegant interactive board with a live detail
panel; mobile transforms the same data into stacked, filterable accordions and chip lists.

## 6. Information architecture

```
Home
└─ Manhaj Al-Noor Map
   ├─ الفرد المخلص (Individual)      ن الإخلاص · ق المجد            (nuzul 1–37)
   ├─ الحكم العادل (Governance)      ص القيادة · ط الشدائد · ر الحكمة · ج فصل الخطاب   (38–66)
   └─ الأمة الراشدة (Nation)         م — اقتصاد · نور · ردع · دفاع · سلوك · خارجية      (67–114)
        └─ Surah → Chapter (باب) → Section (فصل) → Detailed content → Resources
Resources · About · Author · Search · Products   (cross-cutting)
```

## 7. Page-by-page UI plan (highlights)

- **Home** — navy hero with map motif; "خريطة موجّهة لا مدوّنة" core-idea band; a full-map
  mosaic preview; three domain cards; persona selector; the 8-step guided-journey strip;
  resources teaser; community CTA.
- **Map** — stat header, toolbar (search + domain pills + Meccan/Medinan toggle + reset), three
  colour-coded domain blocks whose columns are the thematic axes, clickable surah nodes, a
  sticky detail/legend panel, and a "how to read the map" note. Mobile → accordions.
- **Domain / Letter** — coloured header, badges, letter-group cards, surahs grouped by axis,
  related themes, related resources.
- **Surah** — breadcrumb to the root, meta badges, summary, chapters list, prev/next surah,
  a "your position in the map" sidebar, dialogue (comments + question), related resources.
- **Chapter / Section** — reading column, key-ideas call-out, section resources, prev/next
  within the chapter, dialogue, community CTA.

## 8. Component list

Layout: `SiteHeader` · `SiteFooter` · `Breadcrumbs` · `PageHeader`
Map: `ManhajMap` (with internal `SurahNode`, `DetailPanel`, `Toolbar`)
Home: `Hero` · `CoreIdea` · `MapPreview` · `DomainCards` · `PersonaSelector` · `JourneyStrip` · `ResourcesTeaser`
Shared: `SurahList` · `PrevNextSurah` · `RelatedThemes` · `RelatedResources`
Resources: `ResourceCard` · `BookCard` · `VideoEmbed` (lazy YouTube) · `PodcastCard`
Dialogue: `CommentsPanel` · `QuestionForm` · `NewsletterCTA`
Search: `SearchExplorer`
UI primitives: `Button` · `Badge` · `Icon` (inline set) · `Logo` / `LogoMark` · `SectionHeading` · `PatternDivider`

## 9. Data model

Defined in `src/lib/types.ts`, populated in `src/data/*`.

- `Domain` → `LetterGroup` → `MapSection` → `Surah` (all 114, with `nuzul`, `mushaf`,
  `nameAr/En`, `revelation`, `ayah`, `themeAr/En`, and computed domain/letter/section).
- `Bab` (chapter) → `Fasl` (section) — deep content (sample: Al-Alaq).
- `Resource` union: `Book | Media | Podcast | Writing | EducationalKit`.
- `Persona`, `Product`, `Crumb`.

Lookups & relationships (in `manhaj.ts`): `getDomain/getLetter/getSection`,
`getSurahBySlug/ByNuzul`, `surahsByDomain/Letter/Section`, `prevSurah/nextSurah`, etc. The
map ranges are the single source of truth — every surah is classified from its `nuzul` number,
so extending content never desynchronizes the map.

**Accuracy note:** the 114 surahs use the standard Egyptian chronological (nuzul) order, which
was cross-checked against the map's anchor cells (1 العلق … 22 الإخلاص, 23 النجم, 38 ص, 45 طه,
50 الإسراء, 58 سبأ, 67 الذاريات, 96 الرعد, 111 الفتح, 114 النصر — all matched).

---

## 10. Content still to be supplied

- **Per-surah map micro-themes** — `THEME_OVERRIDES` in `manhaj.ts` has a verified subset; the
  remaining cells' exact labels should be transcribed from the map poster.
- **Deep content** for surahs beyond Al-Alaq (chapters/sections/detailed text) in `content.ts`.
- **Real YouTube video IDs** — replace `PLACEHOLDER…` in `resources.ts` (`CHANNEL` config is set
  to your channel `UCsnGggxTgpyi6FePbKM2Z8A`).
- **Podcast RSS feed** — replace the placeholder in `PODCAST_FEED`.
- **Book PDFs & covers**, author biography, and article/paper bodies.
- **Backend wiring** for comments, the question form, and the newsletter (currently front-end demos).
- **Final brand assets** — logo file, exact hex values, and font licensing to replace the
  placeholder tokens in `tailwind.config.ts` and `src/components/ui/Logo.tsx`.

## 11. Design tokens (placeholder identity)

Deep **navy** (authority) · warm **gold** (emphasis/hierarchy) · **ivory/parchment** (surface) ·
refined **emerald green** (living knowledge). Domains are colour-coded emerald / navy / gold.
Subtle 8-point geometric texture is used only as a light background accent. All tokens live in
`tailwind.config.ts` and are easy to retune once the brand-identity PDF is finalized.

## 12. Accessibility & RTL

- `dir="rtl"`, Arabic-first, with an English-ready data layer (`titleEn`, `nameEn`, …).
- Semantic landmarks, skip link, labelled controls, keyboard-focusable nav and map nodes,
  visible focus rings, `aria-current` breadcrumbs.
- Lazy video embeds (no YouTube player or third-party cookies until the user clicks).
```
