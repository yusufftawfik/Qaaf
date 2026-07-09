import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "gold" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-navy-800 text-parchment-50 hover:bg-navy-700 shadow-card",
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-card font-semibold",
  outline:
    "border border-navy-800/25 text-navy-800 hover:border-gold-400 hover:text-navy-900 bg-white/50",
  ghost: "text-navy-800 hover:bg-navy-800/5",
  light: "border border-parchment-50/30 text-parchment-50 hover:bg-parchment-50/10",
};

const SIZES: Record<Size, string> = {
  sm: "text-sm px-3.5 py-1.5 gap-1.5 rounded-lg",
  md: "text-[15px] px-5 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-7 py-3.5 gap-2.5 rounded-xl",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  /** When provided, renders a Next.js Link instead of a <button>. */
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const inner = (
    <>
      {icon && <Icon name={icon} className="h-[1.1em] w-[1.1em]" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} className="h-[1.1em] w-[1.1em]" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
