import Link from "next/link";
import Image from "next/image";
import { FaRegCalendar, FaRegComment } from "react-icons/fa";
import { NormalizedPost } from "@/app/lib/api/normalize";
import { formatDate } from "@/app/lib/utils/formatDate";

type NewsCardProps = {
  post: NormalizedPost;
  variant?: "default" | "horizontal" | "compact";
  priority?: boolean;
};

export default function NewsCard({
  post,
  variant = "default",
  priority = false,
}: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="group flex gap-4 w-[450px]">
        <Link
          href={`/news/${post.slug}`}
          className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <span className="inline-block bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            {post.category}
          </span>
          <Link href={`/news/${post.slug}`}>
            <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {post.title}
            </h3>
          </Link>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-[var(--muted)]">
            <FaRegCalendar className="h-3 w-3" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex items-center gap-3">
        <span className="text-2xl font-bold text-[var(--border)]">
          {String(post.id).padStart(2, "0")}
        </span>
        <Link
          href={`/news/${post.slug}`}
          className="line-clamp-2 text-sm font-medium text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]"
        >
          {post.title}
        </Link>
      </article>
    );
  }

  // Default: full card with image, category, title, excerpt, meta
  return (
    <article className="group flex flex-col overflow-hidden border border-[var(--border)] transition-shadow duration-300 hover:shadow-lg">
      <Link
        href={`/news/${post.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-[var(--accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/news/${post.slug}`}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--muted)]">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1.5">
            <FaRegCalendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
          {post.comments !== undefined && (
            <div className="flex items-center gap-1.5">
              <FaRegComment className="h-3 w-3" />
              <span>{post.comments}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
