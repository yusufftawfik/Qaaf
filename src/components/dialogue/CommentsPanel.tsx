"use client";

import * as React from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

interface Comment {
  id: number;
  author: string;
  body: string;
  when: string;
}

const SEED: Comment[] = [
  {
    id: 1,
    author: "قارئ",
    body: "ربط البداية بـ«اقرأ» مع بناء الفرد المخلص فكرة عميقة — غيّرت طريقة قراءتي للترتيب.",
    when: "قبل يومين",
  },
  {
    id: 2,
    author: "طالبة علم",
    body: "هل يمكن إضافة إحالات للمصادر في نهاية كل فصل؟",
    when: "قبل أسبوع",
  },
];

/**
 * Discussion panel (front-end demo — comments live in local state only;
 * wire to a real backend/moderation service before launch).
 */
export function CommentsPanel() {
  const [comments, setComments] = React.useState<Comment[]>(SEED);
  const [body, setBody] = React.useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setComments((c) => [
      { id: Date.now(), author: "أنت", body: body.trim(), when: "الآن" },
      ...c,
    ]);
    setBody("");
  }

  return (
    <section aria-label="النقاش" className="card p-6">
      <div className="mb-5 flex items-center gap-2">
        <Icon name="message" className="h-5 w-5 text-gold-600" />
        <h3 className="text-lg font-bold text-navy-900">النقاش والحوار</h3>
        <span className="text-sm text-ink-faint">({comments.length})</span>
      </div>

      <form onSubmit={submit} className="mb-6">
        <label htmlFor="comment" className="sr-only">
          أضف تعليقًا
        </label>
        <textarea
          id="comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="شارك تأمّلك أو سؤالك حول هذا المحور…"
          className="w-full resize-y rounded-xl border border-parchment-200 bg-white/70 p-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" size="sm" variant="primary" disabled={!body.trim()}>
            نشر التعليق
          </Button>
        </div>
      </form>

      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800/8 text-sm font-semibold text-navy-700">
              {c.author.charAt(0)}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-navy-900">{c.author}</span>
                <span className="text-xs text-ink-faint">{c.when}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
