/**
 * Holliday–Segar maintenance fluid formula (classic weight-based method).
 * Returns { daily, hourly } in mL.
 */
export function holidaySegarMaintenance(weightKg) {
  const w = Math.max(0, Number(weightKg) || 0);
  let daily;
  if (w <= 10) {
    daily = 100 * w;
  } else if (w <= 20) {
    daily = 1000 + 50 * (w - 10);
  } else {
    daily = 1500 + 20 * (w - 20);
  }
  return { daily, hourly: daily / 24 };
}

/**
 * General-purpose insulin drip rate calculator.
 *
 * Standard dilution: 50 units Regular insulin in 500 mL NS → 0.1 U/mL,
 * which at a dose of 0.1 U/kg/hr gives the familiar "1 cc/kg/hr" shortcut.
 *
 * When a patient is heavier, the drip is often concentrated instead of
 * increasing the volume — e.g. 100 units in 250 mL NS → 0.4 U/mL, which at
 * the same 0.1 U/kg/hr dose gives the "weight ÷ 4" shortcut.
 *
 * Both are just this one formula with a different (units, volume) pair:
 *   concentration (U/mL) = units / volume
 *   rate (mL/hr) = dose(U/kg/hr) × weight(kg) / concentration(U/mL)
 */
export function calculateInsulinDripRate({
  weightKg,
  doseUPerKgPerHr = 0.1,
  insulinUnits = 50,
  salineVolumeMl = 500,
}) {
  const weight = Math.max(0, Number(weightKg) || 0);
  const dose = Math.max(0, Number(doseUPerKgPerHr) || 0);
  const units = Math.max(0, Number(insulinUnits) || 0);
  const volume = Math.max(0, Number(salineVolumeMl) || 0);

  const concentrationUPerMl = volume > 0 ? units / volume : 0;
  const rateMlPerHr =
    concentrationUPerMl > 0 ? (dose * weight) / concentrationUPerMl : 0;

  return { weight, dose, units, volume, concentrationUPerMl, rateMlPerHr };
}

/**
 * DKA 24-hour fluid + insulin drip plan, following the book's protocol:
 * - Hour 1: isotonic bolus, 10–20 cc/kg
 * - Hours 2–24 (23h): total volume = 85 cc/kg (deficit) + maintenance − bolus,
 *   given evenly over the remaining 23 hours
 * - Insulin drip: Regular 50U in 500cc NS (0.1 U/mL), rate = dose(U/kg/hr) × weight / 0.1
 * - Batel A/B mix recommended from the current blood sugar
 */
export function calculateDkaPlan({
  weightKg,
  bolusDoseCcPerKg = 10,
  insulinDoseUPerKgPerHr = 0.05,
  bloodSugar,
}) {
  const weight = Math.max(0, Number(weightKg) || 0);
  const bolusDose = Number(bolusDoseCcPerKg) || 0;
  const insulinDose = Number(insulinDoseUPerKgPerHr) || 0;

  const bolusVolume = weight * bolusDose;
  const maintenance = holidaySegarMaintenance(weight);
  const deficitVolume = 85 * weight;
  const remaining23hVolume = Math.max(
    deficitVolume + maintenance.daily - bolusVolume,
    0,
  );
  const rate23h = remaining23hVolume / 23;

  // 50 units Regular insulin in 500 mL NS → 0.1 U/mL
  const insulinConcentrationUPerMl = 0.1;
  const insulinRateMlPerHr =
    (insulinDose * weight) / insulinConcentrationUPerMl;

  const bs =
    bloodSugar === "" || bloodSugar === undefined || bloodSugar === null
      ? null
      : Number(bloodSugar);
  let batel = null;
  if (bs !== null && !Number.isNaN(bs)) {
    if (bs < 150) {
      batel = {
        label: "کل سرم از باتل B",
        ratioA: 0,
        ratioB: 1,
        note: "قطع دریپ انسولین طی ۱۵ دقیقه در نظر گرفته شود.",
      };
    } else if (bs < 250) {
      batel = {
        label: "دوسوم باتل B، یک‌سوم باتل A",
        ratioA: 1 / 3,
        ratioB: 2 / 3,
        note: null,
      };
    } else if (bs < 350) {
      batel = {
        label: "دوسوم باتل A، یک‌سوم باتل B",
        ratioA: 2 / 3,
        ratioB: 1 / 3,
        note: null,
      };
    } else {
      batel = { label: "کل سرم از باتل A", ratioA: 1, ratioB: 0, note: null };
    }
  }

  return {
    weight,
    bolusDose,
    bolusVolume,
    maintenance,
    deficitVolume,
    remaining23hVolume,
    rate23h,
    insulinDose,
    insulinConcentrationUPerMl,
    insulinRateMlPerHr,
    batel,
  };
}
