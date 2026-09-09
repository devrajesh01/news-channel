"use client";

import { useState } from "react";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import CommentModal from "./CommentModal";
import CommentForm from "./CommentForm";

type LeaveCommentButtonProps = {
  postId: number;
};

const LeaveCommentButton = ({ postId }: LeaveCommentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
      >
        <HiOutlineChatBubbleLeftEllipsis className="h-4 w-4" />
        Leave a Comment
      </button>

      <CommentModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CommentForm postId={postId} onSuccess={() => setIsOpen(false)} />
      </CommentModal>
    </>
  );
};

export default LeaveCommentButton;