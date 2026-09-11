import DateTime from "@/app/lib/utils/DateTime";

import SocialLinks from "@/app/components/layout/SocialLinks";
import { getWeather } from "@/app/lib/api/weather";
import { Logo } from "./Logo";
import WeatherTrigger from "../services/whether/WeatherTrigger";

const TopBar = async () => {
  const weather = await getWeather();

  return (
    <div className="w-full border-b border-accent/40 py-1">
      <div className="flex h-9 site-container items-center justify-between sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <div className="flex gap-2 items-center">
          <Logo className="max-w-[120px] hidden md:flex" />
          <span className="hidden md:flex">|</span>
          <DateTime />
        </div>

        <div className="sm:flex sm:justify-center">
          {weather && <WeatherTrigger weather={weather} />}
        </div>

        <div className="flex justify-end">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default TopBar;