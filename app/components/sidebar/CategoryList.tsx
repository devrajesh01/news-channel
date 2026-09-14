"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/app/types/category";
import { useActiveCategory } from "@/app/components/layout/ActiveCategoryProvider";

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  const pathname = usePathname();
  const { activeCategorySlug } = useActiveCategory();

  const isActive = (categorySlug: string) => {
    if (pathname === `/category/${categorySlug}`) return true;
    if (activeCategorySlug === categorySlug) return true;
    return false;
  };

  return (
    <div className="border border-[var(--border)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
        Categories
      </h3>
      <ul className="mt-4 space-y-1">
        {categories.map((category) => {
          const active = isActive(category.slug);

          return (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className={`flex items-center justify-between py-2 text-sm transition hover:!text-[var(--accent)] ${
                  active ? "font-semibold !text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}