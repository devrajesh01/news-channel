import Link from "next/link";
import Image from "next/image";
import { NormalizedPost } from "@/app/lib/api/normalize";
import { Category } from "@/app/types/category";

type SearchResultsProps = {
  query: string;
  results: { posts: NormalizedPost[]; categories: Category[] };
  isLoading: boolean;
  onResultClick: () => void;
};

export default function SearchResults({
  query,
  results,
  isLoading,
  onResultClick,
}: SearchResultsProps) {
  if (query.trim().length < 2) {
    return (
      <p className="px-5 py-8 text-center text-sm text-[var(--muted)]">
        Start typing to search news, categories, and topics.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3 px-5 py-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex animate-pulse gap-3">
            <div className="h-14 w-16 shrink-0 rounded bg-[var(--surface-muted)]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-3/4 rounded bg-[var(--surface-muted)]" />
              <div className="h-3 w-1/2 rounded bg-[var(--surface-muted)]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const hasResults = results.posts.length > 0 || results.categories.length > 0;

  if (!hasResults) {
    return (
      <p className="px-5 py-8 text-center text-sm text-[var(--muted)]">
        No results found for &quot;{query}&quot;
      </p>
    );
  }

  return (
    <div className="divide-y divide-[var(--border)]">
      {results.categories.length > 0 && (
        <div className="px-5 py-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={onResultClick}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.posts.length > 0 && (
        <div className="px-5 py-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            News
          </h3>
          <div className="flex flex-col gap-4">
            {results.posts.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                onClick={onResultClick}
                className="group flex gap-3"
              >
                <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </p>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {post.category} · {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}