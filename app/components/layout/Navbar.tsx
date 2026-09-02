"use client";

import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CgMenuHotdog } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { usePathname } from "next/navigation";

import ThemeToggle from "../theme/ThemeToggle";
import { Category } from "@/app/types/category";

type NavbarProps = {
  categories: Category[];
};

const Navbar = ({ categories }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => pathname === href;

  const linkTextClass = (href: string) =>
    `text-sm font-semibold transition-colors hover:text-accent ${
      isLinkActive(href) ? "!text-accent" : "text-foreground"
    }`;

  const liClass = (href: string) =>
    `flex h-full items-center border-t-2 px-3 transition-colors ${
      isLinkActive(href) ? "border-accent bg-[var(--background)]" : "border-transparent"
    }`;

  return (
    <div className="bg-[var(--background-muted)]">
      <div className="flex h-12 w-full items-center justify-between">
        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden h-full md:block">
          <ul className="flex h-full items-center gap-0">
            <li className="flex h-full items-center bg-[var(--foreground)] px-3">
              <Link
                href="/"
                className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
              >
                <TfiMenuAlt className="text-2xl text-surface" />
              </Link>
            </li>

            <li className={liClass("/")}>
              <Link href="/" className={linkTextClass("/")}>
                Home
              </Link>
            </li>

            {categories.slice(0, 6).map((category) => {
              const href = `/category/${category.slug}`;
              return (
                <li key={category.id} className={liClass(href)}>
                  <Link href={href} className={linkTextClass(href)}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Controls */}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <CiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search news"
              className="h-9 w-44 rounded-full border border-border bg-surface pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:text-accent md:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? (
              <IoClose className="h-5 w-5" />
            ) : (
              <CgMenuHotdog className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 ${linkTextClass("/")}`}
              >
                Home
              </Link>
            </li>
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              return (
                <li key={category.id}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2.5 ${linkTextClass(href)}`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative mt-4">
            <CiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search news..."
              aria-label="Search news"
              className="h-10 w-full rounded-full border border-border bg-surface pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-accent"
            />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;