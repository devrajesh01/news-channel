"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { NormalizedPost } from "@/app/lib/api/normalize";
import NewsCard from "@/app/components/news/NewsCard";


type InfiniteNewsGridProps = {
  categorySlug: string;
  initialPosts: NormalizedPost[];
   perPage: number;
};

const InfiniteNewsGrid = ({ categorySlug, initialPosts ,perPage }: InfiniteNewsGridProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPosts.length === perPage);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    const res = await fetch(
      `/api/posts/category/${categorySlug}?page=${nextPage}&perPage=${perPage}`
    );
    const data = await res.json();

    setPosts((prev) => [...prev, ...data.posts]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setLoading(false);
  }, [categorySlug, page, loading, hasMore,perPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" } // start loading before the user actually hits the bottom
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);
  

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <NewsCard post={post} key={post.id} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          {loading && (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-10 text-center text-sm text-muted">
          You've reached the end.
        </p>
      )}
    </>
  );
};

export default InfiniteNewsGrid;