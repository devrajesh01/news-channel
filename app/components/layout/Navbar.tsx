"use client";

import Link from "next/link";
import { TbWorldShare } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { Category } from "@/app/types/category";
import { SearchTrigger } from "../search";
import LinkButton from "@/app/components/ui/LinkButton";
import { useSidebar } from "./SidebarProvider";

type NavbarProps = {
  categories: Category[];
};

const Navbar = ({ categories }: NavbarProps) => {
  const pathname = usePathname();
  const { open } = useSidebar();

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
    <div className="hidden bg-[var(--background-muted)] md:block">
      <div className="flex h-12 w-full items-center justify-between">
        <nav aria-label="Main navigation" className="h-full">
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
                <li key={category.id} className={liClass(href)}>
                  <Link href={href} className={linkTextClass(href)}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex h-full items-center gap-5">
          <SearchTrigger />
          <LinkButton className="group" href={"/"}>
            View All
            <TbWorldShare className="ml-2 !text-[24px] group-hover:translate-y-0" />
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;