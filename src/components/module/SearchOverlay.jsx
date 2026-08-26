"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { LuSearch, LuX, LuFileText } from "react-icons/lu";
import { colorTokens } from "@/core/utils/categoryMeta";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

const MAX_SUGGESTIONS = 8;
const MAX_RESULTS = 12;

export default function SearchOverlay({
  open,
  onClose,
  searchIndex,
  categoriesBySlug,
}) {
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Reset the query whenever the overlay opens/closes, then reset the
  // highlighted result whenever the query itself changes — both resolved
  // during render (no setState-in-effect) per React's recommended pattern.
  const [query, setQuery] = useResetOnChange(open, () => "");
  const [activeIdx, setActiveIdx] = useResetOnChange(query, () => 0);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "summary", weight: 0.25 },
          { name: "tags", weight: 0.15 },
          { name: "body", weight: 0.1 },
        ],
        threshold: 0.32,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [searchIndex],
  );

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) return searchIndex.slice(0, MAX_SUGGESTIONS);
    return fuse.search(trimmedQuery, { limit: MAX_RESULTS }).map((r) => r.item);
  }, [trimmedQuery, fuse, searchIndex]);

  // Purely imperative: focus the input shortly after the overlay opens.
  // No setState here, so this is a legitimate effect (not a render-time concern).
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Keep the highlighted item visible as the user navigates with the keyboard.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  useEffect(() => {
    if (!open) return;

    function handleKey(e) {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setActiveIdx((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIdx((i) => Math.max(i - 1, 0));
          break;
        case "Enter": {
          const target = results[activeIdx];
          if (!target) break;
          e.preventDefault();
          router.push(`/topic/${target.slug}`);
          onClose();
          break;
        }
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, results, activeIdx, setActiveIdx, router, onClose]);

  if (!open) return null;

  const activeResult = results[activeIdx];
  const activeOptionId = activeResult
    ? `search-option-${activeResult.slug}`
    : undefined;

  function goTo(slug) {
    router.push(`/topic/${slug}`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-paper-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="جستجو در کتاب"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <LuSearch
            className="h-5 w-5 shrink-0 text-ink-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی بیماری، دارو یا علامت بالینی…"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results-list"
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جستجو"
            className="shrink-0 rounded-full p-1 text-ink-muted transition hover:bg-paper-soft hover:text-ink"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>

        <div className="chart-scroll max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-muted">
              نتیجه‌ای برای «{trimmedQuery}» یافت نشد.
            </p>
          ) : (
            <ul id="search-results-list" role="listbox" ref={listRef}>
              {!trimmedQuery && (
                <li className="px-3 pb-1.5 pt-1 text-[11px] font-medium text-ink-muted">
                  پیشنهادی
                </li>
              )}
              {results.map((r, i) => {
                const cat = categoriesBySlug[r.category];
                const tokens = colorTokens(cat?.color);
                const isActive = i === activeIdx;
                return (
                  <li key={r.slug} role="presentation">
                    <button
                      type="button"
                      id={`search-option-${r.slug}`}
                      role="option"
                      aria-selected={isActive}
                      data-idx={i}
                      onClick={() => goTo(r.slug)}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-right transition ${
                        isActive ? "bg-paper-soft" : ""
                      }`}
                    >
                      <span
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tokens.bgSoft}`}
                        aria-hidden="true"
                      >
                        <LuFileText className={`h-3.5 w-3.5 ${tokens.text}`} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {r.title}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          {cat?.title} — {r.summary}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-paper-soft/60 px-4 py-2 text-[11px] text-ink-muted">
          <span>Enter برای باز کردن · ↑↓ برای جابه‌جایی</span>
          <span>Esc برای بستن</span>
        </div>
      </div>
    </div>
  );
}
