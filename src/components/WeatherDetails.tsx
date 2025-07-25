import { Wind, Droplets, Thermometer } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherDetailsProps {
  wind: number;
  humidity: number;
  feelsLike: number;
}

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
}

function DetailCard({ icon, label, value, unit }: DetailCardProps) {
  return (
    <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
          {icon}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {label}
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-semibold text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function WeatherDetails({ wind, humidity, feelsLike }: WeatherDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium text-foreground">Weather Details</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <DetailCard
          icon={<Wind className="h-6 w-6 text-primary" />}
          label="Wind Speed"
          value={wind.toString()}
          unit="km/h"
        />
        <DetailCard
          icon={<Droplets className="h-6 w-6 text-primary" />}
          label="Humidity"
          value={humidity.toString()}
          unit="%"
        />
        <DetailCard
          icon={<Thermometer className="h-6 w-6 text-primary" />}
          label="Feels Like"
          value={feelsLike.toString()}
          unit="°C"
        />
      </div>
    </div>
  );
}