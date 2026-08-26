import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-5 text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const isLink = Boolean(item.href) && !isLast;
          return (
            <li
              key={item.href ?? item.label}
              className="flex items-center gap-1.5"
            >
              {i > 0 && (
                <LuChevronLeft
                  className="h-3.5 w-3.5 opacity-50"
                  aria-hidden="true"
                />
              )}
              {isLink ? (
                <Link
                  href={item.href}
                  className="transition hover:text-teal-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-ink" : ""}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
