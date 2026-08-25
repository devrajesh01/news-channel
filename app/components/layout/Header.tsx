
"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme/ThemeToggle";
import { CgMenuHotdog } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
export default function Header(){
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = [
  { label: "Home", href: "/" },
  { label: "Politics", href: "/category/politics" },
  { label: "World", href: "/category/world" },
  { label: "Technology", href: "/category/technology" },
  { label: "Sports", href: "/category/sports" },
];  

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
            N
          </div>

          <span className="font-editorial text-2xl font-bold tracking-tight">
            NEWS<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 md:order-2">

          {/* Search - Desktop */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CiSearch  className="h-4 w-4 text-muted" />              
            </div>
            <input
              type="search"
              placeholder="Search"
              className="w-44 rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-controls="navbar-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
             <IoClose className="h-6 w-6" />
            ) : (
              <CgMenuHotdog className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div
          id="navbar-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:order-1 md:block md:w-auto`}
        >
          <ul className="mt-4 flex flex-col gap-1 rounded-lg border border-border bg-surface p-3 text-sm font-medium md:mt-0 md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0">

            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-foreground transition hover:bg-surface-muted hover:text-accent md:px-0 md:py-1 md:hover:bg-transparent"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Search - Mobile */}
            <li className="mt-2 md:hidden">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                   <CiSearch  className="h-4 w-4 text-muted" />
                </div>
                <input
                  type="search"
                  placeholder="Search news..."
                  className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}