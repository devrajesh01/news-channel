import { WPPost } from "@/app/types/news";

export type NormalizedPost = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string; 
  image: string;
  category: string;
  author: string;
  comments?: number;
};

export function normalizePost(post: WPPost): NormalizedPost {
  return {
    id: post.id,
    title: decodeHtmlEntities(post.title.rendered),
    slug: post.slug,
    date: post.date,    
    excerpt: decodeHtmlEntities(stripHtml(post.excerpt.rendered)),
    content: post.content?.rendered ?? "",
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "/images/placeholder.png",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    author: post._embedded?.author?.[0]?.name ?? "Unknown Author",    
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}
function decodeHtmlEntities(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .trim();
}