"use client";

import { useMemo, useState } from "react";

import {
  LuDroplet,
  LuTriangleAlert,
  LuCircleCheck,
  LuBookOpen,
  LuFlaskConical,
} from "react-icons/lu";

import {
  getBilirubinThresholds,
  NEUROTOXICITY_RISK_FACTORS,
  BILIRUBIN_REFERENCE,
} from "@/lib/bilirubinThresholds";

import { formatDecimal1 } from "@/lib/formatDecimal1";

const GA_OPTIONS = [35, 36, 37, 38, 39, 40];

/**
 * وضعیت بیمار بر اساس TSB و آستانه‌های محاسبه‌شده
 *
 * ترتیب:
 * 1. Exchange transfusion
 * 2. Escalation of care
 * 3. Phototherapy
 * 4. Below phototherapy threshold
 */
function getStatus(tsb, thresholds) {
  if (tsb >= thresholds.exchange) {
    return {
      key: "exchange",
      color: "brick",
      title: "در محدوده آستانه تعویض خون",
      message:
        "TSB در حد یا بالاتر از آستانه تعویض خون قرار دارد و نیازمند ارزیابی فوری توسط تیم نوزادان/NICU و اقدامات تشدیدی طبق شرایط بالینی است.",
      actions: [
        "ارزیابی فوری توسط تیم نوزادان/NICU",
        "فتوتراپی تشدیدی با حداکثر شدت مناسب ادامه یابد",
        "آمادگی برای تعویض خون طبق پروتکل مرکز و شرایط بالینی",
        "آماده‌سازی خون مناسب و انجام کراس‌مچ طبق پروتکل مرکز",
        "پایش مکرر TSB و وضعیت بالینی نوزاد",
      ],
    };
  }

  if (tsb >= thresholds.escalation) {
    return {
      key: "escalation",
      color: "orange",
      title: "در محدوده تشدید مراقبت",
      message:
        "TSB در محدوده نزدیک به آستانه تعویض خون قرار دارد و تشدید مراقبت و ارزیابی فوری لازم است.",
      actions: [
        "فتوتراپی تشدیدی با شدت مناسب",
        "ارزیابی برای انتقال یا مدیریت در NICU",
        "کنترل مکرر TSB طبق شرایط بالینی",
        "بررسی و درمان علت زمینه‌ای افزایش بیلی‌روبین",
        "آمادگی برای تعویض خون احتمالی در صورت افزایش TSB",
      ],
    };
  }

  if (tsb >= thresholds.phototherapy) {
    return {
      key: "phototherapy",
      color: "clay",
      title: "نیاز به فتوتراپی",
      message: "TSB در حد یا بالاتر از آستانه فتوتراپی قرار دارد.",
      actions: [
        "شروع فتوتراپی مطابق شدت مورد نیاز",
        "کنترل مجدد TSB طبق شرایط بالینی و پاسخ به درمان",
        "ادامه تغذیه و پایش وضعیت هیدراتاسیون نوزاد",
        "بررسی علت زمینه‌ای افزایش بیلی‌روبین",
        "در صورت نیاز بررسی CBC، گروه خونی، DAT و G6PD بر اساس شرایط بالینی",
      ],
    };
  }

  return {
    key: "normal",
    color: "teal",
    title: "زیر آستانه فتوتراپی",
    message: "TSB در حال حاضر زیر آستانه فتوتراپی قرار دارد.",
    actions: [
      "پیگیری طبق برنامه فالوآپ و شرایط بالینی نوزاد",
      "توجه به روند افزایش TSB و عوامل خطر",
      "در صورت افزایش سریع TSB یا بروز علائم خطر، ارزیابی مجدد انجام شود",
    ],
  };
}

/**
 * رنگ‌ها و کلاس‌های وضعیت
 */
const STATUS_TOKENS = {
  brick: {
    bg: "bg-brick-50",
    border: "border-brick-200",
    text: "text-brick-700",
    dot: "bg-brick-600",
  },

  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    dot: "bg-orange-600",
  },

  clay: {
    bg: "bg-clay-50",
    border: "border-clay-200",
    text: "text-clay-800",
    dot: "bg-clay-600",
  },

  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-800",
    dot: "bg-teal-700",
  },
};

export default function NeonatalBilirubinAssessment() {
  const [gestationalAge, setGestationalAge] = useState(38);

  const [ageMode, setAgeMode] = useState("hours");

  const [ageHoursInput, setAgeHoursInput] = useState(24);

  const [ageDaysInput, setAgeDaysInput] = useState(1);

  const [ageDaysHoursInput, setAgeDaysHoursInput] = useState(0);

  const [tsb, setTsb] = useState(8);

  const [riskFactors, setRiskFactors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  /*
   * ---------------------------------------------------------
   * Age
   * ---------------------------------------------------------
   */

  const ageHoursRaw =
    ageMode === "hours"
      ? Number(ageHoursInput) || 0
      : (Number(ageDaysInput) || 0) * 24 + (Number(ageDaysHoursInput) || 0);

  /**
   * محدوده اپلیکیشن: 0 تا 336 ساعت
   * یعنی حداکثر 14 روز
   */
  const ageHours = Math.min(Math.max(ageHoursRaw, 0), 336);

  /*
   * ---------------------------------------------------------
   * Risk factors
   * ---------------------------------------------------------
   */

  const hasAnyRiskFactor = Object.values(riskFactors).some(Boolean);

  /*
   * ---------------------------------------------------------
   * Threshold calculation
   * ---------------------------------------------------------
   */

  const thresholds = useMemo(
    () =>
      getBilirubinThresholds({
        gestationalAgeWeeks: gestationalAge,
        ageHours,
        hasRiskFactor: hasAnyRiskFactor,
      }),
    [gestationalAge, ageHours, hasAnyRiskFactor],
  );

  /*
   * ---------------------------------------------------------
   * TSB
   * ---------------------------------------------------------
   */

  const tsbNum = Number(tsb);

  const isValidTsb = tsb !== "" && Number.isFinite(tsbNum) && tsbNum >= 0;

  /*
   * ---------------------------------------------------------
   * Status
   * ---------------------------------------------------------
   */

  const status = isValidTsb ? getStatus(tsbNum, thresholds) : null;

  const tokens = status ? STATUS_TOKENS[status.color] : STATUS_TOKENS.teal;

  /*
   * ---------------------------------------------------------
   * Active risk factors
   * ---------------------------------------------------------
   */

  const activeRiskLabels = NEUROTOXICITY_RISK_FACTORS.filter(
    (rf) => riskFactors[rf.id],
  ).map((rf) => rf.label);

  /*
   * ---------------------------------------------------------
   * Display age
   * ---------------------------------------------------------
   */

  const days = Math.floor(ageHours / 24);

  const hoursRemainder = Math.floor(ageHours % 24);

  /*
   * ---------------------------------------------------------
   * Handlers
   * ---------------------------------------------------------
   */

  function handleGestationalAgeChange(ga) {
    setGestationalAge(ga);
    setSubmitted(false);
  }

  function handleAgeModeChange(mode) {
    setAgeMode(mode);
    setSubmitted(false);
  }

  function handleAgeHoursChange(value) {
    setAgeHoursInput(value);
    setSubmitted(false);
  }

  function handleAgeDaysChange(value) {
    setAgeDaysInput(value);
    setSubmitted(false);
  }

  function handleAgeDaysHoursChange(value) {
    setAgeDaysHoursInput(value);
    setSubmitted(false);
  }

  function handleTsbChange(value) {
    setTsb(value);
    setSubmitted(false);
  }

  function handleRiskFactorChange(id, checked) {
    setRiskFactors((prev) => ({
      ...prev,
      [id]: checked,
    }));

    setSubmitted(false);
  }

  function handleAssessment() {
    if (!isValidTsb) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div className="rounded-3xl border border-teal-200 bg-teal-50/30 p-5 sm:p-6">
      {/* Header */}
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

      {/* Gestational age */}
      <div className="mb-5">
        <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
          سن حاملگی (هفته)
        </p>

        <div className="flex flex-wrap gap-2">
          {GA_OPTIONS.map((ga) => (
            <button
              key={ga}
              type="button"
              onClick={() => handleGestationalAgeChange(ga)}
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

      {/* Age at measurement */}
      <div className="mb-5">
        <p className="mb-2 text-[12.5px] font-medium text-ink-soft">
          سن در زمان اندازه‌گیری
        </p>

        {/* Mode */}
        <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl border border-line bg-paper-card p-1">
          <button
            type="button"
            onClick={() => handleAgeModeChange("hours")}
            className={`rounded-lg py-2 text-[12.5px] font-semibold transition ${
              ageMode === "hours"
                ? "bg-teal-800 text-paper-card"
                : "text-ink-soft"
            }`}
          >
            ساعت
          </button>

          <button
            type="button"
            onClick={() => handleAgeModeChange("days")}
            className={`rounded-lg py-2 text-[12.5px] font-semibold transition ${
              ageMode === "days"
                ? "bg-teal-800 text-paper-card"
                : "text-ink-soft"
            }`}
          >
            روز + ساعت
          </button>
        </div>

        {/* Hours */}
        {ageMode === "hours" ? (
          <div>
            <input
              type="number"
              min="0"
              max="336"
              step="1"
              inputMode="numeric"
              value={ageHoursInput}
              onChange={(e) => handleAgeHoursChange(e.target.value)}
              className="w-full max-w-40 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <p className="mt-1 text-[11px] text-ink-muted">
              ۰ تا ۳۳۶ ساعت (۱۴ روز)
            </p>
          </div>
        ) : (
          /* Days + hours */
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="14"
              step="1"
              inputMode="numeric"
              value={ageDaysInput}
              onChange={(e) => handleAgeDaysChange(e.target.value)}
              className="w-20 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none focus:ring-2 focus:ring-teal-200"
            />

            <span className="text-[12px] text-ink-muted">روز</span>

            <input
              type="number"
              min="0"
              max="23"
              step="1"
              inputMode="numeric"
              value={ageDaysHoursInput}
              onChange={(e) => handleAgeDaysHoursChange(e.target.value)}
              className="w-20 rounded-lg border border-line bg-paper-card px-3 py-2 text-[14px] tnum text-ink focus:outline-none focus:ring-2 focus:ring-teal-200"
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
          max="50"
          inputMode="decimal"
          value={tsb}
          onChange={(e) => handleTsbChange(e.target.value)}
          className={`w-full max-w-40 rounded-lg border bg-paper-card px-3 py-2 text-[16px] font-bold tnum text-teal-800 focus:outline-none focus:ring-2 ${
            tsb !== "" && !isValidTsb
              ? "border-brick-400 focus:ring-brick-100"
              : "border-line focus:ring-teal-200"
          }`}
        />

        <p className="mt-1.5 text-[11px] italic text-ink-muted">
          برای تعیین آستانه درمان از TSB استفاده کنید؛ بیلی‌روبین مستقیم/کنژوگه
          از TSB کسر نمی‌شود.
        </p>

        {tsb !== "" && !isValidTsb && (
          <p className="mt-1 text-[11px] font-medium text-brick-700">
            مقدار TSB واردشده معتبر نیست.
          </p>
        )}
      </div>

      {/* Risk factors */}
      <div className="mb-5 rounded-xl border border-line bg-paper-card p-4">
        <p className="mb-3 text-[13px] font-bold text-ink">
          فاکتورهای خطر نوروتوکسیسیتی
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
                  handleRiskFactorChange(rf.id, e.target.checked)
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-teal-700"
              />

              <span className="text-[13px] leading-5 text-ink-soft">
                {rf.label}
              </span>
            </label>
          ))}
        </div>

        {/* Effective threshold */}
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
            ? "آستانه‌های مربوط به وجود فاکتور خطر فعال است."
            : "آستانه‌های استاندارد در حال استفاده است."}
        </div>
      </div>

      {/* Assessment button */}
      <button
        type="button"
        onClick={handleAssessment}
        disabled={!isValidTsb}
        className={`mb-5 w-full rounded-xl py-3 text-[14px] font-bold text-paper-card shadow-tab transition ${
          isValidTsb
            ? "bg-teal-800 hover:bg-teal-900"
            : "cursor-not-allowed bg-slate-300"
        }`}
      >
        ارزیابی بیلی‌روبین
      </button>

      {/* Validation */}
      {!isValidTsb && (
        <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2.5 text-[11.5px] leading-5 text-orange-800">
          برای انجام ارزیابی، ابتدا یک مقدار معتبر برای TSB وارد کنید.
        </div>
      )}

      {/* Result */}
      {submitted && status && (
        <div className="space-y-4">
          {/* Result banner */}
          <div
            className={`rounded-2xl border-2 p-5 text-center ${tokens.border} ${tokens.bg}`}
          >
            <span
              className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${tokens.dot}`}
            >
              <LuDroplet className="h-6 w-6 text-paper-card" />
            </span>

            <p className={`mb-1 text-[15px] font-extrabold ${tokens.text}`}>
              {status.title}
            </p>

            <p className={`mb-2 text-2xl font-extrabold tnum ${tokens.text}`}>
              {formatDecimal1(tsbNum)} mg/dL
            </p>

            <p className={`text-[12.5px] leading-6 ${tokens.text}`}>
              {status.message}
            </p>
          </div>

          {/* Thresholds */}
          <div className="rounded-xl border border-line bg-paper-card p-4">
            <p className="mb-3 text-[12.5px] font-bold text-ink">
              آستانه‌ها در سن حاملگی {thresholds.gestationalAgeWeeks} هفته · سن{" "}
              {Math.round(ageHours)} ساعت ({days} روز {hoursRemainder} ساعت)
            </p>

            <ul className="space-y-2">
              {[
                {
                  label: "فتوتراپی",
                  value: thresholds.phototherapy,
                },
                {
                  label: "تشدید مراقبت (ET−2)",
                  value: thresholds.escalation,
                },
                {
                  label: "تعویض خون",
                  value: thresholds.exchange,
                },
              ].map((row) => {
                const difference = tsbNum - row.value;

                const absDifference = Math.abs(difference);

                const isAbove = difference > 0;

                const isBelow = difference < 0;

                /*
                 * برای جلوگیری از نمایش اختلاف‌های بسیار کوچک
                 * مانند 0.01
                 */
                const isAtThreshold = absDifference < 0.05;

                const rowBorderClass = isAtThreshold
                  ? "border-orange-200"
                  : isAbove
                    ? "border-brick-200"
                    : "border-teal-200";

                const rowBgClass = isAtThreshold
                  ? "bg-orange-50"
                  : isAbove
                    ? "bg-brick-50"
                    : "bg-teal-50";

                const rowTextClass = isAtThreshold
                  ? "text-orange-800"
                  : isAbove
                    ? "text-brick-800"
                    : "text-teal-800";

                return (
                  <li
                    key={row.label}
                    className={`rounded-lg border px-3 py-2.5 ${rowBorderClass} ${rowBgClass}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-[13px] font-semibold ${rowTextClass}`}
                      >
                        {row.label}
                      </span>

                      <span
                        className={`shrink-0 text-[13.5px] font-bold tnum ${rowTextClass}`}
                      >
                        {formatDecimal1(row.value)} mg/dL
                      </span>
                    </div>

                    <div className="mt-1.5 flex justify-end">
                      {isAtThreshold ? (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10.5px] font-bold text-orange-700">
                          در آستانه
                        </span>
                      ) : isAbove ? (
                        <span className="rounded-full bg-brick-100 px-2 py-0.5 text-[10.5px] font-bold text-brick-700">
                          ↑ {formatDecimal1(absDifference)} mg/dL بالاتر
                        </span>
                      ) : isBelow ? (
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10.5px] font-bold text-teal-800">
                          ↓ {formatDecimal1(absDifference)} mg/dL پایین‌تر
                        </span>
                      ) : (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10.5px] font-bold text-orange-700">
                          در آستانه
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Active risk factors */}
          {activeRiskLabels.length > 0 && (
            <div className="rounded-xl border border-clay-200 bg-clay-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-[12.5px] font-bold text-clay-800">
                <LuTriangleAlert className="h-4 w-4" />
                فاکتورهای خطر فعال
              </p>

              <ul className="mb-2 space-y-1">
                {activeRiskLabels.map((label) => (
                  <li
                    key={label}
                    className="flex items-start gap-2 text-[12.5px] text-clay-900"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-600" />

                    {label}
                  </li>
                ))}
              </ul>

              <p className="text-[11.5px] italic text-clay-700">
                فاکتورهای خطر نوروتوکسیسیتی می‌توانند باعث استفاده از آستانه‌های
                پایین‌تر درمانی شوند.
              </p>
            </div>
          )}

          {/* Clinical actions */}
          <div
            className={`rounded-xl border p-4 ${tokens.border} ${tokens.bg}`}
          >
            <p className={`mb-2 text-[12.5px] font-bold ${tokens.text}`}>
              اقدامات بالینی
            </p>

            <ul className="space-y-1.5">
              {status.actions.map((action) => (
                <li
                  key={action}
                  className="flex items-start gap-2 text-[12.5px] leading-5 text-ink-soft"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tokens.dot}`}
                  />

                  {action}
                </li>
              ))}
            </ul>
          </div>

          {/* Reference */}
          <div className="rounded-xl border border-line bg-paper-card p-4">
            <p className="mb-1.5 flex items-center gap-2 text-[12.5px] font-bold text-ink">
              <LuBookOpen className="h-4 w-4 text-teal-800" />
              منبع
            </p>

            <p className="mb-2 text-[11.5px] italic leading-5 text-ink-muted">
              {BILIRUBIN_REFERENCE.citation}
            </p>

            <p className="flex items-start gap-1.5 text-[11px] leading-5 text-ink-muted">
              <LuFlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" />

              {BILIRUBIN_REFERENCE.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
