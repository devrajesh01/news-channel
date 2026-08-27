import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import NewsMeta from "./NewsMeta";
import { getPosts } from "@/app/lib/api/posts";

const Hero = async () => {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const smallPosts = posts.slice(1);

  return (
    <section className="w-full py-10">
      <div className="site-container mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Featured Post */}
          <article className="group">
            <div className="relative aspect-[4/2] overflow-hidden">
              <Link href={`/news/${featuredPost.slug}`}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3">
                <span className="bg-accent px-3 py-1 text-xs font-semibold text-white">
                  {featuredPost.category}
                </span>
                <NewsMeta news={featuredPost} />
              </div>

              <Link href={`/news/${featuredPost.slug}`}>
                <h1 className="mt-4 font-bold !text-[28px] leading-tight text-foreground cursor-pointer transition-colors hover:text-accent md:text-3xl">
                  {featuredPost.title}
                </h1>
              </Link>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                {featuredPost.excerpt}
              </p>

              <button className="mt-5 text-sm font-semibold text-gray-800 transition-colors hover:text-orange-500">
                Read More →
              </button>
            </div>
          </article>

          {/* Small Posts */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
            {smallPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Link href={`/news/${post.slug}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-accent px-2.5 py-1 text-[10px] font-semibold text-white">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <FaRegCalendar className="text-gray-400" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <Link href={`/news/${post.slug}`}>
                    <h3 className="mt-3 line-clamp-2 text-base font-bold leading-6 text-gray-800 transition-colors hover:text-accent">
                      {post.title}
                    </h3>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;