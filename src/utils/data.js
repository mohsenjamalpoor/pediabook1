import upperRespiratory from "./content/respiratory-upper";
import feverInfectious from "./content/fever-infectious";
import gi from "./content/gi";
import lowerRespiratory from "./content/respiratory-lower";
import endocrineHeme from "./content/endocrine-heme";
import derm from "./content/derm";
import renal from "./content/renal";
import neonatal from "./content/neonatal";
import toxinBites from "./content/toxin-bites";
import emergency from "./content/emergency";

/**
 * Category metadata — order here defines the order topics appear in the
 * sidebar / table of contents ("فهرست مطالب").
 */
export const categories = [
  {
    slug: "upper-respiratory",
    title: "عفونت‌های تنفسی فوقانی",
    shortTitle: "تنفسی فوقانی",
    color: "teal",
    icon: "ear",
    description: "سرماخوردگی، گوش، سینوس و حلق",
  },
  {
    slug: "fever-infectious",
    title: "تب و بیماری‌های عفونی شایع",
    shortTitle: "تب و عفونی",
    color: "amber",
    icon: "thermometer",
    description: "تب، تب بدون کانون، آبله‌مرغان، شپش سر",
  },
  {
    slug: "gi",
    title: "گوارش",
    shortTitle: "گوارش",
    color: "lime",
    icon: "stomach",
    description: "اسهال، درد شکم، یبوست، انگل‌ها",
  },
  {
    slug: "lower-respiratory",
    title: "تنفسی تحتانی",
    shortTitle: "تنفسی تحتانی",
    color: "sky",
    icon: "lungs",
    description: "سرفه، پنومونی، کروپ، برونشیولیت، آسم",
  },
  {
    slug: "endocrine-heme",
    title: "غدد و خون",
    shortTitle: "غدد و خون",
    color: "violet",
    icon: "droplet",
    description: "تیروئید، آنمی فقر آهن، ویتامین D",
  },
  {
    slug: "derm",
    title: "پوست و بافت نرم",
    shortTitle: "پوست",
    color: "rose",
    icon: "skin",
    description: "اگزما، سلولیت، دیاپر راش، برفک",
  },
  {
    slug: "renal",
    title: "کلیه و مجاری ادراری",
    shortTitle: "ادراری",
    color: "cyan",
    icon: "kidney",
    description: "سیستیت، پیلونفریت",
  },
  {
    slug: "neonatal",
    title: "نوزادان و شیرخواران",
    shortTitle: "نوزادان",
    color: "fuchsia",
    icon: "baby",
    description: "زردی، سپسیس نوزادی، معاینه، کولیک، واکسن",
  },
  {
    slug: "toxin-bites",
    title: "مسمومیت‌ها و گزش‌ها",
    shortTitle: "مسمومیت و گزش",
    color: "orange",
    icon: "skull",
    description: "مارگزیدگی، عقرب‌زدگی، گازگرفتگی",
  },
  {
    slug: "emergency",
    title: "اورژانس‌های اطفال",
    shortTitle: "اورژانس",
    color: "red",
    icon: "siren",
    description: "شوک، تشنج، آنافیلاکسی، DKA، احیا",
  },
];

/** Flat, ordered list of every topic in the book, grouped by category order above. */
export const topics = [
  ...upperRespiratory,
  ...feverInfectious,
  ...gi,
  ...lowerRespiratory,
  ...endocrineHeme,
  ...derm,
  ...renal,
  ...neonatal,
  ...toxinBites,
  ...emergency,
];

/* ---------------------------------------------------------------------- */
/* Accessors                                                              */
/* ---------------------------------------------------------------------- */

export function getAllTopics() {
  return topics;
}

export function getAllCategories() {
  return categories;
}

export function getTopicBySlug(slug) {
  return topics.find((t) => t.slug === slug) || null;
}

export function getTopicsByCategory(categorySlug) {
  return topics.filter((t) => t.category === categorySlug);
}

export function getCategory(categorySlug) {
  return categories.find((c) => c.slug === categorySlug) || null;
}

/** Categories paired with their topics, in sidebar order — the shape the nav needs directly. */
export function getCategoriesWithTopics() {
  return categories.map((c) => ({
    ...c,
    topics: getTopicsByCategory(c.slug),
  }));
}

/** Previous/next topic in reading order, for prev/next footer links on a topic page. */
export function getAdjacentTopics(slug) {
  const idx = topics.findIndex((t) => t.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? topics[idx - 1] : null,
    next: idx < topics.length - 1 ? topics[idx + 1] : null,
  };
}

/** All unique tags across the book, for tag-based browsing if ever needed. */
export function getAllTags() {
  const set = new Set();
  topics.forEach((t) => (t.tags || []).forEach((tag) => set.add(tag)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "fa"));
}

/** Lightweight records for the client-side search index (no full markdown body). */
export function getSearchIndex() {
  return topics.map((t) => ({
    slug: t.slug,
    title: t.title,
    summary: t.summary,
    category: t.category,
    tags: t.tags || [],
    // Strip markdown noise so the search index stays light and matches read naturally.
    body: (t.content || "")
      .replace(/[#>*_`|-]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));
}

export default topics;
