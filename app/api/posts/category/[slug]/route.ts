// app/api/posts/category/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPostsByCategorySlug } from "@/app/lib/api/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const perPage = Number(request.nextUrl.searchParams.get("perPage") ?? "12");

  try {
    const posts = await getPostsByCategorySlug(slug, page, perPage);
    return NextResponse.json({ posts, hasMore: posts.length === perPage });
  } catch (error) {
    console.error("getPostsByCategorySlug failed:", error);
    // No more posts (e.g. page beyond WP's range) — treat as end of list, not a crash
    return NextResponse.json({ posts: [], hasMore: false });
  }
}