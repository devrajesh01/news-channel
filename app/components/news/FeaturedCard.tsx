import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar, FaRegComment } from "react-icons/fa";
import { NormalizedPost } from "@/app/lib/api/normalize";

type FeaturedCardProps = {
  post: NormalizedPost;
  priority?: boolean;
};

export default function FeaturedCard({ post, priority = false }: FeaturedCardProps) {
  return (
    <div className="group relative h-full min-h-[360px] w-full overflow-hidden">
      <Link href={`/news/${post.slug}`} className="absolute inset-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <span className="absolute left-4 top-4 z-10 bg-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
        {post.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 text-white">
        <div className="flex items-center gap-4 text-xs text-white/80">
          <div className="flex items-center gap-1.5">
            <FaRegCalendar className="h-3 w-3" />
            <span>{post.date}</span>
          </div>
          {post.comments !== undefined && (
            <div className="flex items-center gap-1.5">
              <FaRegComment className="h-3 w-3" />
              <span>({post.comments})</span>
            </div>
          )}
        </div>

        <Link href={`/news/${post.slug}`}>
          <h3 className="line-clamp-2 text-xl font-bold leading-snug transition-colors group-hover:text-[var(--accent)]">
            {post.title}
          </h3>
        </Link>

        <Link
          href={`/news/${post.slug}`}
          className="mt-1 flex w-fit items-center gap-1 text-sm font-semibold text-white/90 transition-colors hover:text-[var(--accent)]"
        >
          Read More
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}