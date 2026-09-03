"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchModal from "./SearchModal";

export default function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:text-accent"
      >
        <CiSearch className="h-6 w-6" />
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}