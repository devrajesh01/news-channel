import Link from "next/link";
import { Category } from "@/app/types/category";

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="border border-[var(--border)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
        Categories
      </h3>
      <ul className="mt-4 space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 text-sm text-[var(--muted)] transition hover:text-[var(--accent)]"
            >
              <span>{category.name}</span>
              <span className="text-xs text-[var(--muted)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}