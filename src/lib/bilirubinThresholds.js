/**
 * Neonatal hyperbilirubinemia thresholds for infants ≥35 weeks gestation,
 * per the AAP 2022 guideline (Kemper AR, Newman TB, Slaughter JL, et al.
 * Pediatrics. 2022;150(3):e2022058859).
 *
 * MODEL NOTE (read before trusting the numbers):
 * The AAP guideline publishes its thresholds as figures/curves, not a plain
 * numeric table, so this file reconstructs an approximation from a small set
 * of verified anchor points rather than the full official digitized chart:
 *   - Overall threshold RANGE at 24/48/72/96h across all curves (source:
 *     fpnotebook.com, citing Kemper 2022) gives the two extreme curves:
 *       A(t) = risk-factor curve at GA 35w  (most protective / lowest values)
 *       C(t) = no-risk-factor curve at GA ≥40w (least protective / highest)
 *   - A third anchor B(t) — shared by the risk-factor curve's flat plateau
 *     from GA 38–40w *and* the no-risk-factor curve's starting point at GA
 *     35w (per the guideline's own derivation rule in Appendix C) — is
 *     estimated from a single worked example (GA 37w + risk factor, age 72h
 *     → phototherapy 16.1 mg/dL) and held at the same relative position
 *     between A and C for the other hour marks.
 *   - The exchange-transfusion curve is approximated as phototherapy + a
 *     constant offset calibrated from the same worked example (21.7 − 16.1
 *     = 5.6 mg/dL); "escalation of care" is exactly 2 mg/dL below exchange,
 *     which the guideline states directly (not approximated).
 *   - Values beyond 96h are held flat (plateaued) rather than extrapolated,
 *     which is a simplification — the real curves keep rising gradually.
 *
 * This is a teaching approximation. It is NOT a substitute for the official
 * AAP chart or a validated calculator (e.g. PediTools' bili2022 tool) —
 * always verify before acting on a real patient.
 */

const HOUR_ANCHORS = [
  { hours: 24, A: 9.5, C: 16.5 },
  { hours: 48, A: 12.5, C: 19.0 },
  { hours: 72, A: 15.5, C: 21.0 },
  { hours: 96, A: 17.0, C: 22.0 },
];

// (B - A) / (C - A) at the one hour mark (72h) we can calibrate B for.
const B_RATIO = 0.9 / 5.5;

// Phototherapy → exchange transfusion offset, calibrated from the one
// worked example available (37w + risk factor, 72h: 21.7 − 16.1 = 5.6).
const EXCHANGE_OFFSET = 5.6;

function lerp(x, x0, x1, y0, y1) {
  if (x1 === x0) return y0;
  const t = (x - x0) / (x1 - x0);
  return y0 + t * (y1 - y0);
}

/** A(t) and C(t) — the two extreme curves — via linear interpolation between hour anchors, clamped/plateaued outside 24–96h. */
function getExtremeCurves(ageHours) {
  const h = Math.max(0, Number(ageHours) || 0);
  if (h <= HOUR_ANCHORS[0].hours)
    return { A: HOUR_ANCHORS[0].A, C: HOUR_ANCHORS[0].C };
  const last = HOUR_ANCHORS[HOUR_ANCHORS.length - 1];
  if (h >= last.hours) return { A: last.A, C: last.C };

  for (let i = 0; i < HOUR_ANCHORS.length - 1; i++) {
    const p0 = HOUR_ANCHORS[i];
    const p1 = HOUR_ANCHORS[i + 1];
    if (h >= p0.hours && h <= p1.hours) {
      return {
        A: lerp(h, p0.hours, p1.hours, p0.A, p1.A),
        C: lerp(h, p0.hours, p1.hours, p0.C, p1.C),
      };
    }
  }
  return { A: last.A, C: last.C };
}

/**
 * Computes phototherapy / escalation-of-care / exchange-transfusion
 * thresholds for a given gestational age, postnatal age, and risk status.
 *
 * @param {number} gestationalAgeWeeks - 35 to 42+ (values above 40 behave as 40)
 * @param {number} ageHours - postnatal age at measurement, in hours
 * @param {boolean} hasRiskFactor - true if any neurotoxicity risk factor is present
 *   (gestational age <38 weeks itself counts as a risk factor per the guideline
 *   and is applied automatically regardless of this flag)
 */
export function getBilirubinThresholds({
  gestationalAgeWeeks,
  ageHours,
  hasRiskFactor,
}) {
  const ga = Math.min(42, Math.max(35, Number(gestationalAgeWeeks) || 35));
  const { A, C } = getExtremeCurves(ageHours);
  const B = A + B_RATIO * (C - A);

  // GA < 38 weeks is itself a neurotoxicity risk factor per the guideline.
  const effectiveRiskFactor = Boolean(hasRiskFactor) || ga < 38;

  let phototherapy;
  if (effectiveRiskFactor) {
    // Risk-factor curve: A at GA35, rising to B at GA38, flat (B) from 38–40+.
    if (ga <= 35) phototherapy = A;
    else if (ga >= 38) phototherapy = B;
    else phototherapy = lerp(ga, 35, 38, A, B);
  } else {
    // No-risk-factor curve: B at GA35, rising to C at GA40, flat (C) at 40+.
    if (ga <= 35) phototherapy = B;
    else if (ga >= 40) phototherapy = C;
    else phototherapy = lerp(ga, 35, 40, B, C);
  }

  const exchange = phototherapy + EXCHANGE_OFFSET;
  const escalation = exchange - 2;

  return {
    gestationalAgeWeeks: ga,
    effectiveRiskFactor,
    phototherapy: Math.round(phototherapy * 10) / 10,
    escalation: Math.round(escalation * 10) / 10,
    exchange: Math.round(exchange * 10) / 10,
  };
}

export const NEUROTOXICITY_RISK_FACTORS = [
  { id: "albumin", label: "آلبومین کمتر از ۳.۰ g/dL" },
  {
    id: "isoimmune",
    label: "بیماری همولیتیک ایمیون (ناسازگاری Rh/ABO) یا Coombs مثبت",
  },
  { id: "g6pd", label: "کمبود G6PD یا سایر بیماری‌های همولیتیک" },
  { id: "sepsis", label: "سپسیس" },
  { id: "instability", label: "بی‌ثباتی بالینی قابل‌توجه (۲۴ ساعت اخیر)" },
];

export const BILIRUBIN_REFERENCE = {
  citation:
    "Kemper AR, Newman TB, Slaughter JL, et al. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics. 2022;150(3):e2022058859.",
  disclaimer:
    "این ابزار یک تقریب آموزشی از منحنی‌های AAP 2022 است (بازسازی‌شده از چند نقطه مرجع، نه جدول رسمی کامل)؛ TSB ملاک است (بیلی‌روبین مستقیم کم نشود). پیش از هر تصمیم بالینی، حتماً با نمودار رسمی AAP یا ابزارهای معتبر (مانند PediTools) مطابقت داده شود.",
};
