"use client";

import Link from "next/link";
import { TbWorldShare } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { Category } from "@/app/types/category";
import { SearchTrigger } from "../services/search";
import LinkButton from "@/app/components/ui/LinkButton";
import { useSidebar } from "./SidebarProvider";
import { useActiveCategory } from "./ActiveCategoryProvider";
import MobileMenuButton from "./MobileMenuButton";
import Logo from "./Logo";

type NavbarProps = {
  categories: Category[];
};

const Navbar = ({ categories }: NavbarProps) => {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { activeCategorySlug } = useActiveCategory();

  // categorySlug is optional — Home has none, category items pass their own slug
  const isLinkActive = (href: string, categorySlug?: string) => {
    if (pathname === href) return true;
    if (categorySlug && activeCategorySlug === categorySlug) return true;
    return false;
  };

  const linkTextClass = (href: string, categorySlug?: string) =>
    `text-sm font-semibold transition-colors hover:text-accent ${
      isLinkActive(href, categorySlug) ? "!text-accent" : "text-foreground"
    }`;

  const liClass = (href: string, categorySlug?: string) =>
    `flex h-full items-center border-t-2 px-3 transition-colors ${
      isLinkActive(href, categorySlug) ? "border-accent bg-[var(--background)]" : "border-transparent"
    }`;

  return (
    <div className="w-full bg-[var(--background-muted)]">
      <div className="h-12 w-full items-center justify-between flex">
        <nav aria-label="Main navigation" className="h-full hidden md:flex">
          <ul className="flex h-full items-center gap-0">
            <li className="flex h-full items-center bg-[var(--foreground)] px-3">
              <button
                type="button"
                onClick={open}
                aria-label="Open menu"
                aria-haspopup="dialog"
                className="flex h-full items-center transition-transform hover:scale-105"
              >
                <TfiMenuAlt className="text-2xl text-surface" />
              </button>
            </li>

            <li className={liClass("/")}>
              <Link href="/" className={linkTextClass("/")}>
                Home
              </Link>
            </li>

            {categories.slice(0, 6).map((category) => {
              const href = `/category/${category.slug}`;
              return (
                <li key={category.id} className={liClass(href, category.slug)}>
                  <Link href={href} className={linkTextClass(href, category.slug)}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Logo className="flex md:hidden !w-[140px]" />

        <div className="ml-auto flex h-full items-center gap-5">
          <SearchTrigger />
          <LinkButton className="group hidden md:inline-flex" href={"/contact"}>
            Contact Us
            <TbWorldShare className="ml-2 !text-[24px] group-hover:translate-y-0" />
          </LinkButton>
          <MobileMenuButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;