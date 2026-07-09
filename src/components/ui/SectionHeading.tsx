import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "start" | "center";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div
        className={cn(
          "max-w-2xl",
          align === "center" && "mx-auto text-center"
        )}
      >
        {eyebrow && (
          <div className={cn("eyebrow mb-3", align === "center" && "justify-center")}>
            <span className="h-px w-6 bg-gold-500" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl text-balance">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PatternDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-gold-500", className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-l from-gold-500 to-transparent" />
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2 L18 8 L22 12 L18 16 L12 22 L6 16 L2 12 L6 8 Z" />
        <path d="M12 7 L15 12 L12 17 L9 12 Z" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-r from-gold-500 to-transparent" />
    </div>
  );
}
