import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/data/products";
import type { Product } from "@/lib/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsletterCTA } from "@/components/dialogue/NewsletterCTA";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ productSlug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { productSlug: string };
}): Metadata {
  const product = getProduct(params.productSlug);
  if (!product) return { title: "المنتج غير موجود" };
  return { title: product.titleAr, description: product.taglineAr };
}

function StatusBadge({ status }: { status: Product["status"] }) {
  if (status === "live") return <Badge tone="emerald">متاح الآن</Badge>;
  if (status === "beta") return <Badge tone="gold">نسخة تجريبية</Badge>;
  return <Badge tone="neutral">قريبًا</Badge>;
}

export default function ProductPage({
  params,
}: {
  params: { productSlug: string };
}) {
  const product = getProduct(params.productSlug);
  if (!product) notFound();

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label: product.titleAr },
        ]}
        eyebrow="منتج"
        title={product.titleAr}
        titleEn={product.titleEn}
        description={product.taglineAr}
        meta={<StatusBadge status={product.status} />}
      />

      <div className="container-page max-w-4xl py-14">
        <div className="card flex items-start gap-5 p-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-parchment-50">
            <Icon name={product.iconKey as IconName} className="h-8 w-8 text-gold-400" />
          </span>
          <p className="text-[15px] leading-relaxed text-ink-soft">
            {product.descriptionAr}
          </p>
        </div>

        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-navy-900">أبرز الميزات</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-parchment-200 bg-white/50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-700">
                  <Icon name="sparkle" className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-navy-900">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/products" variant="ghost" icon="arrow-right">
            كل المنتجات
          </Button>
        </div>

        <div className="mt-14">
          <NewsletterCTA />
        </div>
      </div>
    </div>
  );
}
