"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { breakingNews, socialLinks } from "@/app/lib/contents";

const BreakingNews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentNews = breakingNews[activeIndex];

  const nextNews = () => {
    setActiveIndex((current) => (current + 1) % breakingNews.length);
  };

  const previousNews = () => {
    setActiveIndex(
      (current) => (current - 1 + breakingNews.length) % breakingNews.length,
    );
  };

  useEffect(() => {
    if (isPaused || breakingNews.length <= 1) {
      return;
    }
    const interval = setInterval(nextNews, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (!currentNews) {
    return null;
  }

  return (
    <div className="border-b border-accent/40 bg-background flex w-full ">
      <div className="site-container flex  justify-between">
        <div
          className="flex min-h-10 items-center justify-between"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Label */}
          <span className="mr-3 shrink-0 bg-accent px-3 h-[100%] flex items-center text-[11px] font-bold uppercase tracking-wider text-white">
            Breaking
          </span>

          {/* Headline */}
          <div className="min-w-0 flex-1 overflow-hidden" aria-live="polite">
            <Link
              href={`/news/${currentNews.slug}`}
              className="block truncate text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {currentNews.title}
            </Link>
          </div>

          {/* Read more */}
          <Link
            href={`/news/${currentNews.slug}`}
            className="ml-4 hidden shrink-0 text-xs font-semibold !text-accent hover:!text-accent-hover sm:block "
          >
            Read More →
          </Link>
          {/* Controls */}
          {breakingNews.length > 1 && (
            <div className="ml-4 flex gap-[1px] shrink-0 items-center">
              <button
                type="button"
                onClick={previousNews}
                aria-label="Previous breaking news"
                className="flex h-7 w-7 items-center justify-center border border-border text-muted transition hover:border-accent hover:text-accent cursor-pointer"
              >
                <FaChevronLeft className="h-3 w-3" />
              </button>

              <button
                type="button"
                onClick={nextNews}
                aria-label="Next breaking news"
                className="flex h-7 w-7 items-center cursor-pointer justify-center border-y border-r border-border text-muted transition hover:border-accent hover:text-accent"
              >
                <FaChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        <ul className="flex items-center justify-end gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                className="flex h-9 w-9  group items-center justify-center rounded-full border border-surface  transition-all duration-300 bg-accent hover:border-accent  hover:bg-surface hover:text-white"
              >
                <Icon className="h-4 w-4  transition-all duration-300 text-white group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default BreakingNews;
