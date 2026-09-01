import { notFound } from "next/navigation";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { getCategories, getPostBySlug, getPosts } from "@/app/lib/api/posts";
import type { Metadata } from "next";
import { rewriteContentImages } from "@/app/lib/utils/rewriteContentImages";
import { formatDate } from "@/app/lib/utils/formatDate";
import { SideBar, CategoryList, RecentPosts, AuthorCard, NewsletterWidget, SocialFollow } from "@/app/components/sidebar";
import TopRatedNews from "@/app/components/sidebar/TopRatedNews";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const posts = await getPosts();

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: {
      canonical: `/news/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 160),
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt.slice(0, 160),
      images: [post.image],
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const [categories, recentPosts] = await Promise.all([
    getCategories(),
    getPosts({ perPage: 4 }),
  ]);

  return (
    <div className="site-container mx-auto grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_320px]">
      <article className="site-container mx-auto py-10">
        {/* Category + meta */}
        <div className="flex items-center gap-3">
          <span className="bg-accent px-3 py-1 text-xs font-semibold text-white">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaRegCalendar className="text-gray-400" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {post.title}
        </h1>

        {/* Featured image */}
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Full content — rendered from WordPress HTML */}
        <div
          className="prose prose-lg mt-8 relative max-w-none text-gray-700 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-md [&_figure]:my-6"
          dangerouslySetInnerHTML={{
            __html: rewriteContentImages(post.content),
          }}
        />
      </article>
      <SideBar>
        <NewsletterWidget/>
        <SocialFollow/>
        <CategoryList categories={categories}  />
        <RecentPosts posts={recentPosts} />
        <AuthorCard author={post.author} />               
      </SideBar>
    </div>
  );
}
