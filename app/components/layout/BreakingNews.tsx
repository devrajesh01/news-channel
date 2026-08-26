import Link from "next/link";
import React from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaLink, FaX } from "react-icons/fa6";

const BreakingNews = () => {
  return (
    <div className="flex min-h-10 w-full items-center justify-between border-b border-border text-sm">
      {/* Breaking News */}
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 bg-accent px-3 py-1 text-xs font-semibold uppercase text-white">
          New
        </span>

        <Link
          href="/news/latest-news"
          className="truncate text-muted transition-colors hover:text-accent"
        >
          Vehicles without valid fitness was docs can't collect fuels
          suspected them clarifications from Italy
        </Link>

        <Link
          href="/news/latest-news"
          className="hidden shrink-0 font-medium text-accent sm:block"
        >
          Read More →
        </Link>
      </div>

      {/* Social */}
      <div className="ml-4 hidden shrink-0 items-center gap-3 sm:flex">
        <button
          type="button"
          aria-label="Share on X"
          className="text-muted transition-colors hover:text-accent"
        >
          <FaX />
        </button>

        <button
          type="button"
          aria-label="Copy link"
          className="text-muted transition-colors hover:text-accent"
        >
          <FaLink />
        </button>

        <button
          type="button"
          aria-label="Share on Facebook"
          className="text-muted transition-colors hover:text-accent"
        >
          <FaFacebookF />
        </button>

        <button
          type="button"
          aria-label="Share on WhatsApp"
          className="text-muted transition-colors hover:text-accent"
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default BreakingNews;