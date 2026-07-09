import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** The disjointed Qur'anic letters (الحروف المقطعة) shown on the emblem. */
const MUQATTAAT = [
  "الم",
  "المص",
  "الر",
  "المر",
  "كهيعص",
  "طه",
  "طسم",
  "طس",
  "يس",
  "ص",
  "حم",
  "عسق",
  "ق",
  "ن",
];

/**
 * Central emblem of the Manhaj Al-Noor poster: a navy medallion carrying
 * the disjointed letters around the gold book-of-light mark, with the
 * author's name beneath.
 */
export function MapEmblem({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-navy-900 texture-navy ring-1 ring-gold-500/40 sm:h-52 sm:w-52">
        {/* disjointed letters, faint, filling the medallion */}
        <div
          className="absolute inset-3 flex flex-wrap content-center items-center justify-center gap-x-2 gap-y-1 text-center leading-none"
          aria-hidden="true"
        >
          {MUQATTAAT.map((l, i) => (
            <span
              key={l}
              className={cn(
                "font-display font-bold text-gold-300/35",
                i % 3 === 0 ? "text-sm" : "text-xs"
              )}
            >
              {l}
            </span>
          ))}
        </div>
        {/* central mark on a small disc so it reads clearly */}
        <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-navy-950/70 sm:h-24 sm:w-24">
          <LogoMark className="h-14 w-14 sm:h-16 sm:w-16" />
        </span>
      </div>

      <div className="rounded-xl bg-navy-900 px-6 py-2.5 text-center shadow-card">
        <span className="wordmark text-lg font-bold text-gold-300">
          علي محمد توفيق
        </span>
      </div>
    </div>
  );
}
