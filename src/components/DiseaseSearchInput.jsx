"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { LuSearch, LuX, LuArrowLeft } from "react-icons/lu";
import { colorTokens } from "./categoryMeta";

/**
 * Always-visible search box for finding a disease/topic by name.
 * Unlike SearchOverlay (Ctrl/⌘K command palette), this sits inline in the
 * page and shows its result list right underneath the input as the person types.
 */
export default function DiseaseSearchInput({
  searchIndex,
  categoriesBySlug,
  placeholder = "نام بیماری را وارد کنید… مثلاً کروپ، آسم، زردی نوزادی",
  autoFocus = false,
  maxResults = 8,
  id,
}) {
  const wrapRef = useRef(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: "title", weight: 0.55 },
          { name: "tags", weight: 0.2 },
          { name: "summary", weight: 0.15 },
          { name: "body", weight: 0.1 },
        ],
        threshold: 0.32,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [searchIndex],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return fuse.search(q, { limit: maxResults }).map((r) => r.item);
  }, [query, fuse, maxResults]);

  const showPanel = focused && query.trim().length > 0;

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setFocused(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-md">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-paper px-4 py-3.5 shadow-card transition ${
          focused ? "border-teal-400 ring-2 ring-teal-100" : "border-line"
        }`}
      >
        <LuSearch className="h-4.5 w-4.5 shrink-0 text-teal-700" />
        <input
          id={id}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full min-w-0 flex-1 bg-transparent text-[13.5px] text-ink placeholder:text-ink-muted focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="پاک‌کردن جستجو"
            className="shrink-0 rounded-full p-1 text-ink-muted transition hover:bg-paper-soft hover:text-ink"
          >
            <LuX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showPanel && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-96 overflow-y-auto rounded-2xl border border-line bg-paper-card p-2 shadow-2xl">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] text-ink-muted">
              بیماری‌ای با نام «{query}» پیدا نشد.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {results.map((r) => {
                const cat = categoriesBySlug[r.category];
                const tokens = colorTokens(cat?.color);
                return (
                  <li key={r.slug}>
                    <Link
                      href={`/topic/${r.slug}`}
                      onClick={() => setFocused(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-right transition hover:bg-paper-soft"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${tokens.dot}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-semibold text-ink">
                          {r.title}
                        </span>
                        <span className="block truncate text-[11.5px] text-ink-muted">
                          {cat?.title}
                        </span>
                      </span>
                      <LuArrowLeft className="h-3.5 w-3.5 shrink-0 text-ink-muted opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
