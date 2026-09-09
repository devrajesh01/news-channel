import { NormalizedComment } from "@/app/lib/api/normalize";
import { buildCommentTree } from "./buildCommentTree";
import CommentItem from "./CommentItem";

type CommentListProps = {
  comments: NormalizedComment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const tree = buildCommentTree(comments);

  if (tree.length === 0) {
    return (
      <p className="py-6 text-sm text-muted">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>
      <div className="mt-2 divide-y divide-border">
        {tree.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;