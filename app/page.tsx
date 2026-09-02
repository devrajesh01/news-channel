import Hero from "./components/home/Hero";
import Popular from "./components/home/Popular";
import NewsGridSection from "./components/home/NewsGridSection";
import { getPosts } from "./lib/api/posts";

export default async function Home() {
  const popularPosts = await getPosts({ perPage: 10 });
  return (
    <>
      <Hero />
      {popularPosts.length > 0 && <Popular posts={popularPosts} />}
      <NewsGridSection />
    </>
  );
}