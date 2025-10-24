import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import type { Anime } from "@shared/schema";

interface AnimeHeroProps {
  anime: Anime;
}

export function AnimeHero({ anime }: AnimeHeroProps) {
  const [, setLocation] = useLocation();
  const rating = anime.averageRating ? (anime.averageRating / 10).toFixed(1) : null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg" data-testid="section-hero">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={anime.coverImage || anime.posterImage || "/placeholder-anime.jpg"}
          alt={anime.title}
          className="w-full h-full object-cover"
          data-testid="img-hero-backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex items-end pb-12 md:pb-16">
        <div className="max-w-2xl space-y-4">
          {/* Badge */}
          <Badge 
            variant="default" 
            className="bg-primary text-primary-foreground font-bold px-3 py-1"
            data-testid="badge-featured"
          >
            #1 Trending
          </Badge>

          {/* Title */}
          <h1 
            className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg line-clamp-2"
            data-testid="text-hero-title"
          >
            {anime.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-sm text-white/90">
            {rating && (
              <div className="flex items-center gap-1" data-testid="text-hero-rating">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{rating}</span>
              </div>
            )}
            {anime.episodeCount && (
              <>
                <span>•</span>
                <span data-testid="text-hero-episodes">{anime.episodeCount} Episodes</span>
              </>
            )}
            {anime.status && (
              <>
                <span>•</span>
                <span data-testid="text-hero-status">{anime.status}</span>
              </>
            )}
          </div>

          {/* Synopsis */}
          {anime.synopsis && (
            <p className="text-white/80 text-sm md:text-base line-clamp-3 max-w-xl" data-testid="text-hero-synopsis">
              {anime.synopsis}
            </p>
          )}

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {anime.genres.slice(0, 4).map((genre) => (
                <Badge 
                  key={genre} 
                  variant="outline" 
                  className="bg-background/20 backdrop-blur-sm border-white/30 text-white"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => setLocation(`/anime/${anime.id}`)}
              data-testid="button-watch-now"
            >
              <Play className="w-5 h-5" />
              Tonton Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              onClick={() => setLocation(`/anime/${anime.id}`)}
              data-testid="button-more-info"
            >
              <Info className="w-5 h-5" />
              Info Lengkap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
