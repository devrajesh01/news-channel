import Link from "next/link";
import Image from "next/image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

type PostNavItem = {
  slug: string;
  title: string;
  thumbnail?: string;
};

type PostNavigationProps = {
  prevPost?: PostNavItem | null;
  nextPost?: PostNavItem | null;
};

const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => {
  if (!prevPost && !nextPost) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid grid-cols-2 gap-2 py-6 sm:grid-cols-2 sm:gap-4"
    >
      {prevPost ? (
        <PostNavCard post={prevPost} direction="prev" />
      ) : (
        <div />
      )}

      {nextPost ? (
        <PostNavCard post={nextPost} direction="next" />
      ) : (
        <div />
      )}
    </nav>
  );
};

const PostNavCard = ({
  post,
  direction,
}: {
  post: PostNavItem;
  direction: "prev" | "next";
}) => {
  const isNext = direction === "next";

  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-all duration-300 hover:border-accent hover:shadow-md ${
        isNext ? "justify-end text-right sm:flex-row-reverse" : ""
      }`}
    >
      {/* Thumbnail + title: hidden on mobile, shown from sm: up */}
      {post.thumbnail && (
        <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:block">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <span
          className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted transition-colors group-hover:text-accent ${
            isNext ? "justify-end" : ""
          }`}
        >
          {!isNext && <HiArrowLeft className="h-3.5 w-3.5 shrink-0" />}
          <span className="whitespace-nowrap">{isNext ? "Next News" : "Previous News"}</span>
          {isNext && <HiArrowRight className="h-3.5 w-3.5 shrink-0" />}
        </span>

        {/* Title: hidden on mobile, shown from sm: up */}
        <p className="mt-1 hidden line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-accent sm:block">
          {post.title.slice(0,60)+ "..."}
        </p>
      </div>
    </Link>
  );
};

export default PostNavigation;