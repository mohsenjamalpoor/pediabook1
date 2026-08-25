import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <LuChevronLeft className="h-3.5 w-3.5 opacity-50" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-teal-700">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-ink" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
