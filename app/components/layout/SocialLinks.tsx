"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { socialLinks } from "@/app/lib/contents";

const SocialLinks = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the popover on outside click
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const icons = (
    <ul className="flex items-center gap-2">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href}
            aria-label={label}
            onClick={() => setOpen(false)}
            className="group flex h-7 w-7 items-center justify-center rounded-full border border-surface bg-accent transition-all duration-300 hover:border-accent hover:bg-surface lg:h-9 lg:w-9"
          >
            <Icon className="h-3.5 w-3.5 text-white transition-all duration-300 group-hover:text-accent lg:h-4 lg:w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Desktop: icons expanded inline */}
      <div className="hidden lg:flex">{icons}</div>

      {/* Tablet / mobile: collapsed into a single "Follow" trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Follow us on social media"
          className="flex h-7 items-center gap-1.5 rounded-full border border-surface bg-accent px-3 text-xs font-semibold text-white transition-all duration-300 hover:border-accent hover:bg-surface hover:text-accent"
        >
          <HiOutlineUserPlus className="h-3.5 w-3.5" />
          Follow
        </button>

        <div
          className={`absolute right-0 top-full z-50 mt-2 origin-top-right rounded-xl border border-border bg-[var(--background)] p-2 shadow-lg transition-all duration-200 ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          }`}
        >
          {icons}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;