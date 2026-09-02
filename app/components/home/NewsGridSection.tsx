import { getPosts, getPostsByCategorySlug } from "@/app/lib/api/posts";
import GlobalNews from "./GlobalNews";
import Recommended from "./Recommended";

const NewsGridSection = async () => {
  const [globalPosts, recommendedPosts] = await Promise.all([
    getPostsByCategorySlug("world", 1, 4), // featured + 3 list items
    getPosts(),
  ]);

  return (
    <section className="w-full  py-10 bg-[var(--background-muted)]  ">
      <div className="site-container flex flex-col gap-10 lg:flex-row">
        <GlobalNews posts={globalPosts} />
        <Recommended posts={recommendedPosts} />
      </div>
    </section>
  );
};

export default NewsGridSection;