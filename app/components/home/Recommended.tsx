"use client";

import { useCallback } from "react";
import { NormalizedPost } from "@/app/lib/api/normalize";
import NewsCard from "../news/NewsCard";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type RecommendedProps = {
  posts: NormalizedPost[];
};

const Recommended = ({ posts }: RecommendedProps) => {
  console.log(posts)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    align: "start",
    loop: true,
    slidesToScroll: 1,
    
  });

  const scrollPrev = useCallback(() => {
  console.log("emblaApi exists?", !!emblaApi);
  console.log("can scroll prev?", emblaApi?.canScrollPrev());
  emblaApi?.scrollPrev();
}, [emblaApi]);

const scrollNext = useCallback(() => {
  console.log("emblaApi exists?", !!emblaApi);
  console.log("can scroll next?", emblaApi?.canScrollNext());
  emblaApi?.scrollNext();
}, [emblaApi]);

  if (posts.length === 0) return null;

  return (
    <div className="flex-1">
      <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Recommended
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="h-[280px] overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col -mb-5">
          {posts.slice(0, 10).map((post) => (
            <div className="mb-5 shrink-0" key={post.id}>
              <NewsCard post={post} variant="horizontal" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;