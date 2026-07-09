import type { Metadata } from "next";
import { BOOKS } from "@/data/resources";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookCard } from "@/components/resources/BookCard";

export const metadata: Metadata = {
  title: "الكتب و PDF",
  description: "مؤلفات منهاج النور للقراءة والتحميل.",
};

export default function BooksPage() {
  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المصادر", href: "/resources" },
          { label: "الكتب و PDF" },
        ]}
        eyebrow="مكتبة المنهاج"
        title="الكتب و PDF"
        description="حمّل مؤلفات الأستاذ علي محمد توفيق حول منهاج النور وبناء الإنسان والعمران."
      />
      <div className="container-page py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKS.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
