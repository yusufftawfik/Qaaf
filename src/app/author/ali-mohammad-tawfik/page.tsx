import type { Metadata } from "next";
import { BOOKS, WRITINGS, CHANNEL } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookCard } from "@/components/resources/BookCard";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "علي محمد توفيق",
  description: "المؤلّف علي محمد توفيق وأعماله في التدبّر والبناء الحضاري.",
};

export default function AuthorPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المؤلّف" }]}
        eyebrow="المؤلّف"
        title="علي محمد توفيق"
        titleEn="Ali Mohammad Tawfik"
        description="باحث في التدبّر القرآني وربطه ببناء الإنسان والحكم والمجتمع والتعليم والحضارة."
      />
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside>
            <div className="card sticky top-24 p-6 text-center">
              <span className="wordmark mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-navy-900 text-3xl font-bold text-gold-400">
                ع ت
              </span>
              <h2 className="mt-4 font-bold text-navy-900">علي محمد توفيق</h2>
              <p className="text-sm text-ink-faint">صاحب منهاج النور</p>
              <div className="mt-5 space-y-2">
                <a
                  href="https://developbyquran.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-parchment-200 py-2 text-sm text-navy-800 transition-colors hover:border-gold-400"
                >
                  <Icon name="globe" className="h-4 w-4" />
                  الموقع السابق
                  <Icon name="external" className="h-3.5 w-3.5 opacity-70" />
                </a>
                <a
                  href={CHANNEL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-parchment-200 py-2 text-sm text-navy-800 transition-colors hover:border-gold-400"
                >
                  <Icon name="play" className="h-4 w-4 text-gold-500" />
                  قناة كنوز النور
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-navy-900">نبذة</h2>
              <div className="space-y-4 text-[15px] leading-loose text-ink-soft">
                <p>
                  كرّس الأستاذ علي محمد توفيق جهده لقراءة القرآن الكريم بوصفه منهجًا
                  متكاملًا لبناء الإنسان والعمران، عبر تتبّع ترتيب النزول واستخلاص
                  المحاور الكبرى التي تنتظم فيها السور.
                </p>
                <p>
                  (نبذة تفصيلية قيد الإعداد — يُستكمل هذا القسم بالسيرة والمنشورات
                  والمحاضرات من الأرشيف.)
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-navy-900">مؤلفاته</h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {BOOKS.map((b) => (
                  <BookCard key={b.slug} book={b} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-navy-900">مقالات وأبحاث</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {WRITINGS.map((w) => (
                  <ResourceCard key={w.slug} resource={w} />
                ))}
              </div>
            </section>

            <div>
              <Button href="/about/ummat-al-quran" variant="outline" iconRight="arrow-left">
                عن منصّة أمة القرآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
