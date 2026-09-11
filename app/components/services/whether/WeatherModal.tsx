"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HiOutlineX, HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";
import { WiHumidity, WiStrongWind, WiRaindrop } from "react-icons/wi";
import { WeatherData } from "./types";
import { getWeatherInfo } from "./weatherCodes";
import { getWeatherByCoords } from "@/app/lib/api/weather";
import { searchCities, CitySearchResult } from "@/app/lib/api/geolocation";

type WeatherModalProps = {
  weather: WeatherData;
  onClose: () => void;
  onWeatherChange: (weather: WeatherData) => void;
};

const WeatherModal = ({ weather, onClose, onWeatherChange }: WeatherModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [switching, setSwitching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Debounced city search as the user types
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      const cities = await searchCities(query);
      setResults(cities);
      setSearching(false);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelectCity = useCallback(
    async (city: CitySearchResult) => {
      setSwitching(true);
      setResults([]);
      setQuery("");

      const displayName = city.admin1 ? `${city.name}, ${city.admin1}` : city.name;
      const newWeather = await getWeatherByCoords(city.latitude, city.longitude, displayName);

      if (newWeather) {
        onWeatherChange(newWeather);
        setSelectedIndex(0);
      }
      setSwitching(false);
    },
    [onWeatherChange]
  );

  const isToday = selectedIndex === 0;
  const selectedDay = weather.daily[selectedIndex];
  const detail = getWeatherInfo(isToday ? weather.current.weatherCode : selectedDay.weatherCode);
  const DetailIcon = detail.icon;

  const dayLabel = (date: string, i: number) =>
    i === 0 ? "Today" : new Date(date).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Weather forecast"
        className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-[var(--background)] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Weather
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[var(--background-muted)] hover:text-accent"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* City search */}
        <div className="relative mb-4">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
            <HiOutlineSearch className="h-4 w-4 shrink-0 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a city..."
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>

          {(results.length > 0 || searching) && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-[var(--background)] shadow-lg">
              {searching && (
                <p className="px-3 py-2 text-xs text-muted">Searching...</p>
              )}
              {results.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition hover:bg-[var(--background-muted)]"
                >
                  <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {city.name}
                    {city.admin1 ? `, ${city.admin1}` : ""}
                    <span className="text-muted"> · {city.country}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {switching ? (
          <div className="flex items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          </div>
        ) : (
          <>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              {weather.city}
            </p>

            <div className="flex items-center gap-4 border-b border-border pb-5">
              <DetailIcon className="h-16 w-16 text-accent" />
              <div>
                <p className="text-3xl font-bold tabular-nums text-foreground">
                  {isToday ? weather.current.temperature : selectedDay.maxTemp}°C
                </p>
                <p className="text-sm text-muted">{detail.label}</p>
                {isToday ? (
                  <p className="text-xs text-muted">
                    Feels like {weather.current.apparentTemperature}°C
                  </p>
                ) : (
                  <p className="text-xs text-muted">
                    {selectedDay.minTemp}° / {selectedDay.maxTemp}°
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              {isToday ? (
                <>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <WiHumidity className="h-5 w-5 text-accent" />
                    {weather.current.humidity}% humidity
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <WiStrongWind className="h-5 w-5 text-accent" />
                    {weather.current.windSpeed} km/h
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <WiRaindrop className="h-5 w-5 text-accent" />
                    {selectedDay.precipitationProbability}% rain
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <WiStrongWind className="h-5 w-5 text-accent" />
                    {selectedDay.windSpeedMax} km/h
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 grid grid-cols-5 gap-1.5 border-t border-border pt-5">
              {weather.daily.map((day, i) => {
                const { icon: DayIcon } = getWeatherInfo(day.weatherCode);
                const isSelected = i === selectedIndex;

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className={`flex flex-col items-center gap-1 rounded-lg py-2 transition ${
                      isSelected ? "bg-accent/10" : "hover:bg-[var(--background-muted)]"
                    }`}
                  >
                    <span className={`text-[11px] font-medium ${isSelected ? "text-accent" : "text-muted"}`}>
                      {dayLabel(day.date, i)}
                    </span>
                    <DayIcon className="h-6 w-6 text-accent" />
                    <span className="text-[11px] font-semibold tabular-nums text-foreground">
                      {day.maxTemp}°
                    </span>
                    <span className="text-[11px] tabular-nums text-muted">{day.minTemp}°</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherModal;