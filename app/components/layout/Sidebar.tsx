"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { Category } from "@/app/types/category";
import { useSidebar } from "./SidebarProvider";
import { useActiveCategory } from "./ActiveCategoryProvider";
import Logo from "./Logo";

type SidebarProps = {
  categories: Category[];
};

const Sidebar = ({ categories }: SidebarProps) => {
  const { isOpen, close } = useSidebar();
  const { activeCategorySlug } = useActiveCategory();
  const pathname = usePathname();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const toggleExpanded = (id: string) =>
    setExpandedId((current) => (current === id ? null : id));

  const isActive = (categorySlug: string) => {
    if (pathname === `/category/${categorySlug}`) return true;
    if (activeCategorySlug === categorySlug) return true;
    return false;
  };

  const linkClass = (active: boolean) =>
    `block flex-1 rounded-md px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--background-muted)] hover:text-accent ${
      active ? "!text-[var(--accent)]" : "text-foreground"
    }`;

  const subLinkClass = (active: boolean) =>
    `block rounded-md px-3 py-2 text-sm transition hover:bg-[var(--background-muted)] hover:text-accent ${
      active ? "font-semibold !text-[var(--accent)]" : "text-muted"
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-y-0 left-0 z-[70] flex h-full w-[85vw] max-w-[360px] flex-col bg-[var(--background)] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-[-360px]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <div className="flex items-center gap-0">
            <span className="text-sm font-bold uppercase tracking-wider text-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-[var(--background-muted)] hover:text-accent"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={close}
                className={`block rounded-md px-3 py-2.5 text-sm font-semibold transition hover:bg-[var(--background-muted)] hover:text-accent ${
                  pathname === "/" ? "!text-[var(--accent)]" : "text-foreground"
                }`}
              >
                Home
              </Link>
            </li>

            {categories.map((category) => {
              const subcategories = category.subcategories ?? [];
              const hasChildren = subcategories.length > 0;
              const isExpanded = expandedId === String(category.id);
              const active = isActive(category.slug);

              return (
                <li
                  key={category.id}
                  className="border-b border-border/60 last:border-none"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={close}
                      className={linkClass(active)}
                    >
                      {category.name}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(String(category.id))}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name} subpages`}
                        className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-[var(--background-muted)] hover:text-accent"
                      >
                        <IoChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="flex flex-col gap-0.5 py-1 pl-5">
                          {subcategories.map((sub) => (
                            <li key={sub.id}>
                              <Link
                                href={`/category/${sub.slug}`}
                                onClick={close}
                                className={subLinkClass(isActive(sub.slug))}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
