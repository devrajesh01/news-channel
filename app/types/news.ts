// types/news.ts

export type News = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
};
export type NewsComments = {
  id: number,
  title: string,
  category?: string,
  date: string,
  comments?: number,
  image: string,
  excerpt?: string,
};
export type WPPost = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string }; // ← must be present here too
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: { id: number; name: string }[][];
     author?: { id: number; name: string }[]; // 
  };
};
