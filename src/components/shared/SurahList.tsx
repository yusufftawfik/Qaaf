import Link from "next/link";
import type { ColorKey, Surah } from "@/lib/types";
import { cn } from "@/lib/utils";

const NUM: Record<ColorKey, string> = {
  emerald: "bg-emerald-600/12 text-emerald-800",
  navy: "bg-navy-800/8 text-navy-800",
  gold: "bg-gold-500/15 text-gold-700",
};

export function SurahList({
  surahs,
  color = "navy",
}: {
  surahs: Surah[];
  color?: ColorKey;
}) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {surahs.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/surahs/${s.slug}`}
            className="card-interactive flex items-center gap-3 p-3"
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums",
                NUM[color]
              )}
            >
              {s.nuzul}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold text-navy-900">
                سورة {s.nameAr}
              </span>
              <span className="block truncate text-xs text-ink-faint">
                {s.themeAr} · {s.revelation === "Meccan" ? "مكية" : "مدنية"}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
