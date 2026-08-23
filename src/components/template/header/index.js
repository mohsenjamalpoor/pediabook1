"use client";
import Link from "next/link";
import { useState } from "react";
import { LuCommand, LuMenu, LuSearch, LuStethoscope } from "react-icons/lu";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgb(250_247_239/0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-2 text-ink-soft hover:bg-paper-soft lg:hidden"
          aria-label="باز کردن فهرست"
        >
          <LuMenu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-800 text-[#fffdf8] shadow-tab">
            <LuStethoscope className="h-4.5 w-4.5 " strokeWidth={1.8} />
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
        </button>
      </div>
    </header>
  );
}

export default Header;
