"use client";

import { useState } from "react";
import { LuSyringe } from "react-icons/lu";
import { calculateInsulinDripRate } from "@/core/utils/fluidCalculations";

function fmt(n, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

const PRESETS = {
  standard: {
    label: "استاندارد — ۵۰ واحد در ۵۰۰ سی‌سی",
    units: 50,
    volume: 500,
  },
  concentrated: {
    label: "غلیظ — ۱۰۰ واحد در ۲۵۰ سی‌سی (وزن بالا)",
    units: 100,
    volume: 250,
  },
  custom: { label: "دلخواه", units: null, volume: null },
};

/**
 * محاسبه‌گر سرعت دریپ انسولین.
 *
 * فرمول کلی: غلظت (U/mL) = تعداد واحد ÷ حجم سرم؛ سرعت (mL/hr) = دوز(U/kg/hr) × وزن ÷ غلظت.
 * با رقیق استاندارد (۵۰ واحد در ۵۰۰ سی‌سی، غلظت ۰.۱) و دوز ۰.۱ U/kg/hr، سرعت = وزن (۱ cc/kg/hr).
 * با رقیق غلیظ (۱۰۰ واحد در ۲۵۰ سی‌سی، غلظت ۰.۴) و همان دوز، سرعت = وزن ÷ ۴.
 */
export default function InsulinDripCalculator() {
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState(0.1);
  const [preparation, setPreparation] = useState("standard");
  const [customUnits, setCustomUnits] = useState(100);
  const [customVolume, setCustomVolume] = useState(250);

  const w = Number(weight);
  const valid = weight !== "" && Number.isFinite(w) && w > 0;

  const { units, volume } =
    preparation === "custom"
      ? { units: customUnits, volume: customVolume }
      : {
          units: PRESETS[preparation].units,
          volume: PRESETS[preparation].volume,
        };

  const result = valid
    ? calculateInsulinDripRate({
        weightKg: w,
        doseUPerKgPerHr: dose,
        insulinUnits: units,
        salineVolumeMl: volume,
      })
    : null;

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-paper-card">
          <LuSyringe className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-ink">
            محاسبه‌گر سرعت دریپ انسولین
          </h3>
          <p className="text-[11.5px] text-ink-muted">
            وزن بدهید، رقیق‌سازی را انتخاب کنید، سرعت انفوزیون را بگیرید
          </p>
        </div>
      </div>

      {/* inputs */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="insulin-weight"
          >
            وزن بیمار (کیلوگرم) <span className="text-brick-600">*</span>
          </label>
          <input
            id="insulin-weight"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="مثلاً 40"
            className="w-full rounded-lg border border-line bg-paper-card px-3 py-2 text-[13.5px] tnum text-ink focus:outline-none"
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="insulin-dose"
          >
            دوز انسولین (U/kg/hr) — محدوده ۰.۰۵ تا ۰.۱
          </label>
          <input
            id="insulin-dose"
            type="range"
            min="0.05"
            max="0.1"
            step="0.01"
            value={dose}
            onChange={(e) => setDose(Number(e.target.value))}
            className="w-full accent-teal-700"
          />
          <p className="mt-1 text-[12px] tnum text-teal-800">{dose} U/kg/hr</p>
        </div>
      </div>

      {/* preparation selector */}
      <div className="mb-5">
        <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
          رقیق‌سازی سرم انسولین
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setPreparation(key)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition ${
                preparation === key
                  ? "border-teal-700 bg-teal-800 text-paper-card"
                  : "border-line bg-paper-card text-ink-soft hover:border-teal-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {preparation === "custom" && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-xs">
            <div>
              <label
                className="mb-1 block text-[11.5px] text-ink-muted"
                htmlFor="insulin-custom-units"
              >
                تعداد واحد انسولین
              </label>
              <input
                id="insulin-custom-units"
                type="number"
                min="0"
                value={customUnits}
                onChange={(e) => setCustomUnits(Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-paper-card px-3 py-2 text-[13px] tnum text-ink focus:outline-none"
              />
            </div>
            <div>
              <label
                className="mb-1 block text-[11.5px] text-ink-muted"
                htmlFor="insulin-custom-volume"
              >
                حجم سرم (سی‌سی)
              </label>
              <input
                id="insulin-custom-volume"
                type="number"
                min="0"
                value={customVolume}
                onChange={(e) => setCustomVolume(Number(e.target.value))}
                className="w-full rounded-lg border border-line bg-paper-card px-3 py-2 text-[13px] tnum text-ink focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {!valid ? (
        <p className="rounded-xl border border-dashed border-line bg-paper-card px-4 py-6 text-center text-[13px] text-ink-muted">
          برای مشاهده نتیجه، وزن بیمار را وارد کنید.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
            <p className="text-[11.5px] text-ink-muted">غلظت سرم</p>
            <p className="text-lg font-bold tnum text-ink">
              {fmt(result.concentrationUPerMl, 2)}{" "}
              <span className="text-xs font-normal text-ink-muted">U/mL</span>
            </p>
          </div>
          <div className="rounded-xl border border-line bg-paper-card px-4 py-3 sm:col-span-2">
            <p className="text-[11.5px] text-ink-muted">سرعت انفوزیون</p>
            <p className="text-xl font-bold tnum text-teal-800">
              {fmt(result.rateMlPerHr, 2)}{" "}
              <span className="text-xs font-normal text-ink-muted">mL/hr</span>
            </p>
          </div>
        </div>
      )}

      <p className="mt-4 text-[11px] leading-5 text-ink-muted">
        فرمول: غلظت = واحد ÷ حجم سرم؛ سرعت = دوز × وزن ÷ غلظت. با رقیق استاندارد
        و دوز ۰.۱، سرعت برابر وزن (۱ cc/kg/hr) است؛ با رقیق غلیظ همان دوز، سرعت
        برابر وزن ÷ ۴ می‌شود.
      </p>
    </div>
  );
}
