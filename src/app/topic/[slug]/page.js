import { notFound } from "next/navigation";
import Link from "next/link";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import TagPill from "@/components/TagPill";
import MarkdownContent from "@/components/MarkdownContent";
import { CategoryIcon, colorTokens } from "@/components/categoryMeta";
import {
  getAllTopics,
  getTopicBySlug,
  getCategory,
  getAdjacentTopics,
} from "@/lib/data";

export async function generateStaticParams() {
  return getAllTopics().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.summary,
  };
}

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const category = getCategory(topic.category);
  const { prev, next } = getAdjacentTopics(topic.slug);
  const tokens = colorTokens(category.color);

  return (
    <Layout activeCategory={category.slug} activeTopicSlug={topic.slug}>
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: category.title, href: `/category/${category.slug}` },
          { label: topic.title },
        ]}
      />

      <article className="rounded-3xl border border-line bg-paper-card p-6 shadow-card sm:p-9">
        <div className="mb-6 flex items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tokens.bgSoft}`}
          >
            <CategoryIcon
              icon={category.icon}
              className={`h-5 w-5 ${tokens.text}`}
            />
          </span>
          <span className={`text-[12.5px] font-semibold ${tokens.text}`}>
            {category.title}
          </span>
        </div>

        <h1 className="mb-3 text-[24px] font-extrabold leading-normal text-ink sm:text-[28px]">
          {topic.title}
        </h1>
        <p className="mb-5 max-w-2xl text-[14.5px] leading-8 text-ink-muted">
          {topic.summary}
        </p>

        {topic.tags?.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-1.5">
            {topic.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        )}

        <div className="border-t border-dashed border-line pt-2">
          <MarkdownContent content={topic.content} />
        </div>
      </article>

      <nav
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
        aria-label="سرفصل قبلی و بعدی"
      >
        {prev ? (
          <Link
            href={`/topic/${prev.slug}`}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-paper-card px-4 py-3.5 shadow-card transition hover:border-teal-200"
          >
            <LuArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5" />
            <span className="min-w-0">
              <span className="block text-[11px] text-ink-muted">
                سرفصل قبلی
              </span>
              <span className="block truncate text-[13.5px] font-semibold text-ink">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/topic/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-line bg-paper-card px-4 py-3.5 text-left shadow-card transition hover:border-teal-200"
          >
            <span className="min-w-0">
              <span className="block text-[11px] text-ink-muted">
                سرفصل بعدی
              </span>
              <span className="block truncate text-[13.5px] font-semibold text-ink">
                {next.title}
              </span>
            </span>
            <LuArrowLeft className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:-translate-x-0.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Layout>
  );
}
