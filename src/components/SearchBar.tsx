import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBarProps {
  onSearch: (city: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search for a city..." }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get('city') as string;
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          name="city"
          placeholder={placeholder}
          className="h-14 pl-6 pr-16 text-base rounded-3xl bg-background/90 backdrop-blur-md border-border/30 shadow-lg hover:shadow-xl focus:shadow-xl text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
        />
        <Button 
          type="submit" 
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}