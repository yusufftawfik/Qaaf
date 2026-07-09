import Link from "next/link";
import type { Crumb } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Hierarchy breadcrumbs:
 * Domain → Letter group → Surah → Chapter → Section.
 * Always answers "where am I in Manhaj Al-Noor?".
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="مسار التنقّل" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-soft">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="rounded px-1 py-0.5 transition-colors hover:text-gold-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(last && "font-medium text-navy-900")} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <Icon name="chevron-left" className="h-3.5 w-3.5 text-ink-faint" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
