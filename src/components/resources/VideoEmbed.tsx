"use client";

import * as React from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Lazy YouTube embed: renders a lightweight poster and only injects the
 * iframe on interaction (saves the ~1MB YouTube player on page load and
 * avoids third-party cookies until the user opts in).
 */
export function VideoEmbed({
  youtubeId,
  title,
  className,
}: {
  youtubeId: string;
  title: string;
  className?: string;
}) {
  const [active, setActive] = React.useState(false);
  const isPlaceholder = youtubeId.startsWith("PLACEHOLDER");

  return (
    <div
      className={
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-navy-900 " +
        (className ?? "")
      }
    >
      {active && !isPlaceholder ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          disabled={isPlaceholder}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 texture-navy disabled:cursor-not-allowed"
          aria-label={`تشغيل: ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-glow transition-transform duration-200 group-hover:scale-110">
            <Icon name="play" className="h-7 w-7 translate-x-0.5" />
          </span>
          <span className="max-w-[80%] text-center text-sm font-medium text-parchment-100">
            {title}
          </span>
          {isPlaceholder && (
            <span className="text-xs text-gold-300/80">
              مُعرّف الفيديو غير مُهيّأ بعد
            </span>
          )}
        </button>
      )}
    </div>
  );
}
