import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function LoadingState() {
  return (
    <div className="space-y-8">
      {/* Main weather loading */}
      <div className="flex flex-col items-center space-y-6">
        <Skeleton className="w-36 h-36 rounded-full bg-muted/50" />
        <div className="space-y-3 text-center">
          <Skeleton className="h-20 w-40 rounded-2xl bg-muted/50" />
          <Skeleton className="h-6 w-32 rounded-xl bg-muted/50" />
          <Skeleton className="h-5 w-24 rounded-xl bg-muted/50" />
        </div>
      </div>

      {/* Hourly forecast loading */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-36 rounded-xl bg-muted/50" />
        <div className="flex space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="min-w-[100px] p-5 rounded-3xl bg-card/70 backdrop-blur-md border-border/30 space-y-4">
              <Skeleton className="h-4 w-10 mx-auto rounded-lg bg-muted/50" />
              <Skeleton className="h-10 w-10 mx-auto rounded-2xl bg-muted/50" />
              <Skeleton className="h-6 w-8 mx-auto rounded-lg bg-muted/50" />
            </Card>
          ))}
        </div>
      </div>

      {/* Weather details loading */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-32 rounded-xl bg-muted/50" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border/30 space-y-4">
              <Skeleton className="h-12 w-12 mx-auto rounded-2xl bg-muted/50" />
              <Skeleton className="h-4 w-20 mx-auto rounded-lg bg-muted/50" />
              <Skeleton className="h-8 w-16 mx-auto rounded-lg bg-muted/50" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}