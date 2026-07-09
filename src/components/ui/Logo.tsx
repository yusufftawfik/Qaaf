import { cn } from "@/lib/utils";

/**
 * Ummat Al-Quran mark: an open book (knowledge) crowned by a flame of
 * light (النور). Placeholder rendition of the brand logo — swap for the
 * final asset when available.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="أمة القرآن"
    >
      <defs>
        <linearGradient id="uq-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8D6A6" />
          <stop offset="1" stopColor="#C7A24C" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="#0A1D33" />
      <circle cx="24" cy="24" r="23" fill="none" stroke="#C7A24C" strokeOpacity="0.5" />
      {/* flame of light */}
      <path
        d="M24 9c2.6 3.2 4 5.6 4 8.2A4 4 0 0 1 24 21a4 4 0 0 1-4-3.8c0-2.6 1.4-5 4-8.2z"
        fill="url(#uq-flame)"
      />
      {/* open book */}
      <path
        d="M9 24c4-2.4 8-2.4 15 0 7-2.4 11-2.4 15 0v11c-4-2.4-8-2.4-15 0-7-2.4-11-2.4-15 0z"
        fill="#226B54"
      />
      <path d="M24 24v11" stroke="#0A1D33" strokeWidth="1.4" />
      <path
        d="M12.5 26.5c3-1.4 6-1.4 9 0M12.5 30c3-1.4 6-1.4 9 0M26.5 26.5c3-1.4 6-1.4 9 0M26.5 30c3-1.4 6-1.4 9 0"
        stroke="#4CA184"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  variant = "dark",
  className,
}: {
  /** "dark" = for light backgrounds, "light" = for navy backgrounds. */
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "wordmark text-xl font-bold",
            variant === "light" ? "text-parchment-50" : "text-navy-900"
          )}
        >
          أمة القرآن
        </span>
        <span
          className={cn(
            "mt-1 text-[11px] font-medium tracking-wide",
            variant === "light" ? "text-gold-300" : "text-gold-700"
          )}
        >
          منهاج النور
        </span>
      </span>
    </span>
  );
}
