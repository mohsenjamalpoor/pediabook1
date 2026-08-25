import {
  LuEar,
  LuThermometer,
  LuSalad,
  LuWind,
  LuDroplets,
  LuScan,
  LuFlaskConical,
  LuBaby,
  LuSkull,
  LuSiren,
  LuStethoscope,
} from "react-icons/lu";

export const ICONS = {
  ear: LuEar,
  thermometer: LuThermometer,
  stomach: LuSalad,
  lungs: LuWind,
  droplet: LuDroplets,
  skin: LuScan,
  kidney: LuFlaskConical,
  baby: LuBaby,
  skull: LuSkull,
  siren: LuSiren,
};

export function CategoryIcon({ icon, className }) {
  const Cmp = ICONS[icon] || LuStethoscope;
  return <Cmp className={className} strokeWidth={1.8} />;
}

/**
 * Tailwind-safe color tokens per category color name.
 * Tailwind's JIT scanner needs literal class strings, so every combination
 * a category might use is spelled out here rather than built dynamically.
 */
export const COLOR_TOKENS = {
  teal: {
    text: "text-teal-800",
    bgSoft: "bg-teal-50",
    bgTab: "bg-teal-800",
    border: "border-teal-200",
    ring: "ring-teal-600",
    dot: "bg-teal-600",
  },
  amber: {
    text: "text-clay-800",
    bgSoft: "bg-clay-50",
    bgTab: "bg-clay-700",
    border: "border-clay-200",
    ring: "ring-clay-600",
    dot: "bg-clay-600",
  },
  lime: {
    text: "text-lime-800",
    bgSoft: "bg-lime-50",
    bgTab: "bg-lime-700",
    border: "border-lime-200",
    ring: "ring-lime-600",
    dot: "bg-lime-600",
  },
  sky: {
    text: "text-sky-800",
    bgSoft: "bg-sky-50",
    bgTab: "bg-sky-700",
    border: "border-sky-200",
    ring: "ring-sky-600",
    dot: "bg-sky-600",
  },
  violet: {
    text: "text-violet-800",
    bgSoft: "bg-violet-50",
    bgTab: "bg-violet-700",
    border: "border-violet-200",
    ring: "ring-violet-600",
    dot: "bg-violet-600",
  },
  rose: {
    text: "text-rose-800",
    bgSoft: "bg-rose-50",
    bgTab: "bg-rose-700",
    border: "border-rose-200",
    ring: "ring-rose-600",
    dot: "bg-rose-600",
  },
  cyan: {
    text: "text-cyan-800",
    bgSoft: "bg-cyan-50",
    bgTab: "bg-cyan-700",
    border: "border-cyan-200",
    ring: "ring-cyan-600",
    dot: "bg-cyan-600",
  },
  fuchsia: {
    text: "text-fuchsia-800",
    bgSoft: "bg-fuchsia-50",
    bgTab: "bg-fuchsia-700",
    border: "border-fuchsia-200",
    ring: "ring-fuchsia-600",
    dot: "bg-fuchsia-600",
  },
  orange: {
    text: "text-orange-800",
    bgSoft: "bg-orange-50",
    bgTab: "bg-orange-700",
    border: "border-orange-200",
    ring: "ring-orange-600",
    dot: "bg-orange-600",
  },
  red: {
    text: "text-brick-700",
    bgSoft: "bg-brick-50",
    bgTab: "bg-brick-600",
    border: "border-brick-200",
    ring: "ring-brick-600",
    dot: "bg-brick-600",
  },
};

export function colorTokens(color) {
  return COLOR_TOKENS[color] || COLOR_TOKENS.teal;
}
