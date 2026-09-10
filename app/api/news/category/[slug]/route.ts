import { NextRequest, NextResponse } from "next/server";
import { getPostsByCategorySlug } from "@/app/lib/api/posts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const perPage = Number(request.nextUrl.searchParams.get("perPage") ?? "12");

  const posts = await getPostsByCategorySlug(slug, page, perPage);

  return NextResponse.json({ posts, hasMore: posts.length === perPage });
}