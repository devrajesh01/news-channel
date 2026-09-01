import { notFound } from "next/navigation";
import { getPostsByCategorySlug } from "@/app/lib/api/posts";
import NewsCard from "@/app/components/news/NewsCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} News`,
  };
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const posts = await getPostsByCategorySlug(slug);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="site-container mx-auto py-10">
      <h1 className="text-2xl font-bold capitalize">{slug} News</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <NewsCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;