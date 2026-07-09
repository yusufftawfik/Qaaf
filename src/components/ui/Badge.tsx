import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "navy" | "gold" | "emerald" | "neutral" | "outline";

const TONES: Record<Tone, string> = {
  navy: "bg-navy-800/8 text-navy-800",
  gold: "bg-gold-500/15 text-gold-700",
  emerald: "bg-emerald-600/12 text-emerald-700",
  neutral: "bg-parchment-200/70 text-ink-soft",
  outline: "border border-navy-800/20 text-ink-soft",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
