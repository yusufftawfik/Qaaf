import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import type { Product } from "@/lib/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "المنتجات",
  description: "منتجات مستقبلية داخل منصّة أمة القرآن.",
};

function statusBadge(status: Product["status"]) {
  if (status === "live") return <Badge tone="emerald">متاح</Badge>;
  if (status === "beta") return <Badge tone="gold">تجريبي</Badge>;
  return <Badge tone="neutral">قريبًا</Badge>;
}

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المنتجات" }]}
        eyebrow="داخل المنصّة"
        title="منتجات أمة القرآن"
        description="أدوات قادمة تبني على الخريطة نفسها — قوالب جاهزة للتوسّع مستقبلًا."
      />
      <div className="container-page py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="card-interactive group flex flex-col p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-parchment-50">
                  <Icon name={p.iconKey as IconName} className="h-6 w-6" />
                </span>
                {statusBadge(p.status)}
              </div>
              <h2 className="text-xl font-bold text-navy-900 group-hover:text-gold-700">
                {p.titleAr}
              </h2>
              <p className="text-sm text-gold-700">{p.titleEn}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {p.taglineAr}
              </p>
              <span className="mt-5 flex items-center gap-1 text-sm font-semibold text-navy-800 group-hover:text-gold-700">
                التفاصيل
                <Icon name="arrow-left" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
