/** Tiny classNames joiner (avoids extra deps). */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

/** URL-safe slug from a Latin transliteration. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Inclusive range test. */
export function inRange(n: number, [start, end]: [number, number]): boolean {
  return n >= start && n <= end;
}

/** Convert Western digits to Arabic-Indic digits for display where wanted. */
const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function toArabicDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
}
