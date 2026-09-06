import upperRespiratory from "./content/respiratory-upper";
import feverInfectious from "./content/fever-infectious";
import gi from "./content/gi";
import lowerRespiratory from "./content/respiratory-lower";
import endocrine from "./content/endocrine";
import heme from "./content/heme";
import derm from "./content/derm";
import renal from "./content/renal";
import neonatal from "./content/neonatal";
import toxinBites from "./content/toxin-bites";
import emergency from "./content/emergency";

/**
 * Category metadata — order here defines the order topics appear in the
 * sidebar / table of contents ("فهرست مطالب").
 *
 * A category may declare `parent: "<slug>"` to nest under another category
 * instead of appearing as its own top-level tab — used for "دستگاه تنفسی"
 * (respiratory), which splits into "فوقانی" (upper) and "تحتانی" (lower).
 * Every category, parent or child, still gets its own /category/[slug] page
 * and its topics still carry that exact category slug — nothing about how
 * topics are tagged changes, only how the nav groups them.
 */
export const categories = [
  {
    slug: "respiratory",
    title: "دستگاه تنفسی",
    shortTitle: "تنفسی",
    color: "sky",
    icon: "lungs",
    description: "بیماری‌های تنفسی فوقانی و تحتانی",
  },
  {
    slug: "upper-respiratory",
    parent: "respiratory",
    title: "تنفسی فوقانی",
    shortTitle: "فوقانی",
    color: "teal",
    icon: "ear",
    description: "سرماخوردگی، گوش، سینوس و حلق",
  },
  {
    slug: "lower-respiratory",
    parent: "respiratory",
    title: "تنفسی تحتانی",
    shortTitle: "تحتانی",
    color: "sky",
    icon: "lungs",
    description: "سرفه، پنومونی، کروپ، برونشیولیت، آسم",
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
    slug: "endocrine",
    title: "غدد",
    shortTitle: "غدد",
    color: "violet",
    icon: "gland",
    description: "تیروئید، ویتامین D",
  },
  {
    slug: "heme",
    title: "خون",
    shortTitle: "خون",
    color: "rose",
    icon: "droplet",
    description: "آنمی فقر آهن",
  },
  {
    slug: "derm",
    title: "پوست و بافت نرم",
    shortTitle: "پوست",
    color: "fuchsia",
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
    color: "teal",
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
  ...lowerRespiratory,
  ...feverInfectious,
  ...gi,
  ...endocrine,
  ...heme,
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

/** Top-level categories only (no `parent`) — what the homepage grid and sidebar iterate over first. */
export function getTopLevelCategories() {
  return categories.filter((c) => !c.parent);
}

/** The child categories nested under a given parent slug, in declared order. */
export function getChildCategories(parentSlug) {
  return categories.filter((c) => c.parent === parentSlug);
}

/**
 * Top-level categories with their topics attached. A category that has
 * children (like "respiratory") gets a `children` array instead of a flat
 * topic list — each child carries its own `topics` — plus a combined
 * `topics` array (all descendants) so a total count can still be shown.
 */
export function getCategoriesWithTopics() {
  return getTopLevelCategories().map((c) => {
    const children = getChildCategories(c.slug);
    if (children.length > 0) {
      const childrenWithTopics = children.map((child) => ({
        ...child,
        topics: getTopicsByCategory(child.slug),
      }));
      return {
        ...c,
        children: childrenWithTopics,
        topics: childrenWithTopics.flatMap((child) => child.topics),
      };
    }
    return { ...c, topics: getTopicsByCategory(c.slug) };
  });
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
