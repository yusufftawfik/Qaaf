import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchExplorer } from "@/components/search/SearchExplorer";

export const metadata: Metadata = {
  title: "البحث",
  description: "بحث متقدّم في السور والمصادر عبر خريطة منهاج النور.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string };
}) {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "البحث" }]}
        eyebrow="بحث متقدّم"
        title="ابحث في المنهاج"
        description="ابحث في السور الـ١١٤ وفي المصادر، وصفِّ النتائج حسب المجال والنوع."
      />
      <div className="container-page py-14">
        <SearchExplorer
          initialQuery={searchParams.q ?? ""}
          initialType={searchParams.type ?? "all"}
        />
      </div>
    </div>
  );
}
