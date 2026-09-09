"use client";
import { useEffect, useState } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setDateTime(new Date());
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!dateTime) {
    return (
      <div className="flex items-center justify-between gap-1.5 w-[150px] sm:w-[190px] text-[11px] sm:text-xs invisible">
        <p className="tabular-nums">Jan 1, 2026</p>
        <p>|</p>
        <p className="w-[70px] sm:w-[85px] flex justify-between items-center tabular-nums">
          00:00 AM
        </p>
      </div>
    );
  }

  const date = dateTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center justify-between  w-[160px] sm:w-[190px] text-[11px] sm:text-xs text-foreground">
      <p className="tabular-nums">{date}</p>
      <p className="text-muted">|</p>
      <p className="w-[60px] sm:w-[85px] flex justify-between items-center tabular-nums">
        {time} IST
      </p>
    </div>
  );
};
export default DateTime;