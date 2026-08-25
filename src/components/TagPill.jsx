export default function TagPill({ children, tone = "teal" }) {
  const tones = {
    teal: "bg-teal-50 text-teal-800 border-teal-200",
    clay: "bg-clay-50 text-clay-800 border-clay-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        tones[tone] || tones.teal
      }`}
    >
      {children}
    </span>
  );
}
