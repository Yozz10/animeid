import { Play, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import type { WatchHistory } from "@shared/schema";

interface ContinueWatchingProps {
  history: WatchHistory[];
}

export function ContinueWatching({ history }: ContinueWatchingProps) {
  const [, setLocation] = useLocation();

  if (history.length === 0) {
    return null;
  }

  const handleContinueWatching = (item: WatchHistory) => {
    setLocation(`/watch/${item.animeId}/${item.episodeNumber}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold font-display" data-testid="heading-continue-watching">
          Lanjutkan Menonton
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.slice(0, 6).map((item) => (
          <Card 
            key={item.id}
            className="group overflow-hidden border-card-border bg-card hover-elevate active-elevate-2 cursor-pointer"
            onClick={() => handleContinueWatching(item)}
            data-testid={`card-continue-${item.animeId}`}
          >
            <div className="flex gap-3 p-3">
              {/* Thumbnail */}
              <div className="relative w-28 h-20 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={item.animePoster || "/placeholder-anime.jpg"}
                  alt={item.animeTitle || "Anime"}
                  className="w-full h-full object-cover"
                  data-testid={`img-continue-${item.animeId}`}
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground fill-current" />
                  </div>
                </div>

                {/* Progress bar overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium text-sm line-clamp-1" data-testid={`text-continue-title-${item.animeId}`}>
                    {item.animeTitle}
                  </h4>
                  <p className="text-xs text-muted-foreground" data-testid={`text-continue-episode-${item.animeId}`}>
                    Episode {item.episodeNumber}
                    {item.episodeTitle && ` - ${item.episodeTitle}`}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Progress value={item.progress} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(item.progress)}% selesai
                  </p>
                </div>
              </div>

              <Button 
                size="icon" 
                variant="ghost"
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContinueWatching(item);
                }}
                data-testid={`button-continue-${item.animeId}`}
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
