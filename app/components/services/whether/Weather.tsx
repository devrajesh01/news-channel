"use client";

import { WiDaySunny } from "react-icons/wi";

const Weather = () => {
  // Static placeholder — swap in real location + live data once that's wired up.
  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
      <WiDaySunny className="h-4 w-4 text-accent" />
      <span className="tabular-nums">28°C</span>
      <span className="hidden text-muted/70 md:inline">Kolkata</span>
    </div>
  );
};
export default Weather;