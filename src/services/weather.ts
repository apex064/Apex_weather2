export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  condition: WeatherCondition;
  is_day: number;
}

export interface Location {
  name: string;
  region: string;
  country: string;
}

export interface HourlyWeather {
  time: string;
  temp_c: number;
  condition: WeatherCondition;
}

export interface ForecastDay {
  hour: HourlyWeather[];
}

export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}

export interface ForecastApiResponse {
  forecast: {
    forecastday: ForecastDay[];
  };
}