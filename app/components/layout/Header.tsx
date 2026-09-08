import Link from "next/link";
import Image from "next/image";
import BreakingNews from "./BreakingNews";
import Advertisement from "./Advertisement";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileMenuButton from "./MobileMenuButton";
import { SidebarProvider } from "./SidebarProvider";
import { getCategories } from "@/app/lib/api/posts";

const Header = async () => {
  const categories = await getCategories();

  return (
    <SidebarProvider>
      <header className="relative z-50">
        {/* Non-sticky: scrolls away with the page */}
        <div className="hidden border-b border-border lg:block">
          <div className="site-container flex min-h-[90px] items-center justify-center">
            <Advertisement />
          </div>
        </div>

        {/* Sticky: pins to the top once the ad scrolls past */}
        <div className="sticky top-0 z-50 border-b border-border bg-[var(--background)] shadow-sm">
          <BreakingNews />

          <div className="site-container flex h-16 items-center justify-between md:h-20">
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
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>

            <MobileMenuButton />
          </div>

          <Navbar categories={categories} />
        </div>
      </header>

      <Sidebar categories={categories} />
    </SidebarProvider>
  );
};

export default Header;