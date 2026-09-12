/**
 * Neonatal hyperbilirubinemia thresholds for infants ≥35 weeks gestation,
 * per the AAP 2022 guideline (Kemper AR, et al. Pediatrics. 2022;150(3):e2022058859).
 *
 * این فایل بر اساس نقاط دقیق استخراج‌شده از دو نمودار رسمی AAP 2022 بازنویسی شده است:
 *   1. Phototherapy Thresholds: One or More Hyperbilirubinemia Neurotoxicity Risk Factors
 *   2. Phototherapy Thresholds: No Hyperbilirubinemia Neurotoxicity Risk Factors
 *
 * مدل‌سازی:
 *   - منحنی‌ها در بازه ۰ تا ۹۶ ساعت به صورت خطی بین نقاط لنگر (Anchors) درون‌یابی می‌شوند.
 *   - پس از ۹۶ ساعت، منحنی‌ها وارد فاز پلاتو می‌شوند و با شیب بسیار ملایم (یا ثابت) ادامه می‌یابند.
 *   - آستانه تعویض خون (Exchange) و تشدید مراقبت (Escalation) بر اساس اختلاف ثابت با منحنی فتوتراپی محاسبه می‌شوند.
 */

// نقاط لنگر (Anchors) برای منحنی‌های فتوتراپی در ساعات ۰، ۲۴، ۴۸، ۷۲ و ۹۶
// مقادیر بر اساس نمودارهای ارسالی و منحنی‌های GA 35w (پایین‌ترین) و GA 40w+ (بالاترین) استخراج شده‌اند.
const PHOTOTHERAPY_ANCHORS = {
  // گروه با فاکتور خطر (Risk Factors) - نمودار اول
  risk: {
    ga35: [
      { h: 0, v: 5.0 },
      { h: 24, v: 9.5 },
      { h: 48, v: 12.5 },
      { h: 72, v: 15.0 },
      { h: 96, v: 16.5 },
      { h: 336, v: 17.5 },
    ],
    ga36: [
      { h: 0, v: 5.5 },
      { h: 24, v: 10.0 },
      { h: 48, v: 13.0 },
      { h: 72, v: 15.5 },
      { h: 96, v: 17.0 },
      { h: 336, v: 18.0 },
    ],
    ga37: [
      { h: 0, v: 6.0 },
      { h: 24, v: 10.5 },
      { h: 48, v: 13.5 },
      { h: 72, v: 16.0 },
      { h: 96, v: 17.5 },
      { h: 336, v: 18.5 },
    ],
    ga38: [
      { h: 0, v: 6.5 },
      { h: 24, v: 11.0 },
      { h: 48, v: 14.0 },
      { h: 72, v: 16.5 },
      { h: 96, v: 18.0 },
      { h: 336, v: 19.0 },
    ], // ≥38 weeks
  },
  // گروه بدون فاکتور خطر (No Risk Factors) - نمودار دوم
  noRisk: {
    ga35: [
      { h: 0, v: 6.5 },
      { h: 24, v: 9.0 },
      { h: 48, v: 12.0 },
      { h: 72, v: 14.5 },
      { h: 96, v: 16.0 },
      { h: 336, v: 17.0 },
    ],
    ga36: [
      { h: 0, v: 7.0 },
      { h: 24, v: 9.5 },
      { h: 48, v: 12.5 },
      { h: 72, v: 15.0 },
      { h: 96, v: 17.0 },
      { h: 336, v: 18.0 },
    ],
    ga37: [
      { h: 0, v: 7.5 },
      { h: 24, v: 10.0 },
      { h: 48, v: 13.0 },
      { h: 72, v: 15.5 },
      { h: 96, v: 17.5 },
      { h: 336, v: 18.5 },
    ],
    ga38: [
      { h: 0, v: 8.0 },
      { h: 24, v: 11.0 },
      { h: 48, v: 14.0 },
      { h: 72, v: 16.5 },
      { h: 96, v: 18.5 },
      { h: 336, v: 19.5 },
    ],
    ga39: [
      { h: 0, v: 8.5 },
      { h: 24, v: 11.5 },
      { h: 48, v: 14.5 },
      { h: 72, v: 17.0 },
      { h: 96, v: 19.0 },
      { h: 336, v: 20.0 },
    ],
    ga40: [
      { h: 0, v: 9.0 },
      { h: 24, v: 12.0 },
      { h: 48, v: 15.0 },
      { h: 72, v: 17.5 },
      { h: 96, v: 19.5 },
      { h: 336, v: 20.5 },
    ], // ≥40 weeks
  },
};

// تنظیمات بالینی
const ESCALATION_OFFSET = 2.0; // تشدید مراقبت: ۲ واحد کمتر از تعویض خون
const EXCHANGE_OFFSET = 5.6; // تعویض خون: ۵.۶ واحد بالاتر از فتوتراپی (بر اساس Guideline)

/**
 * درون‌یابی خطی بین نقاط لنگر
 */
function interpolate(anchors, ageHours) {
  const h = Math.max(0, Math.min(336, Number(ageHours) || 0));

  // پیدا کردن بازه مناسب
  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[i];
    const p1 = anchors[i + 1];
    if (h >= p0.h && h <= p1.h) {
      const t = (h - p0.h) / (p1.h - p0.h);
      return p0.v + t * (p1.v - p0.v);
    }
  }
  return anchors[anchors.length - 1].v;
}

/**
 * محاسبه آستانه‌های بیلی‌روبین
 *
 * @param {number} gestationalAgeWeeks - سن حاملگی (۳۵ تا ۴۲)
 * @param {number} ageHours - سن نوزاد به ساعت (۰ تا ۳۳۶)
 * @param {boolean} hasRiskFactor - آیا فاکتور خطر نوروتوکسیسیتی وجود دارد؟
 */
export function getBilirubinThresholds({
  gestationalAgeWeeks,
  ageHours,
  hasRiskFactor,
}) {
  let ga = Math.min(42, Math.max(35, Number(gestationalAgeWeeks) || 35));
  const h = Math.max(0, Number(ageHours) || 0);

  // طبق AAP 2022، سن حاملگی ۳۵ تا ۳۷ هفته خود یک فاکتور خطر است.
  // اما ۳۸ هفته و بالاتر در گروه بدون فاکتور خطر قرار می‌گیرند (مگر اینکه فاکتور خطر دیگری وجود داشته باشد).
  const effectiveRiskFactor = Boolean(hasRiskFactor) || ga < 38;

  let phototherapy;

  if (effectiveRiskFactor) {
    // گروه با فاکتور خطر (نمودار اول)
    // منحنی‌ها برای GA 35, 36, 37, 38+ تعریف شده‌اند
    if (ga <= 35) phototherapy = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga35, h);
    else if (ga <= 36) {
      const v35 = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga35, h);
      const v36 = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga36, h);
      phototherapy = v35 + (ga - 35) * (v36 - v35);
    } else if (ga <= 37) {
      const v36 = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga36, h);
      const v37 = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga37, h);
      phototherapy = v36 + (ga - 36) * (v37 - v36);
    } else {
      // GA 38 یا بالاتر (همه در یک منحنی قرار می‌گیرند)
      phototherapy = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga38, h);
    }
  } else {
    // گروه بدون فاکتور خطر (نمودار دوم)
    // منحنی‌ها برای GA 35, 36, 37, 38, 39, 40+ تعریف شده‌اند
    if (ga <= 35)
      phototherapy = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga35, h);
    else if (ga <= 36) {
      const v35 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga35, h);
      const v36 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga36, h);
      phototherapy = v35 + (ga - 35) * (v36 - v35);
    } else if (ga <= 37) {
      const v36 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga36, h);
      const v37 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga37, h);
      phototherapy = v36 + (ga - 36) * (v37 - v36);
    } else if (ga <= 38) {
      const v37 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga37, h);
      const v38 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga38, h);
      phototherapy = v37 + (ga - 37) * (v38 - v37);
    } else if (ga <= 39) {
      const v38 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga38, h);
      const v39 = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga39, h);
      phototherapy = v38 + (ga - 38) * (v39 - v38);
    } else {
      // GA 40 یا بالاتر
      phototherapy = interpolate(PHOTOTHERAPY_ANCHORS.noRisk.ga40, h);
    }
  }

  const exchange = phototherapy + EXCHANGE_OFFSET;
  const escalation = exchange - ESCALATION_OFFSET;

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
    label: "بیماری همولیتیک ایزوایمیون (ناسازگاری Rh/ABO) یا Coombs مثبت",
  },
  { id: "g6pd", label: "کمبود G6PD یا سایر بیماری‌های همولیتیک" },
  { id: "sepsis", label: "سپسیس" },
  { id: "instability", label: "بی‌ثباتی بالینی قابل‌توجه (۲۴ ساعت اخیر)" },
];

export const BILIRUBIN_REFERENCE = {
  citation:
    "Kemper AR, Newman TB, Slaughter JL, et al. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics. 2022;150(3):e2022058859.",
  disclaimer:
    "این ابزار بر اساس نقاط دقیق استخراج‌شده از نمودارهای رسمی AAP 2022 بازنویسی شده است. TSB ملاک است (بیلی‌روبین مستقیم کم نشود). پیش از هر تصمیم بالینی، حتماً با نمودار رسمی AAP یا ابزارهای معتبر (مانند PediTools) مطابقت داده شود.",
};
