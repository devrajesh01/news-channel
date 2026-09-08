"use client";

import { HiOutlineMenu } from "react-icons/hi";
import { useSidebar } from "./SidebarProvider";

const MobileMenuButton = () => {
  const { open } = useSidebar();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open menu"
      aria-haspopup="dialog"
      className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-[var(--background-muted)] hover:text-accent md:hidden"
    >
      <HiOutlineMenu className="h-6 w-6" />
    </button>
  );
};

export default MobileMenuButton;