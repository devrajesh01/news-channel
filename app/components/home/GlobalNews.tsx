"use client"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeaturedCard from "../news/FeaturedCard";
import NewsCard from "../news/NewsCard";
import { NormalizedPost } from "@/app/lib/api/normalize";

type GlobalNewsProps = {
  posts: NormalizedPost[];
};

export default function GlobalNews({ posts }: GlobalNewsProps) {
  if (posts.length === 0) return null;
  const [featured, ...rest] = posts;
  const listItems = rest.slice(0, 4);

  return (
    <div className="flex-[2]">
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Global News
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={()=>alert("hello")}
           
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
             onClick={()=>alert("hello")}            
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FeaturedCard post={featured} priority />
        <div className="flex flex-col gap-5">
          {listItems.map((post) => (
            <NewsCard key={post.id} post={post} variant="horizontal" />
          ))}
        </div>
      </div>
    </div>
  );
}
