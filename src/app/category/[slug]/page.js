import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { CategoryIcon, colorTokens } from "@/components/categoryMeta";
import { categories, getTopicsByCategory, getCategory } from "@/lib/data";

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

  const topics = getTopicsByCategory(slug);
  const tokens = colorTokens(category.color);

  return (
    <Layout activeCategory={category.slug}>
      <Breadcrumb items={[{ label: "خانه", href: "/" }, { label: category.title }]} />

      <div className="mb-8 flex items-center gap-4 rounded-2xl border border-line bg-paper-card p-5 shadow-card">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tokens.bgSoft}`}>
          <CategoryIcon icon={category.icon} className={`h-6 w-6 ${tokens.text}`} />
        </span>
        <div>
          <h1 className="text-[19px] font-extrabold text-ink">{category.title}</h1>
          <p className="text-[13px] text-ink-muted">{category.description}</p>
        </div>
        <span className={`mr-auto rounded-full px-3 py-1 text-xs font-semibold ${tokens.bgSoft} ${tokens.text}`}>
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
