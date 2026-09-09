import Advertisement from "./Advertisement";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileMenuButton from "./MobileMenuButton";
import { SidebarProvider } from "./SidebarProvider";
import { getCategories } from "@/app/lib/api/posts";
import TopBar from "./TopBar";
import { Logo } from "./Logo";

const Header = async () => {
  const categories = await getCategories();
  return (
    <SidebarProvider>
      <header className="sticky top-0 z-50 bg-[var(--background-muted)] md:bg-[var(--background)]">
        <TopBar />
        <div className="site-container">
          <div className="flex items-center justify-between">
            <Navbar categories={categories} />           
          </div>
        </div>
      </header>
      <Sidebar categories={categories} />
    </SidebarProvider>
  );
};
export default Header;