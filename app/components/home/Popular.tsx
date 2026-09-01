"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BgImageCard from "../news/BgImageCard";
import { NormalizedPost } from "@/app/lib/api/normalize";

type PopularProps = {
  posts: NormalizedPost[];
};
const Popular = ({ posts }: PopularProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    dragFree:true
  });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  return (
    <section className="w-full py-10">
      <div className="site-container">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Popular
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FaChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FaChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
       <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mr-5">
            {posts.map((post) => (
              <div className="mr-5 shrink-0" key={post.id}>
                <BgImageCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Popular;
