import { notFound } from "next/navigation";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { CategoryIcon, colorTokens } from "@/components/categoryMeta";
import {
  categories,
  getTopicsByCategory,
  getCategory,
  getChildCategories,
} from "@/lib/data";

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const parent = category.parent ? getCategory(category.parent) : null;
  const children = getChildCategories(category.slug);
  const tokens = colorTokens(category.color);

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    ...(parent
      ? [{ label: parent.title, href: `/category/${parent.slug}` }]
      : []),
    { label: category.title },
  ];

  // A parent category (e.g. "دستگاه تنفسی") shows a chooser between its
  // sub-categories instead of a topic grid — pick one, then see the diseases.
  if (children.length > 0) {
    const childrenWithTopics = children.map((child) => ({
      ...child,
      topics: getTopicsByCategory(child.slug),
    }));

    return (
      <Layout activeCategory={category.slug}>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-paper-card p-5 shadow-card">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tokens.bgSoft}`}
          >
            <CategoryIcon
              icon={category.icon}
              className={`h-6 w-6 ${tokens.text}`}
            />
          </span>
          <div>
            <h1 className="text-[19px] font-extrabold text-ink">
              {category.title}
            </h1>
            <p className="text-[13px] text-ink-muted">{category.description}</p>
          </div>
        </div>

        <p className="mb-4 text-[13.5px] font-semibold text-ink-soft">
          یکی از بخش‌ها را انتخاب کنید:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {childrenWithTopics.map((child) => {
            const childTokens = colorTokens(child.color);
            return (
              <Link
                key={child.slug}
                href={`/category/${child.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-paper-card p-6 shadow-card transition hover:-translate-y-0.5 hover:border-teal-200"
              >
                <div>
                  <span
                    className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${childTokens.bgSoft}`}
                  >
                    <CategoryIcon
                      icon={child.icon}
                      className={`h-5 w-5 ${childTokens.text}`}
                    />
                  </span>
                  <h2 className="mb-1.5 text-[16px] font-bold text-ink">
                    {child.title}
                  </h2>
                  <p className="text-[13px] leading-6 text-ink-muted">
                    {child.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-[12.5px] font-medium">
                  <span className={childTokens.text}>
                    {child.topics.length} سرفصل
                  </span>
                  <LuArrowLeft className="h-4 w-4 text-ink-muted transition group-hover:-translate-x-1 group-hover:text-ink" />
                </div>
              </Link>
            );
          })}
        </div>
      </Layout>
    );
  }

  const topics = getTopicsByCategory(slug);

  return (
    <Layout activeCategory={category.slug}>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-paper-card p-5 shadow-card">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tokens.bgSoft}`}
        >
          <CategoryIcon
            icon={category.icon}
            className={`h-6 w-6 ${tokens.text}`}
          />
        </span>
        <div>
          <h1 className="text-[19px] font-extrabold text-ink">
            {category.title}
          </h1>
          <p className="text-[13px] text-ink-muted">{category.description}</p>
        </div>
        <span
          className={`mr-auto rounded-full px-3 py-1 text-xs font-semibold ${tokens.bgSoft} ${tokens.text}`}
        >
          {topics.length} سرفصل
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {topics.map((t) => (
          <TopicCard key={t.slug} topic={t} color={category.color} />
        ))}
      </div>
    </Layout>
  );
}
