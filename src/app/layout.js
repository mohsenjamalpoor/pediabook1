import { Vazirmatn, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/template/header";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "کتاب کاربردی اطفال | بیماری‌های شایع و اورژانس‌های کودکان",
    template: "%s | کتاب کاربردی اطفال",
  },
  description:
    "مرجع بالینی سریع برای فراگیران رزیدنتی و فلوشیپ اطفال: تشخیص، درمان و دوز داروی بیماری‌های شایع و اورژانس‌های کودکان.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#0F6E63",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
