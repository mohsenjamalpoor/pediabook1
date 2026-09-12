"use client";

import {
  getBilirubinThresholds,
  NEUROTOXICITY_RISK_FACTORS,
} from "@/lib/bilirubinThresholds";
import { formatDecimal1 } from "@/lib/formatDecimal1";
import { useMemo, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuCircleCheck, LuDroplet, LuTriangleAlert } from "react-icons/lu";

const GA_OPTIONS = [35, 36, 37, 38, 39, 40];

function NeonatalBilirubinAssessment() {
  const [gestationalAge, setGestationalAge] = useState(38);
  const [ageMode, setAgeMode] = useState("hours"); // "hours" | "days"
  const [ageHoursInput, setAgeHoursInput] = useState(24);
  const [ageDaysInput, setAgeDaysInput] = useState(1);
  const [ageDaysHoursInput, setAgeDaysHoursInput] = useState(0);
  const [tsb, setTsb] = useState(8);
  const [riskFactors, setRiskFactors] = useState({});

  const ageHours =
    ageMode === "hours"
      ? Number(ageHoursInput) || 0
      : (Number(ageDaysInput) || 0) * 24 + (Number(ageDaysHoursInput) || 0);

  const hasAnyRiskFactor = Object.values(riskFactors).some(Boolean);

  const thresholds = useMemo(
    () =>
      getBilirubinThresholds({
        gestationalAgeWeeks: gestationalAge,
        ageHours,
        hasRiskFactor: hasAnyRiskFactor,
      }),
    [gestationalAge, ageHours, hasAnyRiskFactor],
  );

  const days = Math.floor(ageHours / 24);
  const hoursRemainder = Math.round(ageHours % 24);

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
      <div className="mb-5">
        <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
          سن در زمان اندازه‌گیری
        </p>
        <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl border border-line bg-paper-card p-1">
          <button
            onClick={() => setAgeMode("hours")}
            className={`rounded-lg py-2 text-[12.5px] font-semibold transition ${
              ageMode === "hours"
                ? "bg-teal-800 text-paper-card"
                : "text-ink-soft"
            }`}
          >
            ساعت
          </button>
          <button
            onClick={() => setAgeMode("days")}
            className={`rounded-lg py-2 text-[12.5px] font-semibold transition ${
              ageMode === "days"
                ? "bg-teal-800 text-paper-card"
                : "text-ink-soft"
            }`}
          >
            روز + ساعت
          </button>
        </div>
        {ageMode === "hours" ? (
          <div>
            <input
              type="number"
              min="0"
              max="336"
              value={ageHoursInput}
              onChange={(e) => setAgeHoursInput(e.target.value)}
              className="w-full max-w-40 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-ink-muted">
              ۰ تا ۳۳۶ ساعت (۱۴ روز)
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="14"
              value={ageDaysInput}
              onChange={(e) => setAgeDaysInput(e.target.value)}
              className="w-20 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none"
            />
            <span className="text-[12px] text-ink-muted">روز</span>
            <input
              type="number"
              min="0"
              max="23"
              value={ageDaysHoursInput}
              onChange={(e) => setAgeDaysHoursInput(e.target.value)}
              className="w-20 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none"
            />
            <span className="text-[12px] text-ink-muted">ساعت</span>
          </div>
        )}
        <p className="mt-1.5 text-[11px] text-ink-muted">
          معادل: {days} روز و {hoursRemainder} ساعت ({formatDecimal1(ageHours)}{" "}
          ساعت)
        </p>
      </div>
      {/* TSB */}
      <div className="mb-5">
        <label
          className="mb-2 block text-[12.5px] font-medium text-ink-soft"
          htmlFor="bili-tsb"
        >
          بیلی‌روبین توتال سرم — TSB (mg/dL)
        </label>
        <input
          id="bili-tsb"
          type="number"
          step="0.1"
          min="0"
          value={tsb}
          onChange={(e) => setTsb(e.target.value)}
          className="w-full max-w-40 rounded-lg border border-line bg-paper-card px-3 py-2 text-[16px] font-bold tnum text-teal-800 focus:outline-none"
        />
        <p className="mt-1.5 text-[11px] italic text-ink-muted">
          از TSB استفاده کنید — بیلی‌روبین مستقیم/کنژوگه کم نشود.
        </p>
      </div>
      {/* risk factors */}
      <div className="mb-5 rounded-xl border border-line bg-paper-card p-4">
        <p className="mb-3 flex  items-center gap-2 text-[13px] font-bold text-ink">
          <IoAlertCircleOutline className="h-4 w-4 shrink-0 text-clay-700" />
          <span>فاکتورهای خطر نوروتوکسیسیتی</span>
        </p>
        <div className="space-y-2.5">
          {NEUROTOXICITY_RISK_FACTORS.map((rf) => (
            <label
              key={rf.id}
              className="flex cursor-pointer items-start gap-2.5"
            >
              <input
                type="checkbox"
                checked={Boolean(riskFactors[rf.id])}
                onChange={(e) =>
                  setRiskFactors((prev) => ({
                    ...prev,
                    [rf.id]: e.target.checked,
                  }))
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-teal-700"
              />
              <span className="text-[13px] leading-5 text-ink-soft">
                {rf.label}
              </span>
            </label>
          ))}
        </div>
        <div
          className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium ${
            thresholds.effectiveRiskFactor
              ? "border-clay-200 bg-clay-50 text-clay-800"
              : "border-teal-200 bg-teal-50 text-teal-800"
          }`}
        >
          {thresholds.effectiveRiskFactor ? (
            <LuTriangleAlert className="h-4 w-4 shrink-0" />
          ) : (
            <LuCircleCheck className="h-4 w-4 shrink-0" />
          )}
          {thresholds.effectiveRiskFactor
            ? "استفاده از آستانه‌های ویژه فاکتور خطر (شامل سن حاملگی زیر ۳۸ هفته)"
            : "استفاده از آستانه‌های استاندارد"}
        </div>
      </div>
    </div>
  );
}

export default NeonatalBilirubinAssessment;
