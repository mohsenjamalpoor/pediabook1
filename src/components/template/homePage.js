"use client";

import {
  categories,
  getAllTopics,
  getCategoriesWithTopics,
  getSearchIndex,
} from "@/utils/data";

const categoriesBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

function HomePage() {
  const categoriesWithTopics = getCategoriesWithTopics();
  const searchIndex = getSearchIndex();
  const topicCount = getAllTopics().length;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[#16231f]">فهرست مطالب</h2>
        <span className="text-xs text-[#6b675c]">بر اساس بخش تخصصی</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categoriesWithTopics.map((cat, i) => (
          <h1 key={i}>titel</h1>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
