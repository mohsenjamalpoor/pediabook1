import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { colorTokens } from "./categoryMeta";

export default function TopicCard({ topic, color = "teal" }) {
  const tokens = colorTokens(color);
  return (
    <Link
      href={`/topic/${topic.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-[#e4dcc8] bg-[#fffdf8] p-5 shadow transition hover:-translate-y-0.5 hover:border-teal-200"
    >
      <div>
        <h3 className="mb-1.5 text-[15px] font-bold leading-6 text-[#16231f]">
          {topic.title}
        </h3>
        <p className="line-clamp-2 text-[13px] leading-6 text-[#6b675c]">
          {topic.summary}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {(topic.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${tokens.bgSoft} ${tokens.text}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <LuArrowLeft className="h-4 w-4 shrink-0 text-[#6b675c] transition group-hover:-translate-x-0.5 group-hover:text-teal-700" />
      </div>
    </Link>
  );
}
