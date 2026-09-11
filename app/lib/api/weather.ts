import { DailyForecast, WeatherData } from "@/app/components/services/whether/types";


const DEFAULT_LATITUDE = 22.5726;
const DEFAULT_LONGITUDE = 88.3639;
const DEFAULT_CITY = "Kolkata";

const CURRENT_PARAMS =
  "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m";
const DAILY_PARAMS =
  "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,wind_speed_10m_max";

function buildForecastUrl(lat: number, lon: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", CURRENT_PARAMS);
  url.searchParams.set("daily", DAILY_PARAMS);
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "5");
  return url.toString();
}

function parseWeatherData(data: any, city: string): WeatherData {
  const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    maxTemp: Math.round(data.daily.temperature_2m_max[i]),
    minTemp: Math.round(data.daily.temperature_2m_min[i]),
    apparentMaxTemp: Math.round(data.daily.apparent_temperature_max[i]),
    apparentMinTemp: Math.round(data.daily.apparent_temperature_min[i]),
    precipitationProbability: data.daily.precipitation_probability_max?.[i] ?? 0,
    windSpeedMax: Math.round(data.daily.wind_speed_10m_max[i]),
  }));

  return {
    city,
    current: {
      temperature: Math.round(data.current.temperature_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      weatherCode: data.current.weather_code,
    },
    daily,
  };
}

// Server-side, fixed city — cached 30 min, used for the initial server-rendered TopBar
export async function getWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(buildForecastUrl(DEFAULT_LATITUDE, DEFAULT_LONGITUDE), {
      next: { revalidate: 1800, tags: ["weather"] },
    });
    if (!res.ok) return null;
    return parseWeatherData(await res.json(), DEFAULT_CITY);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
}

// Client-side, visitor's real coordinates — per-user, no shared cache
export async function getWeatherByCoords(
  lat: number,
  lon: number,
  city: string
): Promise<WeatherData | null> {
  try {
    const res = await fetch(buildForecastUrl(lat, lon));
    if (!res.ok) return null;
    return parseWeatherData(await res.json(), city);
  } catch (error) {
    console.error("Weather fetch (by coords) failed:", error);
    return null;
  }
}