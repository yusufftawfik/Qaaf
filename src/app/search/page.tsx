import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchExplorer } from "@/components/search/SearchExplorer";

export const metadata: Metadata = {
  title: "البحث",
  description: "بحث متقدّم في السور والمصادر عبر خريطة منهاج النور.",
};

// Static export friendly: no server-side searchParams. The initial query
// (?q= / ?type=) is read on the client inside <SearchExplorer />.
export default function SearchPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "الرئيسية", href: "/" }, { label: "البحث" }]}
        eyebrow="بحث متقدّم"
        title="ابحث في المنهاج"
        description="ابحث في السور الـ١١٤ وفي المصادر، وصفِّ النتائج حسب المجال والنوع."
      />
      <div className="container-page py-14">
        <SearchExplorer />
      </div>
    </div>
  );
}
