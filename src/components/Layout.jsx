"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch, LuMenu, LuX, LuStethoscope, LuCommand } from "react-icons/lu";
import Sidebar from "./Sidebar";
import SearchOverlay from "./SearchOverlay";
import { getCategoriesWithTopics, getSearchIndex, categories } from "@/lib/data";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

const categoriesBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export default function Layout({ children, activeCategory, activeTopicSlug }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useResetOnChange(pathname, () => false);

  const categoriesWithTopics = getCategoriesWithTopics();
  const searchIndex = getSearchIndex();

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

          <button
            onClick={() => setSearchOpen(true)}
            className="mr-auto flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-line bg-paper-card px-3.5 py-2 text-sm text-ink-muted shadow-card transition hover:border-teal-200"
          >
            <LuSearch className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate text-right">جستجو در سرفصل‌ها…</span>
            <span className="hidden shrink-0 items-center gap-0.5 rounded-md border border-line bg-paper-soft px-1.5 py-0.5 text-[10px] text-ink-muted sm:flex">
              <LuCommand className="h-3 w-3" />K
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[272px_1fr] lg:gap-10 lg:py-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)]">
            <Sidebar
              categoriesWithTopics={categoriesWithTopics}
              activeCategory={activeCategory}
              activeTopicSlug={activeTopicSlug}
            />
          </div>
        </aside>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
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
        این محتوا صرفاً ابزار آموزشی برای فراگیران رزیدنتی/فلوشیپ اطفال است و جایگزین قضاوت بالینی و منابع مرجع نیست.
      </footer>

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndex}
        categoriesBySlug={categoriesBySlug}
      />
    </div>
  );
}
