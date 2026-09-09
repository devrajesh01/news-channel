import { NormalizedComment } from "@/app/lib/api/normalize";
import { Comment } from "./types";

// WordPress returns a flat list; group replies under their parent comment
export function buildCommentTree(comments: NormalizedComment[]): Comment[] {
  const map = new Map<number, Comment>();
  const roots: Comment[] = [];

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach((comment) => {
    const node = map.get(comment.id)!;
    if (comment.parentId && map.has(comment.parentId)) {
      map.get(comment.parentId)!.replies!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}