"use client";

import { useEffect, ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const CommentModal = ({ isOpen, onClose, children }: CommentModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Leave a comment"
        className={`relative z-10 w-full max-w-lg rounded-2xl border border-border bg-[var(--background)] p-6 shadow-2xl transition-all duration-300 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Leave a Comment</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[var(--background-muted)] hover:text-accent"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default CommentModal;