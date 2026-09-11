export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
};

export type DailyForecast = {
  date: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  apparentMaxTemp: number;
  apparentMinTemp: number;
  precipitationProbability: number;
  windSpeedMax: number;
};

export type WeatherData = {
  city: string;
  current: CurrentWeather;
  daily: DailyForecast[];
};