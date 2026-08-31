"use client";

import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CgMenuHotdog } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

import ThemeToggle from "../theme/ThemeToggle";
import BreakingNews from "./BreakingNews";
import Advertisement from "./Advertisement";
import Image from "next/image";
import { Category } from "@/app/types/category";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Politics", href: "!#" },
  { label: "World", href: "!#" },
  { label: "Technology", href: "!#" },
  { label: "Blog", href: "/blog" },
];
// type HeaderProps = {
//   categories: Category[];
// };

const Header =  () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-border bg-background">
      <BreakingNews />
      <div className="site-container">
        {/* Breaking News */}

        {/* Logo + Advertisement */}
        <div className="w-full flex min-h-24  items-center justify-between ">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="News Channel home"
          >
           <Image 
            src="/images/brand-logo.png" 
            alt="NewsWala Logo" 
            width={180} 
            height={45} 
            priority
          />
          </Link>
          <Advertisement />
        </div>
        {/* Main Navigation */}
        <div className="border-t border-border">
          <div className="flex w-full  items-center justify-between  py-3">
            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden md:block ">
              <ul className="flex items-center gap-8">
                {navigation.map((item) => (
                  <li key={item.label.toLocaleLowerCase()}>
                    <Link
                      href={item.label.toLocaleLowerCase()}
                      className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Controls */}
            <div className="ml-auto flex items-center gap-2">
              {/* Search */}
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

              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-accent hover:text-accent md:hidden"
                aria-controls="mobile-navigation"
                aria-expanded={menuOpen}
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
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
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Mobile Search */}
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
      </div>
    </header>
  );
};
export default Header;
