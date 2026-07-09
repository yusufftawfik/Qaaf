"use client";

import * as React from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Community / newsletter call-to-action (front-end demo).
 */
export function NewsletterCTA() {
  const [done, setDone] = React.useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-navy-900 texture-navy px-6 py-12 text-center sm:px-12">
      <div className="mx-auto max-w-xl">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
          <Icon name="mail" className="h-6 w-6" />
        </span>
        <h2 className="wordmark text-2xl font-bold text-parchment-50 sm:text-3xl">
          انضمّ إلى مجتمع أمة القرآن
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-parchment-200/80">
          رسالة دورية توجّهك في المنهاج: محطة جديدة كل أسبوع، ومصادر مختارة،
          وأسئلة للتأمل.
        </p>

        {done ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600/15 px-4 py-3 text-sm text-emerald-400">
            <Icon name="sparkle" className="h-4 w-4" />
            تم اشتراكك — أهلًا بك في الرحلة.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              required
              type="email"
              placeholder="بريدك الإلكتروني"
              aria-label="البريد الإلكتروني"
              className="flex-1 rounded-xl border border-parchment-50/20 bg-navy-800/60 px-4 py-3 text-sm text-parchment-50 placeholder:text-parchment-200/50 focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              اشترك
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-parchment-200/50">
          نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </div>
    </section>
  );
}
