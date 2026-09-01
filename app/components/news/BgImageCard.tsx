import { NormalizedPost } from "@/app/lib/api/normalize";
import { formatDate } from "@/app/lib/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";

type BgImageCardProps = {
  post: NormalizedPost;
};

const BgImageCard = ({ post }: BgImageCardProps) => {
  return (
    <div className="group relative h-[300px] w-[250px]  overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="300px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 text-white">
        <div className="flex items-center gap-1.5 text-xs text-white/80">
          <FaRegClock className="h-3 w-3" />
          <span>{formatDate(post.date)}</span>
        </div>
        <Link href={`/news/${post.slug}`}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug transition-colors hover:text-[var(--accent)]">
            {post.title}
          </h3>
        </Link>

        <Link
          href={`/news/${post.slug}`}
          className="mt-1 flex items-center gap-1 !hover:text-[var(--accent)] text-sm font-semibold text-white/90 transition-colors "
        >
          Read More
          <span className="transition-transform !hover:text-[var(--accent)] group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};
export default BgImageCard;