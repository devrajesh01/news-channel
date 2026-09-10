import type { MetadataRoute } from "next";
import { getPosts, getCategories } from "@/app/lib/api/posts";

const SITE_URL = "https://news-channel-phi.vercel.app";

// WordPress returns posts in pages of up to 100 — loop until we've fetched them all
async function getAllPosts() {
  const allPosts = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const posts = await getPosts({ page, perPage });
    allPosts.push(...posts);
    if (posts.length < perPage) break; // last page reached
    page++;
  }

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories({ per_page: 100 }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}