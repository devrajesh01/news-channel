import { wpFetch } from "./client";
import { WPPost } from "@/app/types/news";
import { normalizePost, NormalizedPost } from "./normalize";
import { cache } from "react";
import { Category } from "@/app/types/category";

export const getPosts = async (
  page = 1,
  perPage = 10,
): Promise<NormalizedPost[]> => {
  const posts = await wpFetch<WPPost[]>("/posts", {
    params: { _embed: true, per_page: perPage, page },
    tags: ["posts"],
  });
  return posts.map(normalizePost);
};

export const getPostBySlug = cache(async (
  slug: string,
): Promise<NormalizedPost | null> => {
  const posts = await wpFetch<WPPost[]>("/posts", {
    params: { slug, _embed: true },
    tags: ["posts", `post-${slug}`],
  });
  return posts[0] ? normalizePost(posts[0]) : null; // ← must call normalizePost here
});

export const getCategories = async (): Promise<Category[]> => {
  return wpFetch<Category[]>("/categories", {
    params: { per_page: 50, hide_empty: true }, 
    revalidate: 86400,
    tags: ["categories"],
  });
};
