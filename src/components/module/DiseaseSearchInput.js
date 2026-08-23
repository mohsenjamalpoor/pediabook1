"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";

function DiseaseSearchInput({
  searchIndex,
  categoriesBySlug,
  placeholder = "نام بیماری را وارد کنید… مثلاً کروپ، آسم، زردی نوزادی",
  autoFocus = false,
  maxResults = 8,
  id,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative w-full max-w-md">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-paper px-4 py-3.5 shadow-xl transition ${
          focused ? "border-teal-400 ring-2 ring-teal-100" : "border-[#e4dcc8]"
        }`}
      >
        <LuSearch className="h-4.5 w-4.5 shrink-0 text-teal-700" />
        <input
          id={id}
          placeholder={placeholder}
          className="w-full min-w-0 flex-1 bg-transparent text-[13.5px] text-[#16231f] placeholder:text-[#6b675c] focus:outline-none"
        />
      </div>
    </div>
  );
}

export default DiseaseSearchInput;
