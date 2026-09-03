import { NextRequest, NextResponse } from "next/server";
import { wpFetch } from "@/app/lib/api/client";
import { normalizePost } from "@/app/lib/api/normalize";
import { Category } from "@/app/types/category";
import { WPPost } from "@/app/types/news";
export async function GET(request: NextRequest) {
    
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [], categories: [] });
  }

  try {
    const [posts, categories] = await Promise.all([
      wpFetch<WPPost[]>("/posts", {
        params: {
          search: query,
          _embed: true,
          per_page: 6,
          _fields: "id,date,slug,title,excerpt,categories,author,_links,_embedded",
        },
      }),
      wpFetch<Category[]>("/categories", {
        params: { search: query, per_page: 5, hide_empty: true },
      }),
    ]);

    return NextResponse.json({
      posts: posts.map(normalizePost),
      categories,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { message: "Search failed" },
      { status: 500 }
    );
  }
}