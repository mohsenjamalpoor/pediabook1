"use client";

import { useState } from "react";
import { LuDroplet } from "react-icons/lu";

const GA_OPTIONS = [35, 36, 37, 38, 39, 40];

function NeonatalBilirubinAssessment() {
  const [gestationalAge, setGestationalAge] = useState(38);
  return (
    <div className="rounded-3xl border border-teal-200 bg-teal-50/30 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-paper-card">
          <LuDroplet className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-ink">
            ارزیابی بیلی‌روبین نوزاد
          </h3>
          <p className="text-[11.5px] text-ink-muted">
            AAP 2022 · سن حاملگی ≥ ۳۵ هفته
          </p>
        </div>
      </div>
      {/* gestational age */}
      <div className="mb-5">
        <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
          سن حاملگی (هفته)
        </p>
        <div className="flex flex-wrap gap-2">
          {GA_OPTIONS.map((ga) => (
            <button
              key={ga}
              onClick={() => setGestationalAge(ga)}
              className={`rounded-full border-2 px-4 py-1.5 text-[13px] font-bold transition ${
                gestationalAge === ga
                  ? "border-teal-700 bg-teal-800 text-paper-card"
                  : "border-line bg-paper-card text-ink-soft hover:border-teal-200"
              }`}
            >
              {ga === 40 ? "≥۴۰" : ga}
            </button>
          ))}
        </div>
      </div>
      {/* age at measurement */}
    </div>
  );
}

export default NeonatalBilirubinAssessment;
