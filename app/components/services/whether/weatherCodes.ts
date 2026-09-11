import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiDayRain,
  WiRain,
  WiSnow,
  WiShowers,
  WiThunderstorm,
} from "react-icons/wi";
import { IconType } from "react-icons";

type WeatherCodeInfo = {
  label: string;
  icon: IconType;
};

// WMO weather codes, as returned by Open-Meteo
export const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  0: { label: "Clear sky", icon: WiDaySunny },
  1: { label: "Mainly clear", icon: WiDaySunny },
  2: { label: "Partly cloudy", icon: WiDayCloudy },
  3: { label: "Overcast", icon: WiCloudy },
  45: { label: "Fog", icon: WiFog },
  48: { label: "Fog", icon: WiFog },
  51: { label: "Light drizzle", icon: WiDayRain },
  53: { label: "Drizzle", icon: WiDayRain },
  55: { label: "Dense drizzle", icon: WiDayRain },
  61: { label: "Light rain", icon: WiRain },
  63: { label: "Rain", icon: WiRain },
  65: { label: "Heavy rain", icon: WiRain },
  71: { label: "Light snow", icon: WiSnow },
  73: { label: "Snow", icon: WiSnow },
  75: { label: "Heavy snow", icon: WiSnow },
  80: { label: "Rain showers", icon: WiShowers },
  81: { label: "Rain showers", icon: WiShowers },
  82: { label: "Violent showers", icon: WiShowers },
  95: { label: "Thunderstorm", icon: WiThunderstorm },
};

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return weatherCodeMap[code] ?? { label: "Unknown", icon: WiDayCloudy };
}