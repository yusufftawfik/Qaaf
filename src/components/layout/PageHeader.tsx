import * as React from "react";
import type { Crumb } from "@/lib/types";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  titleEn,
  description,
  meta,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  titleEn?: string;
  description?: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <div className="border-b border-parchment-200 bg-parchment-100/50 texture-parchment">
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-5 max-w-3xl">
          {eyebrow && (
            <div className="eyebrow mb-2">
              <span className="h-px w-6 bg-gold-500" />
              {eyebrow}
            </div>
          )}
          <h1 className="wordmark text-3xl font-bold text-navy-900 sm:text-4xl text-balance">
            {title}
          </h1>
          {titleEn && <p className="mt-1 text-gold-700">{titleEn}</p>}
          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
          {meta && <div className="mt-5">{meta}</div>}
        </div>
      </div>
    </div>
  );
}
