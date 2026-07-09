import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <LogoMark className="h-16 w-16 opacity-90" />
      <p className="mt-6 wordmark text-6xl font-bold text-navy-900">٤٠٤</p>
      <h1 className="mt-2 text-xl font-bold text-navy-900">
        هذه المحطة ليست على الخريطة
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        قد يكون الرابط قديمًا أو المحتوى قيد الإعداد. عُد إلى الخريطة لتتابع رحلتك في
        منهاج النور.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/map" variant="gold" iconRight="arrow-left">
          إلى الخريطة
        </Button>
        <Button href="/" variant="outline">
          الصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
}
