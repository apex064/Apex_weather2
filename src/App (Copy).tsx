import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherIcon } from './components/WeatherIcon';
import { HourlyForecast } from './components/HourlyForecast';
import { WeatherDetails } from './components/WeatherDetails';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { fetchWeatherData, WeatherData } from './services/weatherService';
import { toast } from 'sonner';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

// Default weather data for initial state
const defaultWeather: WeatherData = {
  location: 'Your City',
  temperature: 20,
  condition: 'Sunny',
  iconUrl: '',
  wind: 10,
  humidity: 60,
  feelsLike: 22,
  isDay: true,
  hourlyForecast: []
};

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeather);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // Dynamic background based on weather condition and time of day
  const getBackgroundGradient = (condition: string, isDay: boolean) => {
    const conditionLower = condition.toLowerCase();
    
    if (!isDay) {
      // Night backgrounds - elegant and professional
      if (conditionLower.includes('clear')) {
        return 'from-slate-900 via-indigo-900 to-purple-900';
      } else if (conditionLower.includes('cloud')) {
        return 'from-slate-900 via-slate-800 to-slate-900';
      } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        return 'from-slate-900 via-blue-900 to-slate-800';
      }
      return 'from-slate-900 via-indigo-900 to-purple-900';
    }

    // Day backgrounds - clean and modern
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return 'from-blue-400 via-cyan-400 to-blue-500';
    } else if (conditionLower.includes('cloud')) {
      return 'from-slate-400 via-slate-500 to-slate-600';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
      return 'from-slate-600 via-blue-700 to-slate-800';
    } else if (conditionLower.includes('snow') || conditionLower.includes('ice')) {
      return 'from-blue-200 via-slate-300 to-blue-400';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
      return 'from-slate-300 via-slate-400 to-slate-500';
    }
    
    return 'from-blue-400 via-cyan-400 to-blue-500';
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      toast.success(`Weather loaded for ${data.location}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (weatherData.location !== 'Your City') {
      handleSearch(weatherData.location);
    } else {
      handleSearch('London');
    }
  };

  // Load default city weather on mount
  useEffect(() => {
    setInitialLoad(true);
    handleSearch('London').finally(() => setInitialLoad(false));
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weatherData.condition, weatherData.isDay)} transition-all duration-1000 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-transparent to-background/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
      
      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with search and theme toggle */}
        <header className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Top bar with branding and theme toggle */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-background/20 backdrop-blur-md border border-border/30">
                  <MapPin className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h1 className="text-foreground/90 font-semibold">Weather Dashboard</h1>
                  <div className="flex items-center gap-2 text-foreground/70 text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>{currentDate}</span>
                    <span>•</span>
                    <span>{currentTime}</span>
                  </div>
                </div>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Search bar */}
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

        {/* Main weather content */}
        <main className="flex-1 px-6 sm:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Current weather display */}
            <div className="mb-8">
              <Card className="p-8 sm:p-12 rounded-[2rem] bg-card/80 backdrop-blur-xl border-border/30 shadow-2xl">
                {loading && initialLoad ? (
                  <div className="text-center py-12">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary mx-auto mb-6"></div>
                      <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
                    </div>
                    <p className="text-muted-foreground font-medium">Loading weather data...</p>
                  </div>
                ) : error ? (
                  <ErrorState error={error} onRetry={handleRetry} />
                ) : (
                  <div className="text-center space-y-8">
                    {/* Location and status */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <h2 className="text-3xl font-semibold text-foreground">
                          {weatherData.location}
                        </h2>
                        <Badge 
                          variant={weatherData.isDay ? "default" : "secondary"} 
                          className="text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {weatherData.isDay ? "Day" : "Night"}
                        </Badge>
                      </div>
                    </div>

                    {/* Weather icon and temperature */}
                    <div className="space-y-6">
                      <div className="relative">
                        <WeatherIcon 
                          condition={weatherData.condition} 
                          iconUrl={weatherData.iconUrl}
                          size={140}
                          className="mx-auto drop-shadow-2xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-7xl font-light text-foreground tracking-tight">
                            {weatherData.temperature}
                          </span>
                          <span className="text-3xl text-muted-foreground mt-4 font-light">°C</span>
                        </div>
                        <p className="text-2xl text-muted-foreground font-medium">
                          {weatherData.condition}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Detailed weather information */}
            {!loading && !error && (
              <div className="space-y-8">
                <Card className="p-8 rounded-[2rem] bg-card/80 backdrop-blur-xl border-border/30 shadow-2xl">
                  {loading && !initialLoad ? (
                    <LoadingState />
                  ) : (
                    <div className="space-y-10">
                      {weatherData.hourlyForecast.length > 0 && (
                        <HourlyForecast forecast={weatherData.hourlyForecast} />
                      )}
                      <WeatherDetails 
                        wind={weatherData.wind}
                        humidity={weatherData.humidity}
                        feelsLike={weatherData.feelsLike}
                      />
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeatherApp />
    </ThemeProvider>
  );
}
