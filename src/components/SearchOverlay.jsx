"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { LuSearch, LuX, LuFileText } from "react-icons/lu";
import { colorTokens } from "./categoryMeta";
import { useResetOnChange } from "@/core/utils/useResetOnChange";

export default function SearchOverlay({ open, onClose, searchIndex, categoriesBySlug }) {
  const router = useRouter();
  const inputRef = useRef(null);
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
    [searchIndex]
  );

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8);
    return fuse.search(query, { limit: 12 }).map((r) => r.item);
  }, [query, fuse, searchIndex]);

  // Purely imperative: focus the input shortly after the overlay opens.
  // No setState here, so this is a legitimate effect (not a render-time concern).
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[activeIdx]) {
        router.push(`/topic/${results[activeIdx].slug}`);
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, results, activeIdx, setActiveIdx, router, onClose]);

  if (!open) return null;

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
          <LuSearch className="h-5 w-5 shrink-0 text-ink-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی بیماری، دارو یا علامت بالینی…"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
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
              نتیجه‌ای برای «{query}» یافت نشد.
            </p>
          ) : (
            <ul>
              {results.map((r, i) => {
                const cat = categoriesBySlug[r.category];
                const tokens = colorTokens(cat?.color);
                return (
                  <li key={r.slug}>
                    <button
                      onClick={() => {
                        router.push(`/topic/${r.slug}`);
                        onClose();
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-right transition ${
                        i === activeIdx ? "bg-paper-soft" : ""
                      }`}
                    >
                      <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tokens.bgSoft}`}>
                        <LuFileText className={`h-3.5 w-3.5 ${tokens.text}`} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">{r.title}</span>
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
