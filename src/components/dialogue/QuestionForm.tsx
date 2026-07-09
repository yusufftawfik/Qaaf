"use client";

import * as React from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

/**
 * "Ask a question" form (front-end demo — no submission backend yet).
 */
export function QuestionForm() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <section className="card flex flex-col items-center gap-2 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/12 text-emerald-700">
          <Icon name="sparkle" className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-bold text-navy-900">وصل سؤالك</h3>
        <p className="text-sm text-ink-soft">
          شكرًا لك. سنراجع سؤالك ونعمل على إضافته إلى مادة المنهاج.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setSent(false)}>
          طرح سؤال آخر
        </Button>
      </section>
    );
  }

  return (
    <section aria-label="اطرح سؤالًا" className="card p-6">
      <div className="mb-5 flex items-center gap-2">
        <Icon name="quote" className="h-5 w-5 text-gold-600" />
        <h3 className="text-lg font-bold text-navy-900">اطرح سؤالًا على المنهاج</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="space-y-3"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="الاسم"
            aria-label="الاسم"
            className="rounded-xl border border-parchment-200 bg-white/70 p-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="البريد الإلكتروني"
            aria-label="البريد الإلكتروني"
            className="rounded-xl border border-parchment-200 bg-white/70 p-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
          />
        </div>
        <textarea
          required
          rows={4}
          placeholder="اكتب سؤالك هنا…"
          aria-label="السؤال"
          className="w-full resize-y rounded-xl border border-parchment-200 bg-white/70 p-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary" iconRight="arrow-left">
            إرسال السؤال
          </Button>
        </div>
      </form>
    </section>
  );
}
