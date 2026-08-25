import { LuBookOpen, LuGraduationCap } from "react-icons/lu";
import Layout from "@/components/Layout";
import CategoryTile from "@/components/CategoryTile";
import DiseaseSearchInput from "@/components/DiseaseSearchInput";
import {
  getCategoriesWithTopics,
  getSearchIndex,
  getAllTopics,
  categories,
} from "@/lib/data";

const categoriesBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

export default function HomePage() {
  const categoriesWithTopics = getCategoriesWithTopics();
  const searchIndex = getSearchIndex();
  const topicCount = getAllTopics().length;

  return (
    <Layout>
      <section className="relative mb-10 overflow-hidden rounded-3xl border border-[#e4dcc8] bg-[#fffdf8] px-6 py-10 shadow sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-teal-100/70 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-clay-100/60 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[12.5px] font-medium text-teal-800">
            <LuGraduationCap className="h-3.5 w-3.5" />
            مرجع آموزشی رزیدنت و فلوشیپ اطفال
          </span>

          <h1 className="max-w-2xl text-[28px] font-extrabold leading-normal text-ink sm:text-[34px]">
            نکات کاربردی بیماری‌های شایع و اورژانس‌های اطفال
          </h1>
          <p className="mt-3 max-w-xl text-[14.5px] leading-8 text-ink-muted">
            نسخه وب کتاب PICU — تشخیص، خط درمانی، دوز داروی وزن‌محور و نسخه‌های
            نمونه، دسته‌بندی‌شده و قابل‌جستجو برای استفاده سریع بالینی.
          </p>

          <div className="mt-7">
            <label
              htmlFor="home-disease-search"
              className="mb-2 block text-[12.5px] font-semibold text-ink-soft"
            >
              نام بیماری را جستجو کنید
            </label>
            <DiseaseSearchInput
              id="home-disease-search"
              searchIndex={searchIndex}
              categoriesBySlug={categoriesBySlug}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12.5px] text-ink-muted">
            <span className="flex items-center gap-1.5">
              <LuBookOpen className="h-4 w-4 text-clay-600" />
              <span className="font-mono tabular-nums text-ink">
                {topicCount}
              </span>{" "}
              سرفصل بالینی
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono tabular-nums text-ink">
                {categories.length}
              </span>{" "}
              بخش تخصصی
            </span>
          </div>
        </div>
      </section>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">فهرست مطالب</h2>
        <span className="text-xs text-ink-muted">بر اساس بخش تخصصی</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categoriesWithTopics.map((cat, i) => (
          <CategoryTile key={cat.slug} category={cat} index={i} />
        ))}
      </div>
    </Layout>
  );
}
