import Link from "next/link";
import Image from "next/image";
import { NormalizedPost } from "@/app/lib/api/normalize";

type RecentPostsProps = {
  posts: NormalizedPost[];
  title?: string;
};

export default function RecentPosts({ posts, title = "Latest News" }: RecentPostsProps) {
  return (
    <div className="border border-[var(--border)] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/news/${post.slug}`} className="flex gap-3 group">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  {post.title}
                </p>
                <span className="mt-1 block text-xs text-[var(--muted)]">
                  {post.date}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}