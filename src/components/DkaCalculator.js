"use client";

import { useState } from "react";
import {
  LuCalculator,
  LuDroplets,
  LuSyringe,
  LuFlaskConical,
} from "react-icons/lu";
import { calculateDkaPlan } from "@/core/utils/fluidCalculations";

function fmt(n, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function DkaCalculator() {
  const [weight, setWeight] = useState("");
  const [bolusDose, setBolusDose] = useState(10);
  const [insulinDose, setInsulinDose] = useState(0.1);
  const [bloodSugar, setBloodSugar] = useState("");

  const w = Number(weight);
  const valid = weight !== "" && Number.isFinite(w) && w > 0;

  const plan = valid
    ? calculateDkaPlan({
        weightKg: w,
        bolusDoseCcPerKg: bolusDose,
        insulinDoseUPerKgPerHr: insulinDose,
        bloodSugar,
      })
    : null;

  // derive per-serum flow rates from the overall 23h rate and the A/B ratio
  const ratioA = plan?.batel?.ratioA ?? null;
  const rateA =
    ratioA != null && Number.isFinite(plan?.rate23h)
      ? plan.rate23h * ratioA
      : null;
  const rateB =
    ratioA != null && Number.isFinite(plan?.rate23h)
      ? plan.rate23h * (1 - ratioA)
      : null;

  return (
    <div className="rounded-3xl border border-clay-200 bg-clay-50/40 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-clay-700 text-paper-card">
          <LuCalculator className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-ink">
            محاسبه‌ سرم و دریپ DKA
          </h3>
          <p className="text-[11.5px] text-ink-muted">
            بولوس، برنامه ۲۴ ساعته مایع و دریپ انسولین بر اساس وزن
          </p>
        </div>
      </div>

      {/* inputs */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="dka-weight"
          >
            وزن بیمار (کیلوگرم) <span className="text-brick-600">*</span>
          </label>
          <input
            id="dka-weight"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="مثلاً 20"
            className="w-full rounded-lg border border-line bg-paper-card px-3 py-2 text-[13.5px] tnum text-ink focus:outline-none"
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="dka-bs"
          >
            قند خون فعلی (mg/dL) — اختیاری
          </label>
          <input
            id="dka-bs"
            type="number"
            inputMode="decimal"
            min="0"
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            placeholder="مثلاً 280"
            className="w-full rounded-lg border border-line bg-paper-card px-3 py-2 text-[13.5px] tnum text-ink focus:outline-none"
          />
        </div>

        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="dka-bolus"
          >
            دوز بولوس ساعت اول (cc/kg) — محدوده ۱۰ تا ۲۰
          </label>
          <input
            id="dka-bolus"
            type="range"
            min="10"
            max="20"
            step="1"
            value={bolusDose}
            onChange={(e) => setBolusDose(Number(e.target.value))}
            className="w-full accent-clay-600"
          />
          <p className="mt-1 text-[12px] tnum text-clay-700">
            {bolusDose} cc/kg
          </p>
        </div>

        <div>
          <label
            className="mb-1.5 block text-[12.5px] font-medium text-ink-soft"
            htmlFor="dka-insulin"
          >
            دوز انسولین دریپ (U/kg/hr) — محدوده ۰.۰۵ تا ۰.۱
          </label>
          <input
            id="dka-insulin"
            type="range"
            min="0.05"
            max="0.1"
            step="0.01"
            value={insulinDose}
            onChange={(e) => setInsulinDose(Number(e.target.value))}
            className="w-full accent-clay-600"
          />
          <p className="mt-1 text-[12px] tnum text-clay-700">
            {insulinDose} U/kg/hr
          </p>
        </div>
      </div>

      {!valid ? (
        <p className="rounded-xl border border-dashed border-line bg-paper-card px-4 py-6 text-center text-[13px] text-ink-muted">
          برای مشاهده نتایج، وزن بیمار را وارد کنید.
        </p>
      ) : (
        <div className="space-y-4">
          {/* bolus + maintenance */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
              <p className="text-[11.5px] text-ink-muted">بولوس ساعت اول</p>
              <p className="text-lg font-bold tnum text-clay-700">
                {fmt(plan.bolusVolume)}{" "}
                <span className="text-xs font-normal text-ink-muted">mL</span>
              </p>
              <p className="text-[11px] text-ink-muted">
                طی ۱ ساعت، سالین یا رینگرلاکتات
              </p>
            </div>
            <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
              <p className="text-[11.5px] text-ink-muted">
                سرم maintenance روزانه
              </p>
              <p className="text-lg font-bold tnum text-teal-800">
                {fmt(plan.maintenance.daily)}{" "}
                <span className="text-xs font-normal text-ink-muted">
                  mL/day
                </span>
              </p>
              <p className="text-[11px] text-ink-muted">Holliday–Segar</p>
            </div>
            <div className="rounded-xl border border-line bg-paper-card px-4 py-3">
              <p className="text-[11.5px] text-ink-muted">
                دفیسیت تخمینی (۸۵ cc/kg)
              </p>
              <p className="text-lg font-bold tnum text-ink">
                {fmt(plan.deficitVolume)}{" "}
                <span className="text-xs font-normal text-ink-muted">mL</span>
              </p>
            </div>
          </div>

          {/* 23h plan */}
          <div className="rounded-xl border border-clay-200 bg-clay-100/50 px-4 py-3.5">
            <div className="mb-1 flex items-center gap-2">
              <LuDroplets className="h-4 w-4 text-clay-700" />
              <p className="text-[12.5px] font-bold text-clay-900">
                برنامه مایع ۲۳ ساعت باقی‌مانده
              </p>
            </div>
            <p className="text-[12px] leading-6 text-clay-900">
              (دفیسیت + میترننس − بولوس) ÷ ۲۳ ={" "}
              <span className="font-bold tnum">
                {fmt(plan.remaining23hVolume)} mL
              </span>{" "}
              ÷ ۲۳ ={" "}
              <span className="font-bold tnum">{fmt(plan.rate23h)} mL/hr</span>
            </p>
          </div>

          {/* insulin drip */}
          <div className="rounded-xl border border-line bg-paper-card px-4 py-3.5">
            <div className="mb-1.5 flex items-center gap-2">
              <LuSyringe className="h-4 w-4 text-teal-800" />
              <p className="text-[12.5px] font-bold text-ink">دریپ انسولین</p>
            </div>
            <p className="text-[12px] leading-6 text-ink-soft">
              رقیق‌سازی: Regular Insulin ۵۰ واحد + ۵۰۰cc نرمال سالین (غلظت{" "}
              {plan.insulinConcentrationUPerMl} U/mL)
            </p>
            <p className="mt-1 text-[13px] font-bold tnum text-teal-800">
              سرعت انفوزیون: {fmt(plan.insulinRateMlPerHr, 2)} mL/hr
            </p>
          </div>

          {/* batel guidance — table */}
          {plan.batel && (
            <div className="rounded-xl border border-line bg-paper-card px-4 py-3.5">
              <div className="mb-2 flex items-center gap-2">
                <LuFlaskConical className="h-4 w-4 text-teal-800" />
                <p className="text-[12.5px] font-bold text-ink">
                  ترکیب سرم پیشنهادی بر اساس BS = {bloodSugar}
                </p>
              </div>

              <p className="mb-2 text-[13px] font-semibold text-teal-800">
                {plan.batel.label}
              </p>

              <div className="overflow-hidden rounded-lg border border-line">
                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr className="bg-clay-100/60 text-ink-soft">
                      <th className="px-3 py-2 text-right font-semibold">
                        نوع سرم
                      </th>
                      <th className="px-3 py-2 text-right font-semibold">
                        ترکیب
                      </th>
                      <th className="px-3 py-2 text-right font-semibold">
                        سهم از حجم
                      </th>
                      <th className="px-3 py-2 text-right font-semibold">
                        سرعت انفوزیون
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    <tr>
                      <td className="px-3 py-2 font-medium text-ink">باتل A</td>
                      <td className="px-3 py-2 text-ink-soft">
                        نرمال سالین (بدون دکستروز)
                      </td>
                      <td className="px-3 py-2 tnum font-semibold text-teal-800">
                        {fmt((plan.batel.ratioA ?? 0) * 100, 0)}٪
                      </td>
                      <td className="px-3 py-2 tnum text-ink">
                        {rateA != null ? `${fmt(rateA, 1)} mL/hr` : "—"}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-ink">باتل B</td>
                      <td className="px-3 py-2 text-ink-soft">
                        سرم دکستروزدار
                      </td>
                      <td className="px-3 py-2 tnum font-semibold text-clay-700">
                        {fmt((1 - (plan.batel.ratioA ?? 0)) * 100, 0)}٪
                      </td>
                      <td className="px-3 py-2 tnum text-ink">
                        {rateB != null ? `${fmt(rateB, 1)} mL/hr` : "—"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {plan.batel.note && (
                <p className="mt-2 text-[11.5px] text-brick-600">
                  {plan.batel.note}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-5 text-ink-muted">
        این ابزار صرفاً کمک‌آموزشی است و بر اساس پروتکل همین کتاب محاسبه می‌کند؛
        تصمیم نهایی درمان باید بر اساس قضاوت بالینی و فالوآپ آزمایشگاهی مکرر
        بیمار گرفته شود.
      </p>
    </div>
  );
}
