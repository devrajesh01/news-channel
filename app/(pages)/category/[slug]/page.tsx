import { notFound } from "next/navigation";
import { getPostsByCategorySlug } from "@/app/lib/api/posts";
import InfiniteNewsGrid from "@/app/components/news/InfiniteNewsGrid";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} News`,
  };
}
const PER_PAGE = 4;
const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const posts = await getPostsByCategorySlug(slug, 1, PER_PAGE);
  console.log(posts.length)
  const categoryName = slug?.charAt(0).toUpperCase() + slug.slice(1);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="site-container mx-auto py-10">
      <Breadcrumb items={[{label:"Category"},{ label: categoryName }]} />
      <h1 className="text-2xl font-bold capitalize">{categoryName} News</h1>

      <InfiniteNewsGrid categorySlug={slug} initialPosts={posts} perPage={PER_PAGE} />
    </div>
  );
};

export default CategoryPage;