import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <Card className="p-10 rounded-3xl bg-card/70 backdrop-blur-md border-border/30 shadow-lg text-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="p-4 rounded-3xl bg-destructive/10">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground text-lg">Weather data unavailable</h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            {error}
          </p>
        </div>
        <Button 
          onClick={onRetry}
          className="mt-2 h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
          variant="default"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </Card>
  );
}