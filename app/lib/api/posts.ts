import { wpFetch } from "./client";
import { WPPost } from "@/app/types/news";
import { normalizePost, NormalizedPost } from "./normalize";
import { cache } from "react";
import { Category } from "@/app/types/category";
type GetPostsOptions = {
  page?: number;
  perPage?: number;
};

export const getPosts = async ({
  page = 1,
  perPage = 10,
}: GetPostsOptions = {}): Promise<NormalizedPost[]> => {
  const posts = await wpFetch<WPPost[]>("/posts", {
    params: {
      _embed: true,
      per_page: perPage,
      page,
      _fields: "id,date,slug,title,excerpt,categories,author,_links,_embedded",
    },
    tags: ["posts"],
  });
  return posts.map(normalizePost); // content will just be undefined/missing here — fine for listings
};

export const getPostBySlug = cache(async (
  slug: string,
): Promise<NormalizedPost | null> => {
  const posts = await wpFetch<WPPost[]>("/posts", {
    params: { slug, _embed: true },
    tags: ["posts", `post-${slug}`],
  });
  return posts[0] ? normalizePost(posts[0]) : null; 
});

export const getCategories = async (): Promise<Category[]> => {
  return wpFetch<Category[]>("/categories", {
    params: { per_page: 50, hide_empty: true }, 
    revalidate: 86400,
    tags: ["categories"],
  });
};

export const getPostsByCategorySlug = async (
  categorySlug: string,
  page = 1,
  perPage = 10
): Promise<NormalizedPost[]> => {
  // WordPress REST API filters by category ID, not slug — so first resolve the slug to an ID
  const categories = await wpFetch<{ id: number }[]>("/categories", {
    params: { slug: categorySlug },
    tags: ["categories"],
  });

  if (!categories[0]) {
    return [];
  }

  const posts = await wpFetch<WPPost[]>("/posts", {
    params: {
      categories: categories[0].id,
      _embed: true,
      per_page: perPage,
      page,
    },
    tags: ["posts", `category-${categorySlug}`],
  });

  return posts.map(normalizePost);
};
