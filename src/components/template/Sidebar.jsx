"use client";

import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { CategoryIcon, colorTokens } from "@/core/utils/categoryMeta";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

export default function Sidebar({ categoriesWithTopics, activeCategory, activeTopicSlug, onNavigate }) {
  const [openSlug, setOpenSlug] = useResetOnChange(
    activeCategory,
    (nextActiveCategory, currentOpenSlug) =>
      nextActiveCategory || currentOpenSlug || categoriesWithTopics[0]?.slug
  );

  return (
    <nav aria-label="فهرست مطالب" className="chart-scroll h-full overflow-y-auto pl-1">
      <ol className="space-y-2">
        {categoriesWithTopics.map((cat) => {
          const tokens = colorTokens(cat.color);
          const isOpen = openSlug === cat.slug;
          return (
            <li
              key={cat.slug}
              className={`overflow-hidden rounded-2xl border bg-paper-card transition-shadow ${
                isOpen ? `${tokens.border} shadow-tab` : "border-line-soft"
              }`}
            >
              <button
                onClick={() => setOpenSlug(isOpen ? null : cat.slug)}
                className="flex w-full items-center gap-3 px-3.5 py-3 text-right"
                aria-expanded={isOpen}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tokens.bgSoft}`}>
                  <CategoryIcon icon={cat.icon} className={`h-4 w-4 ${tokens.text}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-ink">{cat.title}</span>
                  <span className="block truncate text-[11px] text-ink-muted">{cat.topics.length} سرفصل</span>
                </span>
                <LuChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <ul className="space-y-0.5 border-t border-line-soft px-2 pb-2 pt-1.5">
                  {cat.topics.map((t) => {
                    const active = t.slug === activeTopicSlug;
                    return (
                      <li key={t.slug}>
                        <Link
                          href={`/topic/${t.slug}`}
                          onClick={onNavigate}
                          className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] leading-5 transition ${
                            active
                              ? `${tokens.bgSoft} ${tokens.text} font-bold`
                              : "text-ink-soft hover:bg-paper-soft"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${active ? tokens.dot : "bg-line"}`}
                          />
                          <span className="truncate">{t.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
