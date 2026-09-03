import Link from "next/link";
import Image from "next/image";
import BreakingNews from "./BreakingNews";
import Advertisement from "./Advertisement";
import Navbar from "./Navbar";
import { getCategories } from "@/app/lib/api/posts";

const Header = async () => {
  const categories = await getCategories(); 
  return (
    <header className="border-border ">
      <BreakingNews />
      <div className="site-container">
        <div className="w-full flex min-h-24 items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center  gap-3"
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
          <Advertisement />
        </div>

        <Navbar categories={categories} />
      </div>
    </header>
  );
};

export default Header;