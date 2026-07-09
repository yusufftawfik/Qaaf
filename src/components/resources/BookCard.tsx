import type { Book, ColorKey } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const COVER: Record<ColorKey, string> = {
  navy: "from-navy-800 to-navy-950",
  emerald: "from-emerald-700 to-emerald-800",
  gold: "from-gold-600 to-gold-700",
};

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="card-interactive flex flex-col overflow-hidden">
      <div
        className={`relative flex aspect-[3/2] items-center justify-center bg-gradient-to-br ${
          COVER[book.coverColor ?? "navy"]
        } texture-navy p-6`}
      >
        <span className="absolute inset-y-0 right-0 w-1.5 bg-gold-500/70" />
        <div className="text-center">
          <Icon name="book" className="mx-auto mb-3 h-8 w-8 text-gold-300" />
          <h3 className="wordmark text-lg font-bold leading-snug text-parchment-50 clamp-3">
            {book.titleAr}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-ink-faint">{book.author}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft clamp-3">
          {book.descriptionAr}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {book.pages && (
            <span className="text-xs text-ink-faint">{book.pages} صفحة</span>
          )}
          <Button
            href={book.downloadUrl ?? "#"}
            size="sm"
            variant="gold"
            icon="download"
          >
            تحميل PDF
          </Button>
        </div>
      </div>
    </article>
  );
}
