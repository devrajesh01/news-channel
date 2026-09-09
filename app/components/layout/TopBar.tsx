import DateTime from "@/app/lib/utils/DateTime";
import Weather from "@/app/components/services/whether/Weather";
import SocialLinks from "@/app/components/layout/SocialLinks";
import { Logo } from "./Logo";

const TopBar = () => {
  return (
    <div className="w-full border-b border-accent/40  py-1">
      <div className="flex h-9 site-container items-center justify-between sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <div className="flex gap-2 items-center">
           <Logo className="max-w-[120px] hidden md:flex" />
           <span className="hidden md:flex" >|</span>
           <DateTime />
        </div>
        
        <div className="sm:flex sm:justify-center">
          <Weather />
        </div>
        <div className="flex justify-end">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default TopBar;