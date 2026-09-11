"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { WeatherData } from "./types";
import { getWeatherInfo } from "./weatherCodes";
import { getWeatherByCoords } from "@/app/lib/api/weather";
import { reverseGeocodeCity } from "@/app/lib/api/geolocation";

const WeatherModal = dynamic(() => import("./WeatherModal"), { ssr: false });

const GEO_PROMPT_DELAY = 40000; // 40 seconds after page load
const GEO_STORAGE_KEY = "weather-geo-permission";

type WeatherTriggerProps = {
  weather: WeatherData; // server-rendered default (Kolkata) — always the fallback
};

const WeatherTrigger = ({ weather: initialWeather }: WeatherTriggerProps) => {
  const [weather, setWeather] = useState(initialWeather);
  const [isOpen, setIsOpen] = useState(false);
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    const storedPermission = localStorage.getItem(GEO_STORAGE_KEY);
    if (storedPermission === "denied") return; // respect a prior decline, don't nag every visit

    const requestLocation = () => {
      if (attemptedRef.current) return;
      attemptedRef.current = true;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          localStorage.setItem(GEO_STORAGE_KEY, "granted");
          const { latitude, longitude } = position.coords;
          const city = (await reverseGeocodeCity(latitude, longitude)) ?? "Your area";
          const localWeather = await getWeatherByCoords(latitude, longitude, city);
          if (localWeather) setWeather(localWeather);
        },
        () => {
          localStorage.setItem(GEO_STORAGE_KEY, "denied");
          // no-op — keep showing the default city already loaded
        },
        { timeout: 10000 }
      );
    };

    // Already granted before? Ask again right away, no need to wait. Otherwise, wait 40s.
    const delay = storedPermission === "granted" ? 0 : GEO_PROMPT_DELAY;
    const timer = setTimeout(requestLocation, delay);
    return () => clearTimeout(timer);
  }, []);

  const { icon: Icon } = getWeatherInfo(weather.current.weatherCode);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-accent"
      >
        <Icon className="h-4 w-4 text-accent" />
        <span className="tabular-nums">{weather.current.temperature}°C</span>
        <span className="hidden text-muted/70 md:inline">{weather.city}</span>
      </button>

      {isOpen && <WeatherModal weather={weather} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default WeatherTrigger;