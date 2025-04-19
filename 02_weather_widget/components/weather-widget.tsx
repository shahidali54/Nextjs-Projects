"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation === "") {
      setError("Please enter a valid location.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      const weatherData: WeatherData = {
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  function getTemperatureMessage(temperature: number, unit: string): string {
    if (unit === "C") {
      if (temperature < 0) return `It's freezing at ${temperature}°C! Bundle up!`;
      else if (temperature < 10) return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
      else if (temperature < 20) return `The temperature is ${temperature}°C. Light jacket weather.`;
      else if (temperature < 30) return `It's a pleasant ${temperature}°C. Enjoy!`;
      else return `It's hot at ${temperature}°C. Stay hydrated!`;
    }
    return `${temperature}°${unit}`;
  }

  function getWeatherMessage(description: string): string {
    switch (description.toLowerCase()) {
      case "sunny":
        return "It's a beautiful sunny day!";
      case "partly cloudy":
        return "Expect some clouds and sunshine.";
      case "cloudy":
        return "It's cloudy today.";
      case "overcast":
        return "The sky is overcast.";
      case "rain":
        return "Don't forget your umbrella!";
      case "thunderstorm":
        return "Thunderstorms are expected.";
      case "snow":
        return "Bundle up! It's snowing.";
      case "mist":
        return "It's misty outside.";
      case "fog":
        return "Be careful, there's fog outside.";
      default:
        return description;
    }
  }

  function getLocationMessage(location: string): string {
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    return `${location} ${isNight ? "at Night" : "During the Day"}`;
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300 dark:from-gray-800 dark:to-gray-900 transition-all">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-blue-200 dark:border-gray-700 p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-sky-800 dark:text-sky-200">
            Weather Widget
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
            Enter a city to get the latest weather updates.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <Input
              type="text"
              placeholder="e.g. Karachi"
              value={location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
              className="w-full text-base py-2 focus:ring-2 focus:ring-sky-500"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-sky-600 hover:bg-sky-700 text-white"
            >
              {isLoading ? "Loading..." : "Search"}
            </Button>
          </form>

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {weather && (
            <div className="mt-6 grid gap-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <ThermometerIcon className="text-sky-500" />
                <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {getTemperatureMessage(weather.temperature, weather.unit)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CloudIcon className="text-blue-400" />
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  {getWeatherMessage(weather.description)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="text-red-400" />
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  {getLocationMessage(weather.location)}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
