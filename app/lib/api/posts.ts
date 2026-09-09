import { wpFetch } from "./client";
import { WPComment, WPPost } from "@/app/types/news";
import { normalizePost, NormalizedPost, NormalizedComment, normalizeComment } from "./normalize";
import { cache } from "react";
import { Category } from "@/app/types/category";

type GetCategoriesOptions = {
  per_page?: number;  
};


type GetPostsOptions = {
  page?: number;
  perPage?: number;
  before?: string;
  after?: string;
  orderby?: "date" | "title" | "id";
  order?: "asc" | "desc";
};

export const getPosts = async ({
  page = 1,
  perPage = 10,
  before,
  after,
  orderby,
  order,
}: GetPostsOptions = {}): Promise<NormalizedPost[]> => {
  const posts = await wpFetch<WPPost[]>("/posts", {
    params: {
      _embed: true,
      per_page: perPage,
      page,
      _fields: "id,date,slug,title,excerpt,categories,author,_links,_embedded",
      ...(before && { before }),
      ...(after && { after }),
      ...(orderby && { orderby }),
      ...(order && { order }),
    },
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
  return posts[0] ? normalizePost(posts[0]) : null; 
});
// app/lib/api/posts.ts

export const getAdjacentPosts = async (
  post: NormalizedPost
): Promise<{ prevPost: NormalizedPost | null; nextPost: NormalizedPost | null }> => {
  const [prevPosts, nextPosts] = await Promise.all([
    getPosts({ perPage: 1, before: post.date, orderby: "date", order: "desc" }),
    getPosts({ perPage: 1, after: post.date, orderby: "date", order: "asc" }),
  ]);

  return {
    prevPost: prevPosts[0] ?? null,
    nextPost: nextPosts[0] ?? null,
  };
};

export const getCategories = cache(
  async ({ per_page = 20 }: GetCategoriesOptions = {}): Promise<Category[]> => {
    return wpFetch<Category[]>("/categories", {
      params: { per_page, hide_empty: true },
      revalidate: 86400,
      tags: ["categories"],
    });
  }
);

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

// =====================fetching comments============
export const getCommentsByPostId = async (
  postId: number,
  perPage = 50
): Promise<NormalizedComment[]> => {
  const comments = await wpFetch<WPComment[]>("/comments", {
    params: {
      post: postId,
      per_page: perPage,
      order: "asc", // oldest first — standard comment-thread order
    },
    tags: ["comments", `comments-post-${postId}`],
  });

  return comments.map(normalizeComment);
};