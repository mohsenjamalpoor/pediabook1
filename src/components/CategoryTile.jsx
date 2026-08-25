import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { CategoryIcon, colorTokens } from "./categoryMeta";

export default function CategoryTile({ category, index }) {
  const tokens = colorTokens(category.color);
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 ${tokens.bgTab}`}
        aria-hidden="true"
      />
      <div className="mb-4 flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tokens.bgSoft}`}>
          <CategoryIcon icon={category.icon} className={`h-5 w-5 ${tokens.text}`} />
        </span>
        <span className="font-mono text-xs tabular-nums text-ink-muted/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mb-1.5 text-[15.5px] font-bold text-ink">{category.title}</h3>
      <p className="mb-4 text-[13px] leading-6 text-ink-muted">{category.description}</p>
      <div className="mt-auto flex items-center justify-between text-[12.5px] font-medium">
        <span className={tokens.text}>{category.topics.length} سرفصل</span>
        <LuArrowLeft className="h-4 w-4 text-ink-muted transition group-hover:-translate-x-1 group-hover:text-ink" />
      </div>
    </Link>
  );
}
