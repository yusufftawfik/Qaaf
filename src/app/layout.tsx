import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Reem_Kufi, Amiri } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/* Body / UI face — modern, highly legible Arabic + Latin */
const sans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/* Display / wordmark face — modern geometric kufi */
const display = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/* Scholarly serif — used sparingly for Qur'anic names / pull quotes */
const serif = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ummat-al-quran.example"),
  title: {
    default: "أمة القرآن — منهاج النور",
    template: "%s | أمة القرآن",
  },
  description:
    "منهاج النور: خريطة معرفية موجّهة لبناء الإنسان والعمران بترتيب نزول القرآن. A guided knowledge platform for building the human being and civilization by the order of Qur'anic revelation.",
  keywords: [
    "منهاج النور",
    "أمة القرآن",
    "ترتيب النزول",
    "علي محمد توفيق",
    "Manhaj Al-Noor",
    "Ummat Al-Quran",
  ],
  openGraph: {
    title: "أمة القرآن — منهاج النور",
    description:
      "خريطة معرفية موجّهة لبناء الإنسان والعمران بترتيب نزول القرآن.",
    type: "website",
    locale: "ar_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${sans.variable} ${display.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh">
        {/* Skip link for keyboard / screen-reader users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-parchment-50"
        >
          تخطَّ إلى المحتوى
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
