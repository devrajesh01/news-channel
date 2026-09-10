import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const WP_API_BASE = process.env.WP_API_URL; 

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { postId, authorName, authorEmail, content, website } = body;

  if (website) {
    return NextResponse.json({ success: true });
  }

  if (!postId || !authorName || !authorEmail || !content) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (content.trim().length < 3) {
    return NextResponse.json(
      { error: "Comment is too short." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${WP_API_BASE}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post: postId,
        author_name: authorName,
        author_email: authorEmail,
        content,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return NextResponse.json(
        { error: errorData?.message ?? "WordPress rejected the comment." },
        { status: res.status }
      );
    }

    const comment = await res.json();
    revalidateTag(`comments-post-${postId}`, "max");
    return NextResponse.json({ success: true, comment });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}