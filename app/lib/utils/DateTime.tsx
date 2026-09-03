"use client";

import { useEffect, useState } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = dateTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex gap-2" >
      <p>{day}</p>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
};
export default DateTime;