"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { LuSearch, LuX, LuArrowLeft } from "react-icons/lu";
import { colorTokens } from "@/core/utils/categoryMeta";

export default function DiseaseSearchInput({
  searchIndex,
  categoriesBySlug,
  placeholder = "نام بیماری را وارد کنید… مثلاً کروپ، آسم، زردی نوزادی",
  autoFocus = false,
  maxResults = 8,
  id,
}) {
  const router = useRouter();
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const reactId = useId();
  const listboxId = `${id ?? reactId}-listbox`;

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  // هر بار نتایج عوض شد، هایلایت کیبورد ریست شود
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  // اسکرول خودکار آیتم هایلایت‌شده به داخل دید
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goToResult(result) {
    if (!result) return;
    setFocused(false);
    setQuery("");
    router.push(`/topic/${result.slug}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setFocused(false);
      return;
    }
    if (!showPanel || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goToResult(results[activeIndex] ?? results[0]);
    }
  }

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
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full min-w-0 flex-1 bg-transparent text-[13.5px] text-ink placeholder:text-ink-muted focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="پاک‌کردن جستجو"
            className="shrink-0 rounded-full p-1 text-ink-muted transition hover:bg-paper-soft hover:text-ink"
          >
            <LuX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          ref={listRef}
          className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-96 overflow-y-auto rounded-2xl border border-line bg-paper-card p-2 shadow-2xl"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] text-ink-muted">
              بیماری‌ای با نام «{query}» پیدا نشد.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {results.map((r, index) => {
                const cat = categoriesBySlug[r.category];
                const tokens = colorTokens(cat?.color);
                const active = index === activeIndex;
                return (
                  <li key={r.slug} data-index={index}>
                    <Link
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={active}
                      href={`/topic/${r.slug}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={(e) => {
                        e.preventDefault();
                        goToResult(r);
                      }}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-right transition ${
                        active ? "bg-paper-soft" : "hover:bg-paper-soft"
                      }`}
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
                      <LuArrowLeft
                        className={`h-3.5 w-3.5 shrink-0 text-ink-muted transition ${
                          active
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
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
