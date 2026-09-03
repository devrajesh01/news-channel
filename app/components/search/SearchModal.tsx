"use client";

import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";

import { NormalizedPost } from "@/app/lib/api/normalize";
import { Category } from "@/app/types/category";
import { useDebounce } from "@/app/hooks/useDebounce";
import SearchResults from "./SearchResults";
import { useRouter } from "next/navigation";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SearchResultsData = {
  posts: NormalizedPost[];
  categories: Category[];
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultsData>({
    posts: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 400);
  // SearchModal.tsx
    const handleResultClick = () => {
      document.body.style.overflow = ""; 
      onClose();
    };

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults({ posts: [], categories: [] });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults({ posts: [], categories: [] });
      return;
    }
    

    let cancelled = false;
    setIsLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setResults(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-20 backdrop-blur-sm">
      <div
        className="mx-4 w-full max-w-2xl bg-[var(--surface)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
          <IoSearchOutline className="h-5 w-5 shrink-0 text-[var(--muted)]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, categories, topics..."
            aria-label="Search"
            className="w-full bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          <SearchResults
            query={debouncedQuery}
            results={results}
            isLoading={isLoading}
            onResultClick={handleResultClick}
          />
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
