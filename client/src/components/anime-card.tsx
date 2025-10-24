import { Link } from "wouter";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Anime } from "@shared/schema";

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const rating = anime.averageRating ? (anime.averageRating / 10).toFixed(1) : "N/A";
  
  return (
    <Link href={`/anime/${anime.id}`}>
      <Card 
        className="group relative overflow-hidden border-0 bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        data-testid={`card-anime-${anime.id}`}
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={anime.posterImage || "/placeholder-anime.jpg"}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-poster-${anime.id}`}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge */}
          {anime.averageRating && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-white" data-testid={`text-rating-${anime.id}`}>
                {rating}
              </span>
            </div>
          )}
          
          {/* Episode count */}
          {anime.episodeCount && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-primary/90 text-primary-foreground hover:bg-primary"
              data-testid={`badge-episodes-${anime.id}`}
            >
              {anime.episodeCount} Eps
            </Badge>
          )}
          
          {/* Title overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-sm text-white line-clamp-2 mb-1" data-testid={`text-title-${anime.id}`}>
              {anime.title}
            </h3>
            {anime.genres && anime.genres.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {anime.genres.slice(0, 2).map((genre) => (
                  <span 
                    key={genre} 
                    className="text-xs text-muted-foreground bg-background/50 px-2 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Title below card (always visible on mobile) */}
        <div className="p-2 md:hidden">
          <h3 className="font-medium text-sm line-clamp-2" data-testid={`text-title-mobile-${anime.id}`}>
            {anime.title}
          </h3>
        </div>
      </Card>
    </Link>
  );
                }
