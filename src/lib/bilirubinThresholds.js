/**
 * Neonatal hyperbilirubinemia thresholds for infants ≥35 weeks gestation,
 * per the AAP 2022 guideline (Kemper AR, et al. Pediatrics. 2022;150(3):e2022058859).
 *
 * این فایل از روی دو نمودار رسمی AAP 2022 که خودت فرستادی، به‌صورت چشمی
 * (visual reading از روی گرید‌لاین‌ها) بازخوانی و بازنویسی شده:
 *   1. Phototherapy Thresholds: One or More Hyperbilirubinemia Neurotoxicity Risk Factors
 *      (منحنی‌های 35 / 36 / 37 / ≥38 هفته)
 *   2. Phototherapy Thresholds: No Hyperbilirubinemia Neurotoxicity Risk Factors
 *      (منحنی‌های 35 / 36 / 37 / 38 / 39 / ≥40 هفته)
 *
 * ⚠️ محدودیت دقت (مهم):
 * اعداد زیر با چشم از روی تصویر نمودار (نه یک ابزار دیجیتایزر پیکسلی مثل
 * WebPlotDigitizer) خوانده شده‌اند؛ دقتشون رو در حد ±0.3 تا ±0.5 mg/dL در
 * نظر بگیر، نه دقت اعشاری کامل. برای استفاده‌ی بالینی واقعی، پیشنهاد می‌کنم
 * قبل از انتشار این ابزار، حداقل چند نقطه‌ی حساس (مثل نزدیکی به آستانه‌ی
 * تعویض خون) رو با نمودار اصلی AAP یا PediTools.org/bili2022 مطابقت بدی.
 *
 * ⚠️ محدودیت دیگر — آستانه‌ی تعویض خون (Exchange):
 * AAP 2022 برای «تعویض خون» دو نمودار جداگانه (با/بدون فاکتور خطر) دارد
 * که شکل‌شون شبیه فتوتراپی ولی مستقل از آن است — یعنی فاصله‌ی فتوتراپی تا
 * تعویض خون یک عدد ثابت نیست و بسته به سن و GA فرق می‌کند. اینجا فعلاً از
 * یک افست ثابت (EXCHANGE_OFFSET) به‌عنوان تقریب موقت استفاده شده. اگر
 * اسکرین‌شات دو نمودار «Exchange Transfusion Thresholds» رو هم بفرستی،
 * این بخش رو با همون روش (anchor + interpolate) دقیق می‌کنم.
 *
 * نکته‌ی تأییدشده (مطمئن، نه تقریبی):
 * رابطه‌ی escalation = exchange − 2 mg/dL مستقیماً در متن راهنمای AAP 2022
 * آمده (نه یک تقریب من) — این بخش نیازی به اصلاح نداره.
 */

// نقاط لنگر (Anchors) — واحد ساعت روی محور x، mg/dL روی محور y
// فاصله‌ی نقاط: 0,12,24,36,48,60,72,84,96 (فاز صعودی) سپس 120,168,240,336 (فاز پلاتو)
const PHOTOTHERAPY_ANCHORS = {
  // نمودار اول: با یک یا چند فاکتور خطر نوروتوکسیسیتی
  risk: {
    ga35: [
      { h: 0, v: 5.0 },
      { h: 12, v: 7.1 },
      { h: 24, v: 8.8 },
      { h: 36, v: 10.5 },
      { h: 48, v: 12.0 },
      { h: 60, v: 13.3 },
      { h: 72, v: 14.5 },
      { h: 84, v: 15.4 },
      { h: 96, v: 16.1 },
      { h: 120, v: 16.3 },
      { h: 168, v: 16.6 },
      { h: 240, v: 17.0 },
      { h: 336, v: 17.4 },
    ],
    ga36: [
      { h: 0, v: 5.5 },
      { h: 12, v: 7.9 },
      { h: 24, v: 9.9 },
      { h: 36, v: 11.7 },
      { h: 48, v: 13.2 },
      { h: 60, v: 14.6 },
      { h: 72, v: 15.9 },
      { h: 84, v: 16.6 },
      { h: 96, v: 17.0 },
      { h: 120, v: 17.3 },
      { h: 168, v: 17.6 },
      { h: 240, v: 17.9 },
      { h: 336, v: 18.15 },
    ],
    ga37: [
      { h: 0, v: 6.0 },
      { h: 12, v: 8.4 },
      { h: 24, v: 10.4 },
      { h: 36, v: 12.2 },
      { h: 48, v: 13.8 },
      { h: 60, v: 15.2 },
      { h: 72, v: 16.5 },
      { h: 84, v: 17.3 },
      { h: 96, v: 17.9 },
      { h: 120, v: 18.0 },
      { h: 168, v: 18.1 },
      { h: 240, v: 18.15 },
      { h: 336, v: 18.2 },
    ],
    ga38: [
      // ≥38 weeks
      { h: 0, v: 6.3 },
      { h: 12, v: 8.7 },
      { h: 24, v: 10.8 },
      { h: 36, v: 12.6 },
      { h: 48, v: 14.2 },
      { h: 60, v: 15.6 },
      { h: 72, v: 16.9 },
      { h: 84, v: 17.7 },
      { h: 96, v: 18.25 },
      { h: 120, v: 18.25 },
      { h: 168, v: 18.25 },
      { h: 240, v: 18.28 },
      { h: 336, v: 18.3 },
    ],
  },
  // نمودار دوم: بدون هیچ فاکتور خطر نوروتوکسیسیتی
  noRisk: {
    ga35: [
      { h: 0, v: 6.3 },
      { h: 12, v: 8.4 },
      { h: 24, v: 10.1 },
      { h: 36, v: 11.6 },
      { h: 48, v: 12.9 },
      { h: 60, v: 14.0 },
      { h: 72, v: 15.0 },
      { h: 84, v: 15.9 },
      { h: 96, v: 16.6 },
      { h: 120, v: 17.2 },
      { h: 168, v: 17.7 },
      { h: 240, v: 18.1 },
      { h: 336, v: 18.4 },
    ],
    ga36: [
      { h: 0, v: 7.0 },
      { h: 12, v: 9.2 },
      { h: 24, v: 11.1 },
      { h: 36, v: 12.7 },
      { h: 48, v: 14.0 },
      { h: 60, v: 15.1 },
      { h: 72, v: 16.1 },
      { h: 84, v: 16.9 },
      { h: 96, v: 17.6 },
      { h: 120, v: 18.2 },
      { h: 168, v: 18.7 },
      { h: 240, v: 19.1 },
      { h: 336, v: 19.3 },
    ],
    ga37: [
      { h: 0, v: 7.5 },
      { h: 12, v: 9.8 },
      { h: 24, v: 11.7 },
      { h: 36, v: 13.3 },
      { h: 48, v: 14.7 },
      { h: 60, v: 15.9 },
      { h: 72, v: 17.0 },
      { h: 84, v: 17.9 },
      { h: 96, v: 18.6 },
      { h: 120, v: 19.2 },
      { h: 168, v: 19.7 },
      { h: 240, v: 20.0 },
      { h: 336, v: 20.1 },
    ],
    ga38: [
      { h: 0, v: 8.0 },
      { h: 12, v: 10.3 },
      { h: 24, v: 12.3 },
      { h: 36, v: 14.0 },
      { h: 48, v: 15.4 },
      { h: 60, v: 16.7 },
      { h: 72, v: 17.8 },
      { h: 84, v: 18.8 },
      { h: 96, v: 19.6 },
      { h: 120, v: 20.1 },
      { h: 168, v: 20.5 },
      { h: 240, v: 20.8 },
      { h: 336, v: 21.0 },
    ],
    ga39: [
      { h: 0, v: 8.6 },
      { h: 12, v: 10.9 },
      { h: 24, v: 12.9 },
      { h: 36, v: 14.6 },
      { h: 48, v: 16.1 },
      { h: 60, v: 17.4 },
      { h: 72, v: 18.6 },
      { h: 84, v: 19.6 },
      { h: 96, v: 20.4 },
      { h: 120, v: 20.9 },
      { h: 168, v: 21.2 },
      { h: 240, v: 21.4 },
      { h: 336, v: 21.6 },
    ],
    ga40: [
      // ≥40 weeks
      { h: 0, v: 9.0 },
      { h: 12, v: 11.3 },
      { h: 24, v: 13.3 },
      { h: 36, v: 15.0 },
      { h: 48, v: 16.5 },
      { h: 60, v: 17.8 },
      { h: 72, v: 19.0 },
      { h: 84, v: 20.0 },
      { h: 96, v: 20.8 },
      { h: 120, v: 21.2 },
      { h: 168, v: 21.5 },
      { h: 240, v: 21.7 },
      { h: 336, v: 21.8 },
    ],
  },
};

// تنظیمات بالینی
const ESCALATION_OFFSET = 2.0; // ✅ تأییدشده در متن راهنمای AAP 2022: escalation = exchange − 2
const EXCHANGE_OFFSET = 5.6; // ⚠️ تقریب موقت — تا فرستادن نمودار رسمی Exchange Transfusion

/**
 * درون‌یابی خطی بین نقاط لنگر
 */
function interpolate(anchors, ageHours) {
  const h = Math.max(0, Math.min(336, Number(ageHours) || 0));

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

  // طبق FAQ رسمی AAP 2022: «GA < 38 هفته» خودش یکی از فاکتورهای خطر
  // نوروتوکسیسیتی است، اما این به‌معنای استفاده‌ی اجباری از نمودار
  // «با فاکتور خطر» برای همه‌ی نوزادان GA<38 نیست. آن نمودار فقط وقتی
  // استفاده می‌شود که یک فاکتور خطر *اضافه‌تر* از خودِ GA وجود داشته باشد؛
  // نوزاد ۳۵ تا ۳۷ هفته‌ای بدون هیچ فاکتور خطر دیگر باید از نمودار
  // «بدون فاکتور خطر» (که خودش منحنی‌های جداگانه برای ۳۵،۳۶،۳۷ دارد) استفاده کند.
  // پس انتخاب نمودار فقط به چک‌باکس‌های فاکتور خطر بستگی دارد، نه به GA.
  const effectiveRiskFactor = Boolean(hasRiskFactor);

  let phototherapy;

  if (effectiveRiskFactor) {
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
      phototherapy = interpolate(PHOTOTHERAPY_ANCHORS.risk.ga38, h);
    }
  } else {
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

export function getStatus(tsb, thresholds) {
  // 1. تعویض خون
  if (tsb >= thresholds.exchange) {
    return {
      key: "exchange",
      color: "brick",
      title: "در آستانه تعویض خون",
      message:
        "TSB در حد یا بالاتر از آستانه تعویض خون است. ارزیابی فوری تیم نوزادان/NICU و آماده‌سازی تعویض خون الزامی است.",
      actions: [
        "تماس فوری با تیم نوزادان/NICU و ارزیابی بالینی نوزاد",
        "ادامه فتوتراپی تشدیدی با حداکثر شدت (Irradiance ≥ 30 µW/cm²/nm) در تمام مدت",
        "آماده‌سازی خون کراس‌مچ‌شده و شسته‌شده + FFP طبق پروتکل مرکز",
        "هدف هماتوکریت پس از تعویض حدود ۴۰٪ (در صورت نیاز به تعویض دوبل)",
        "کنترل TSB و بیلی‌روبین مستقیم بلافاصله قبل و بعد از تعویض",
        "پایش علائم نوروتوکسیسیتی حاد (کاهش تونوس، گریه غیرطبیعی، لتارژی، تشنج)",
        "در صورت افت TSB به زیر آستانه پیش از شروع تعویض: می‌توان با پایش TSB هر ۲ ساعت تعویض را به تعویق انداخت",
      ],
    };
  }

  // 2. تشدید مراقبت
  if (tsb >= thresholds.escalation) {
    return {
      key: "escalation",
      color: "orange",
      title: "تشدید مراقبت (نزدیک آستانه تعویض خون)",
      message:
        "TSB در فاصله ۲ mg/dL زیر آستانه تعویض خون است. تشدید مراقبت، بستری در NICU و آماده‌سازی برای تعویض خون احتمالی لازم است.",
      actions: [
        "بستری در NICU و شروع فتوتراپی تشدیدی با حداکثر شدت",
        "کنترل TSB هر ۲ ساعت تا تثبیت روند",
        "مایع‌درمانی وریدی برای حفظ هیدراتاسیون و دفع بیلی‌روبین",
        "بررسی علت زمینه‌ای: CBC، گروه خونی مادر/نوزاد، DAT، G6PD، آلبومین",
        "آماده‌سازی کراس‌مچ خون برای تعویض احتمالی",
        "بررسی وجود فاکتورهای خطر نوروتوکسیسیتی",
      ],
    };
  }

  // 3. فتوتراپی
  if (tsb >= thresholds.phototherapy) {
    return {
      key: "phototherapy",
      color: "clay",
      title: "نیاز به فتوتراپی",
      message:
        "TSB در حد یا بالاتر از آستانه فتوتراپی است. شروع فتوتراپی استاندارد یا تشدیدی بر اساس شدت و علت زمینه‌ای.",
      actions: [
        "شروع فتوتراپی با شدت مناسب (استاندارد: ۸–۲۰، تشدیدی: ≥ ۳۰ µW/cm²/nm)",
        "کنترل (TSB) ۴ تا ۶ ساعت پس از شروع فتوتراپی، سپس بر اساس روند",
        "ادامه تغذیه با شیر مادر یا شیر خشک در طول فتوتراپی",
        "پایش وزن، ادرار و وضعیت هیدراتاسیون",
        "بررسی علت زمینه‌ای: CBC، رتیکولوسیت، گروه خونی، DAT، G6PD",
        "در صورت همولیز یا G6PD، آستانه تعویض خون را جدی‌تر بگیرید",
      ],
    };
  }

  // 4. نزدیک آستانه فتوتراپی
  if (tsb >= thresholds.phototherapy - 1) {
    return {
      key: "near-phototherapy",
      color: "orange",
      title: "نزدیک آستانه فتوتراپی",
      message:
        "TSB در فاصله ۱ mg/dL زیر آستانه فتوتراپی است. نیاز به پایش نزدیک و ارزیابی روند بیلی‌روبین دارد.",
      actions: [
        "پایش نزدیک TSB بر اساس وضعیت بالینی و روند افزایش",
        "آماده‌سازی فتوتراپی در صورت افزایش TSB",
        "ارزیابی علت زمینه‌ای و فاکتورهای خطر",
        "اطمینان از تغذیه کافی و دفع مناسب",
        "آموزش والدین درباره علائم خطر",
      ],
    };
  }

  // 5. زیر آستانه
  return {
    key: "normal",
    color: "teal",
    title: "زیر آستانه فتوتراپی",
    message:
      "TSB بیش از ۱ mg/dL زیر آستانه فتوتراپی است. در حال حاضر بر اساس این محاسبه نیازی به فتوتراپی نیست.",
    actions: [
      "پیگیری سرپایی طبق برنامه ترخیص/فالوآپ",
      "کنترل TSB بر اساس روند، سن نوزاد و نظر پزشک",
      "بررسی روند افزایش TSB و فاکتورهای خطر",
      "آموزش والدین درباره علائم خطر و مراجعه فوری",
    ],
  };
}

export const BILIRUBIN_REFERENCE = {
  citation:
    "Kemper AR, Newman TB, Slaughter JL, et al. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics. 2022;150(3):e2022058859.",
  disclaimer:
    "منحنی‌های فتوتراپی از روی نمودارهای رسمی AAP 2022 به‌صورت چشمی بازخوانی شده‌اند (دقت تقریبی ±0.3 تا ±0.5 mg/dL). آستانه‌ی تعویض خون فعلاً بر پایه‌ی یک افست تقریبی محاسبه می‌شود، نه نمودار مستقل رسمی. TSB ملاک است (بیلی‌روبین مستقیم کم نشود). پیش از هر تصمیم بالینی، حتماً با نمودار رسمی AAP یا ابزارهای معتبر (مانند PediTools) مطابقت داده شود.",
};
