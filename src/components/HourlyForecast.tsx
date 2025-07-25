import { WeatherIcon } from './WeatherIcon';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';

interface HourlyData {
  time: string;
  temp: number;
  condition: string;
  iconUrl?: string;
}

interface HourlyForecastProps {
  forecast: HourlyData[];
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium text-foreground">24-Hour Forecast</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>
      
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {forecast.map((hour, index) => (
            <Card
              key={index}
              className="flex flex-col items-center space-y-4 min-w-[100px] p-5 rounded-3xl bg-card/70 backdrop-blur-md border-border/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {hour.time}
              </span>
              <div className="flex items-center justify-center h-10">
                <WeatherIcon 
                  condition={hour.condition} 
                  iconUrl={hour.iconUrl}
                  size={36} 
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="font-semibold text-foreground text-base">
                {hour.temp}°
              </span>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}