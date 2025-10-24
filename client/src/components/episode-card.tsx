import { Play, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Episode } from "@shared/schema";

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

export function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const duration = episode.duration ? `${Math.floor(episode.duration / 60)} min` : null;

  return (
    <Card 
      className="group overflow-hidden border-card-border bg-card hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={() => onPlay(episode)}
      data-testid={`card-episode-${episode.number}`}
    >
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-28 h-20 flex-shrink-0 rounded overflow-hidden bg-muted">
          {episode.thumbnail ? (
            <img
              src={episode.thumbnail}
              alt={`Episode ${episode.number}`}
              className="w-full h-full object-cover"
              data-testid={`img-episode-${episode.number}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
          </div>

          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm" data-testid={`text-episode-number-${episode.number}`}>
                Episode {episode.number}
              </h4>
              <p className="text-sm font-medium line-clamp-1" data-testid={`text-episode-title-${episode.number}`}>
                {episode.title}
              </p>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(episode);
              }}
              data-testid={`button-play-${episode.number}`}
            >
              <Play className="w-4 h-4" />
            </Button>
          </div>
          
          {episode.synopsis && (
            <p className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-episode-synopsis-${episode.number}`}>
              {episode.synopsis}
            </p>
          )}
          
          {episode.airDate && (
            <p className="text-xs text-muted-foreground" data-testid={`text-episode-date-${episode.number}`}>
              {new Date(episode.airDate).toLocaleDateString('id-ID', { 
                day: 'numeric',
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
