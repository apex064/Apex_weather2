import { Cloud, CloudRain, Sun, CloudSnow, Wind } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WeatherIconProps {
  condition: string;
  iconUrl?: string;
  size?: number;
  className?: string;
}

export function WeatherIcon({ condition, iconUrl, size = 80, className = "" }: WeatherIconProps) {
  // If we have a real weather API icon URL, use it
  if (iconUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <ImageWithFallback
          src={iconUrl.startsWith('http') ? iconUrl : `https:${iconUrl}`}
          alt={condition}
          className="drop-shadow-lg"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
    );
  }

  // Fallback to Lucide icons with professional styling
  const iconProps = { size, className: `drop-shadow-lg ${className}` };

  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun {...iconProps} className={`text-yellow-500 drop-shadow-lg ${className}`} />;
    case 'cloudy':
    case 'partly cloudy':
      return <Cloud {...iconProps} className={`text-slate-400 drop-shadow-lg ${className}`} />;
    case 'rainy':
    case 'rain':
      return <CloudRain {...iconProps} className={`text-blue-500 drop-shadow-lg ${className}`} />;
    case 'snowy':
    case 'snow':
      return <CloudSnow {...iconProps} className={`text-blue-200 drop-shadow-lg ${className}`} />;
    case 'windy':
      return <Wind {...iconProps} className={`text-slate-500 drop-shadow-lg ${className}`} />;
    default:
      return <Sun {...iconProps} className={`text-yellow-500 drop-shadow-lg ${className}`} />;
  }
}