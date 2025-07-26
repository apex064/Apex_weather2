//import type { WeatherApiResponse, ForecastApiResponse } from "./weather";

// WeatherAPI constants
const API_KEY = "4d8081e53623433a822115507252506";
const BASE_URL = "https://api.weatherapi.com/v1";

// Define interfaces for the weather response
export interface WeatherApiResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
    is_day: number;
  };
}

export interface ForecastApiResponse {
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  iconUrl: string;
  wind: number;
  humidity: number;
  feelsLike: number;
  isDay: boolean;
  hourlyForecast: Array<{
    time: string;
    temp: number;
    condition: string;
    iconUrl: string;
  }>;
}

function formatHour(hour: number): string {
  if (hour === 0) return "12AM";
  if (hour < 12) return `${hour}AM`;
  if (hour === 12) return "12PM";
  return `${hour - 12}PM`;
}

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  if (!city.trim()) {
    throw new Error("Please enter a city name");
  }

  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`
    );

    if (!currentResponse.ok) {
      throw new Error("City not found or API error");
    }

    const currentData: WeatherApiResponse = await currentResponse.json();

    // Fetch forecast data
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=1`
    );

    if (!forecastResponse.ok) {
      throw new Error("Unable to fetch forecast data");
    }

    const forecastData: ForecastApiResponse = await forecastResponse.json();

    // Process current weather data
    const { temp_c, feelslike_c, humidity, wind_kph, condition, is_day } =
      currentData.current;
    const locationName = currentData.location.name;

    // Process hourly forecast (every 3 hours for 6 entries)
    const forecastHours = forecastData.forecast.forecastday[0]?.hour ?? [];
    const hourlyForecast = [];

    for (let i = 0; i < 6; i++) {
      const hourData = forecastHours[i * 3];
      if (hourData) {
        const time = new Date(hourData.time).getHours();
        hourlyForecast.push({
          time: i === 0 ? "Now" : formatHour(time),
          temp: Math.round(hourData.temp_c),
          condition: hourData.condition.text,
          iconUrl: `https:${hourData.condition.icon}`,
        });
      }
    }

    // Return processed data
    return {
      location: locationName,
      temperature: Math.round(temp_c),
      condition: condition.text,
      iconUrl: `https:${condition.icon}`,
      wind: wind_kph,
      humidity,
      feelsLike: Math.round(feelslike_c),
      isDay: is_day === 1,
      hourlyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error; // Rethrow to let higher levels handle if necessary
  }
}

