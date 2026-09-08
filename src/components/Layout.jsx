"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX, LuStethoscope } from "react-icons/lu";
import Sidebar from "./Sidebar";

import { getCategoriesWithTopics } from "@/lib/data";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

export default function Layout({ children, activeCategory, activeTopicSlug }) {
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useResetOnChange(pathname, () => false);

  const categoriesWithTopics = getCategoriesWithTopics();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="rounded-lg p-2 text-ink-soft hover:bg-paper-soft lg:hidden"
            aria-label="باز کردن فهرست"
          >
            <LuMenu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-800 text-paper-card shadow-tab">
              <LuStethoscope className="h-4.5 w-4.5" strokeWidth={1.8} />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[13.5px] font-extrabold leading-4 text-ink">
                کتاب کاربردی اطفال
              </span>
              <span className="block text-[11px] leading-4 text-ink-muted">
                بیماری‌های شایع و اورژانس‌های کودکان
              </span>
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[272px_1fr] lg:gap-10 lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <Sidebar
              categoriesWithTopics={categoriesWithTopics}
              activeCategory={activeCategory}
              activeTopicSlug={activeTopicSlug}
            />
          </div>
        </aside>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 w-[86%] max-w-xs overflow-y-auto bg-paper px-4 py-4 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold text-ink">فهرست مطالب</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-1.5 text-ink-muted hover:bg-paper-soft"
                  aria-label="بستن فهرست"
                >
                  <LuX className="h-4.5 w-4.5" />
                </button>
              </div>
              <Sidebar
                categoriesWithTopics={categoriesWithTopics}
                activeCategory={activeCategory}
                activeTopicSlug={activeTopicSlug}
                onNavigate={() => setDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="min-w-0">{children}</main>
      </div>

      <footer className="border-t border-line py-8 text-center text-xs text-ink-muted">
        این محتوا صرفاً ابزار آموزشی برای فراگیران پزشکان عمومی/رزیدنت های اطفال
        است و جایگزین قضاوت بالینی و منابع مرجع نیست.
      </footer>
    </div>
  );
}
