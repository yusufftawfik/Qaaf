import Link from "next/link";
import type { Surah } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

/**
 * "Previous / next surah" relationship by revelation order.
 * In RTL, "previous" (earlier nuzul) sits on the right.
 */
export function PrevNextSurah({
  prev,
  next,
}: {
  prev?: Surah;
  next?: Surah;
}) {
  return (
    <nav aria-label="السورة السابقة والتالية" className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/surahs/${prev.slug}`}
          className="card-interactive flex items-center gap-3 p-4"
        >
          <Icon name="arrow-right" className="h-5 w-5 shrink-0 text-gold-600" />
          <span className="min-w-0">
            <span className="block text-xs text-ink-faint">السابقة · نزول {prev.nuzul}</span>
            <span className="block truncate font-semibold text-navy-900">
              سورة {prev.nameAr}
            </span>
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && (
        <Link
          href={`/surahs/${next.slug}`}
          className="card-interactive flex items-center justify-end gap-3 p-4 text-left"
        >
          <span className="min-w-0">
            <span className="block text-xs text-ink-faint">التالية · نزول {next.nuzul}</span>
            <span className="block truncate font-semibold text-navy-900">
              سورة {next.nameAr}
            </span>
          </span>
          <Icon name="arrow-left" className="h-5 w-5 shrink-0 text-gold-600" />
        </Link>
      )}
    </nav>
  );
}
