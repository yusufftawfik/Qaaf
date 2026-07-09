import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ThemeChip {
  label: string;
  href: string;
  tone?: "navy" | "gold" | "emerald";
}

const TONES = {
  navy: "border-navy-800/15 hover:border-navy-700 hover:bg-navy-800/5",
  gold: "border-gold-400/40 hover:border-gold-500 hover:bg-gold-500/5",
  emerald: "border-emerald-600/25 hover:border-emerald-600 hover:bg-emerald-600/5",
};

export function RelatedThemes({
  title = "محاور ذات صلة",
  chips,
  className,
}: {
  title?: string;
  chips: ThemeChip[];
  className?: string;
}) {
  if (!chips.length) return null;
  return (
    <section className={className} aria-label={title}>
      <h3 className="eyebrow mb-3">
        <span className="h-px w-6 bg-gold-500" />
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Link
            key={chip.href + chip.label}
            href={chip.href}
            className={cn(
              "rounded-full border bg-white/60 px-4 py-1.5 text-sm text-navy-800 transition-colors",
              TONES[chip.tone ?? "navy"]
            )}
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
