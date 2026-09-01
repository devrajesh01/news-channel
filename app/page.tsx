import Hero from "./components/home/Hero";
import Popular from "./components/home/Popular";
import { getPosts } from "./lib/api/posts";

export default async function Home () {
  const posts = await getPosts()
  if(!posts) return null
  return (
    <>
      <Hero />
      <Popular posts={posts} />
    </>
  );
}
