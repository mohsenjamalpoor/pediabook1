"use client";

import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { CategoryIcon, colorTokens } from "./categoryMeta";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

/** Which top-level category should be open, given the currently-active category (which may itself be a nested child slug). */
function resolveOpenParent(
  activeCategory,
  categoriesWithTopics,
  currentOpenParent,
) {
  if (!activeCategory)
    return currentOpenParent || categoriesWithTopics[0]?.slug;
  const direct = categoriesWithTopics.find((c) => c.slug === activeCategory);
  if (direct) return direct.slug;
  const viaChild = categoriesWithTopics.find((c) =>
    c.children?.some((child) => child.slug === activeCategory),
  );
  return viaChild
    ? viaChild.slug
    : currentOpenParent || categoriesWithTopics[0]?.slug;
}

/** Which child (sub-category) should be open, if the active category is a nested child. */
function resolveOpenChild(activeCategory, categoriesWithTopics) {
  const parent = categoriesWithTopics.find((c) =>
    c.children?.some((child) => child.slug === activeCategory),
  );
  return parent ? activeCategory : null;
}

function TopicList({ topics, tokens, activeTopicSlug, onNavigate }) {
  return (
    <ul className="space-y-0.5 py-1.5">
      {topics.map((t) => {
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
  );
}

export default function Sidebar({
  categoriesWithTopics,
  activeCategory,
  activeTopicSlug,
  onNavigate,
}) {
  const [openParent, setOpenParent] = useResetOnChange(
    activeCategory,
    (next, current) => resolveOpenParent(next, categoriesWithTopics, current),
  );
  const [openChild, setOpenChild] = useResetOnChange(activeCategory, () =>
    resolveOpenChild(activeCategory, categoriesWithTopics),
  );

  return (
    <nav
      aria-label="فهرست مطالب"
      className="chart-scroll h-full overflow-y-auto pl-1"
    >
      <ol className="space-y-2">
        {categoriesWithTopics.map((cat) => {
          const tokens = colorTokens(cat.color);
          const isOpen = openParent === cat.slug;
          const hasChildren = Boolean(cat.children?.length);

          return (
            <li
              key={cat.slug}
              className={`overflow-hidden rounded-2xl border bg-paper-card transition-shadow ${
                isOpen ? `${tokens.border} shadow-tab` : "border-line-soft"
              }`}
            >
              <button
                onClick={() => setOpenParent(isOpen ? null : cat.slug)}
                className="flex w-full items-center gap-3 px-3.5 py-3 text-right"
                aria-expanded={isOpen}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tokens.bgSoft}`}
                >
                  <CategoryIcon
                    icon={cat.icon}
                    className={`h-4 w-4 ${tokens.text}`}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-bold text-ink">
                    {cat.title}
                  </span>
                  <span className="block truncate text-[11px] text-ink-muted">
                    {cat.topics.length} سرفصل
                  </span>
                </span>
                <LuChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && hasChildren && (
                <ul className="space-y-1.5 border-t border-line-soft px-2 pb-2 pt-1.5">
                  {cat.children.map((child) => {
                    const childTokens = colorTokens(child.color);
                    const childOpen = openChild === child.slug;
                    return (
                      <li
                        key={child.slug}
                        className={`overflow-hidden rounded-xl border ${
                          childOpen ? childTokens.border : "border-transparent"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setOpenChild(childOpen ? null : child.slug)
                          }
                          className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-right transition ${
                            childOpen
                              ? childTokens.bgSoft
                              : "hover:bg-paper-soft"
                          }`}
                          aria-expanded={childOpen}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${childTokens.dot}`}
                          />
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block truncate text-[13px] font-semibold ${childTokens.text}`}
                            >
                              {child.title}
                            </span>
                          </span>
                          <LuChevronDown
                            className={`h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform ${
                              childOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {childOpen && (
                          <div className="pr-3">
                            <TopicList
                              topics={child.topics}
                              tokens={childTokens}
                              activeTopicSlug={activeTopicSlug}
                              onNavigate={onNavigate}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {isOpen && !hasChildren && (
                <div className="border-t border-line-soft px-2 pb-2">
                  <TopicList
                    topics={cat.topics}
                    tokens={tokens}
                    activeTopicSlug={activeTopicSlug}
                    onNavigate={onNavigate}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
