import { NextRequest, NextResponse } from "next/server";
import { wpFetch } from "@/app/lib/api/client";
import { normalizePost, NormalizedPost } from "@/app/lib/api/normalize";
import { Category } from "@/app/types/category";
import { WPPost } from "@/app/types/news";

const POST_FIELDS = "id,date,slug,title,excerpt,categories,author,_links,_embedded";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [], categories: [] });
  }

  try {
    // Run every lookup in parallel: direct title/content/excerpt search,
    // tag-name search, and category-name search
    const [directPosts, matchingTags, matchingCategories] = await Promise.all([
      wpFetch<WPPost[]>("/posts", {
        params: { search: query, _embed: true, per_page: 10, _fields: POST_FIELDS },
      }),
      wpFetch<{ id: number }[]>("/tags", {
        params: { search: query, per_page: 10 },
      }),
      wpFetch<Category[]>("/categories", {
        params: { search: query, per_page: 5, hide_empty: true },
      }),
    ]);

    // Fetch posts belonging to any matched tag (e.g. query "cricket" → posts tagged "Cricket")
    const tagPostsPromise = matchingTags.length
      ? wpFetch<WPPost[]>("/posts", {
          params: {
            tags: matchingTags.map((t) => t.id).join(","),
            _embed: true,
            per_page: 10,
            _fields: POST_FIELDS,
          },
        })
      : Promise.resolve<WPPost[]>([]);

    // Fetch posts belonging to any matched category (e.g. query "sport" → posts in "Sports" category)
    const categoryPostsPromise = matchingCategories.length
      ? wpFetch<WPPost[]>("/posts", {
          params: {
            categories: matchingCategories.map((c) => c.id).join(","),
            _embed: true,
            per_page: 10,
            _fields: POST_FIELDS,
          },
        })
      : Promise.resolve<WPPost[]>([]);

    // Direct ID lookup — if someone searches an exact numeric post ID
    const idLookupPromise = /^\d+$/.test(query)
      ? wpFetch<WPPost[]>("/posts", {
          params: { include: query, _embed: true, _fields: POST_FIELDS },
        }).catch(() => [])
      : Promise.resolve<WPPost[]>([]);

    const [tagPosts, categoryPosts, idMatchedPosts] = await Promise.all([
      tagPostsPromise,
      categoryPostsPromise,
      idLookupPromise,
    ]);

    // Merge all sources, de-duping by post ID.
    // Order matters: direct title/content matches first (most relevant),
    // then tag matches, then category matches, then ID lookups.
    const merged = new Map<number, WPPost>();
    for (const post of [...directPosts, ...tagPosts, ...categoryPosts, ...idMatchedPosts]) {
      if (!merged.has(post.id)) {
        merged.set(post.id, post);
      }
    }

    const posts: NormalizedPost[] = Array.from(merged.values())
      .slice(0, 12) // cap total results
      .map(normalizePost);

    return NextResponse.json({ posts, categories: matchingCategories });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ message: "Search failed" }, { status: 500 });
  }
}