"use client";

import { useState } from "react";
import { LuDroplets } from "react-icons/lu";
import { holidaySegarMaintenance } from "@/core/utils/fluidCalculations";

function fmt(n) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

/**
 * سرم میترننس (Maintenance fluid) calculator — Holliday–Segar formula.
 * Self-contained: give it a weight and it shows daily + hourly rate.
 * Can be dropped into any topic page (dehydration, post-op fluids, DKA, …).
 */
export default function MaintenanceFluidCalculator({
  title = "محاسبه‌گر سرم میترننس (Holliday–Segar)",
}) {
  const [weight, setWeight] = useState("");
  const w = Number(weight);
  const valid = weight !== "" && Number.isFinite(w) && w > 0;
  const result = valid ? holidaySegarMaintenance(w) : null;

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-800 text-paper-card">
          <LuDroplets className="h-4 w-4" />
        </span>
        <h4 className="text-[14.5px] font-bold text-ink">{title}</h4>
      </div>

      <label
        className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
        htmlFor="maintenance-weight"
      >
        وزن بیمار (کیلوگرم)
      </label>
      <input
        id="maintenance-weight"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="مثلاً 18"
        className="mb-4 w-full max-w-[180px] rounded-lg border border-line bg-paper-card px-3 py-2 text-[13.5px] tnum text-ink focus:outline-none"
      />

      {valid ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
            <p className="text-[11.5px] text-ink-muted">حجم روزانه</p>
            <p className="text-lg font-bold tnum text-teal-800">
              {fmt(result.daily)}{" "}
              <span className="text-xs font-normal text-ink-muted">mL/day</span>
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
            <p className="text-[11.5px] text-ink-muted">سرعت ساعتی</p>
            <p className="text-lg font-bold tnum text-teal-800">
              {fmt(result.hourly)}{" "}
              <span className="text-xs font-normal text-ink-muted">mL/hr</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-[12.5px] text-ink-muted">
          وزن را وارد کنید تا سرم میترننس محاسبه شود.
        </p>
      )}

      <p className="mt-3 text-[11px] leading-5 text-ink-muted">
        فرمول: ۱۰ کیلوگرم اول ۱۰۰ mL/kg/day؛ ۱۰ کیلوگرم دوم ۵۰ mL/kg/day؛ هر
        کیلوگرم بالای ۲۰، ۲۰ mL/kg/day.
      </p>
    </div>
  );
}
