import Image from "next/image";
import { Comment } from "./types";
import { formatDate } from "@/app/lib/utils/formatDate";

type CommentItemProps = {
  comment: Comment;
  depth?: number;
};

const CommentItem = ({ comment, depth = 0 }: CommentItemProps) => {
  return (
    <div className={depth > 0 ? "ml-6 border-l border-border pl-4 sm:ml-10 sm:pl-6" : ""}>
      <div className="flex gap-3 py-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-background-muted">
          <Image
            src={comment.authorAvatar}
            alt={comment.authorName}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-semibold text-foreground">
              {comment.authorName}
            </span>
            <span className="text-xs text-muted">{formatDate(comment.date)}</span>
          </div>

          <div
            className="mt-1 text-sm leading-relaxed text-foreground [&_a]:text-accent [&_a]:underline [&_p]:my-1"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;