import Link from "next/link";
import { LuFileQuestion } from "react-icons/lu";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center rounded-3xl border border-line bg-paper-card px-6 py-20 text-center shadow-card">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-clay-50">
          <LuFileQuestion className="h-6 w-6 text-clay-700" />
        </span>
        <h1 className="mb-2 text-xl font-extrabold text-ink">این سرفصل در کتاب پیدا نشد</h1>
        <p className="mb-6 max-w-sm text-sm leading-7 text-ink-muted">
          ممکن است آدرس اشتباه باشد یا صفحه جابه‌جا شده باشد. از فهرست مطالب یا جستجو استفاده کنید.
        </p>
        <Link
          href="/"
          className="rounded-xl bg-teal-800 px-5 py-2.5 text-sm font-semibold text-paper-card shadow-tab transition hover:bg-teal-900"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </Layout>
  );
}
