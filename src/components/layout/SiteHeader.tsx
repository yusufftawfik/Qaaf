"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRIMARY_NAV } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

function QuickSearch({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search");
        onNavigate?.();
      }}
      className="relative flex items-center"
    >
      <Icon
        name="search"
        className="pointer-events-none absolute right-3 h-4 w-4 text-ink-faint"
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث في المنهاج…"
        aria-label="بحث"
        className="w-full rounded-xl border border-parchment-200 bg-white/70 py-2 pr-9 pl-3 text-sm text-navy-900 placeholder:text-ink-faint focus:border-gold-400 focus:outline-none"
      />
    </form>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-parchment-200/80 bg-parchment-50/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="أمة القرآن — الرئيسية">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقّل الرئيسي">
          {PRIMARY_NAV.map((group) =>
            group.items ? (
              <div key={group.label} className="group relative">
                <button
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium text-navy-800 transition-colors hover:text-gold-700"
                  aria-haspopup="true"
                >
                  {group.label}
                  <Icon name="chevron-down" className="h-3.5 w-3.5 opacity-60" />
                </button>
                <div className="invisible absolute right-0 top-full w-60 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="card overflow-hidden p-1.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-parchment-100"
                      >
                        <span className="text-sm font-medium text-navy-900">
                          {item.label}
                        </span>
                        {item.desc && (
                          <span className="text-xs text-ink-faint">{item.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={group.label}
                href={group.href!}
                className="rounded-lg px-3 py-2 text-[15px] font-medium text-navy-800 transition-colors hover:text-gold-700"
              >
                {group.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden w-52 xl:block">
            <QuickSearch />
          </div>
          <Link
            href="/search"
            aria-label="بحث"
            className="rounded-xl border border-parchment-200 p-2.5 text-navy-800 transition-colors hover:border-gold-400 xl:hidden"
          >
            <Icon name="search" className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileOpen}
            className="rounded-xl border border-parchment-200 p-2.5 text-navy-800 transition-colors hover:border-gold-400 lg:hidden"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-parchment-200 bg-parchment-50 lg:hidden">
          <div className="container-page space-y-1 py-4">
            <div className="pb-3">
              <QuickSearch onNavigate={() => setMobileOpen(false)} />
            </div>
            {PRIMARY_NAV.map((group) =>
              group.items ? (
                <div key={group.label} className="border-b border-parchment-200/60 py-1">
                  <button
                    onClick={() =>
                      setOpenGroup((g) => (g === group.label ? null : group.label))
                    }
                    className="flex w-full items-center justify-between py-2 text-[15px] font-semibold text-navy-900"
                    aria-expanded={openGroup === group.label}
                  >
                    {group.label}
                    <Icon
                      name="chevron-down"
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroup === group.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openGroup === group.label && (
                    <div className="pb-2 pr-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm text-ink-soft hover:text-gold-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={group.label}
                  href={group.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-parchment-200/60 py-3 text-[15px] font-semibold text-navy-900"
                >
                  {group.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
