import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { CHANNEL } from "@/data/resources";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-navy-700/40 bg-navy-900 text-parchment-100">
      <div className="texture-navy">
        <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-parchment-200/80">
              خريطة معرفية موجّهة لبناء الإنسان والعمران بترتيب نزول القرآن.
            </p>
            <a
              href={CHANNEL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-parchment-50/20 px-3 py-2 text-sm text-parchment-100 transition-colors hover:border-gold-400"
            >
              <Icon name="play" className="h-4 w-4 text-gold-400" />
              قناة كنوز النور
              <Icon name="external" className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>

          {FOOTER_NAV.map((group) => (
            <div key={group.label}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
                {group.label}
              </h3>
              <ul className="space-y-2.5">
                {group.items?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-parchment-200/80 transition-colors hover:text-parchment-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-parchment-50/10">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-parchment-200/70 sm:flex-row">
            <p>© {new Date().getFullYear()} أمة القرآن — منهاج النور. جميع الحقوق محفوظة.</p>
            <p className="flex items-center gap-1.5">
              أعمال الأستاذ
              <Link href="/author/ali-mohammad-tawfik" className="text-gold-400 hover:underline">
                علي محمد توفيق
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
