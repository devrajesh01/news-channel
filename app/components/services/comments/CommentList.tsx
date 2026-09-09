import { NormalizedComment } from "@/app/lib/api/normalize";
import { buildCommentTree } from "./buildCommentTree";
import CommentItem from "./CommentItem";
import LeaveCommentButton from "./LeaveCommentButton";

type CommentListProps = {
  comments: NormalizedComment[];
  postId: number;
};

const CommentList = ({ comments, postId }: CommentListProps) => {
  const tree = buildCommentTree(comments);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h2>
        <LeaveCommentButton postId={postId} />
      </div>

      {tree.length === 0 ? (
        <p className="py-6 text-sm text-muted">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="mt-2 divide-y divide-border">
          {tree.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;