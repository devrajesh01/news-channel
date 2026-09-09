"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type CommentFormProps = {
  postId: number;
  onSuccess: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const CommentForm = ({ postId, onSuccess }: CommentFormProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      postId,
      authorName: formData.get("authorName"),
      authorEmail: formData.get("authorEmail"),
      content: formData.get("content"),
      website: formData.get("website"), // honeypot — stays empty for real users
    };

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Failed to post comment.");
        return;
      }

      setStatus("success");
      router.refresh(); // re-fetches the server component tree, pulling in the new comment
      setTimeout(onSuccess, 1200); // brief pause so the user sees the success state before closing
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="py-8 text-center">
        <p className="text-sm font-semibold text-foreground">
          Thanks — your comment has been submitted.
        </p>
        <p className="mt-1 text-xs text-muted">
          It may need approval before it appears publicly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot field — hidden from real users via CSS, bots often fill every field */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="authorName" className="mb-1.5 block text-xs font-semibold text-foreground">
            Name
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="authorEmail" className="mb-1.5 block text-xs font-semibold text-foreground">
            Email
          </label>
          <input
            id="authorEmail"
            name="authorEmail"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent"
          />
          <p className="mt-1 text-[11px] text-muted">Never published.</p>
        </div>
      </div>

      <div>
        <label htmlFor="content" className="mb-1.5 block text-xs font-semibold text-foreground">
          Comment
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;