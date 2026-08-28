import { WPPost } from "@/app/types/news";

export type NormalizedPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string; // full HTML — used by detail page, ignored by list/card views
  image: string;
  category: string;
  comments?: number;
};

export function normalizePost(post: WPPost): NormalizedPost {
  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    image:
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      "/images/placeholder.png",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}