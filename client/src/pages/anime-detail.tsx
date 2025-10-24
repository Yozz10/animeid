import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Play, Star, Calendar, Tv, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { EpisodeCard } from "@/components/episode-card";
import type { Anime, Episode } from "@shared/schema";

export default function AnimeDetail() {
  const [, params] = useRoute("/anime/:id");
  const [, setLocation] = useLocation();
  const animeId = params?.id;

  const { data: anime, isLoading: animeLoading } = useQuery<Anime>({
    queryKey: ["/api/anime", animeId],
    enabled: !!animeId,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes", animeId],
    enabled: !!animeId,
  });

  const handlePlayEpisode = (episode: Episode) => {
    setLocation(`/watch/${animeId}/${episode.number}`);
  };

  if (animeLoading) {
    return (
      <div className="min-h-screen pb-20 md:pb-8">
        <Skeleton className="w-full h-[400px]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Anime tidak ditemukan</h2>
          <Button onClick={() => setLocation("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    );
  }

  const rating = anime.averageRating ? (anime.averageRating / 10).toFixed(1) : null;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={anime.coverImage || anime.posterImage || "/placeholder-anime.jpg"}
          alt={anime.title}
          className="w-full h-full object-cover"
          data-testid="img-detail-backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-6 md:gap-8">
          {/* Poster - Sticky on desktop */}
          <div className="hidden md:block sticky top-20 h-fit">
            <Card className="overflow-hidden border-card-border">
              <img
                src={anime.posterImage || "/placeholder-anime.jpg"}
                alt={anime.title}
                className="w-full aspect-[2/3] object-cover"
                data-testid="img-detail-poster"
              />
            </Card>
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Title and meta */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-bold font-display" data-testid="text-detail-title">
                {anime.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                {rating && (
                  <div className="flex items-center gap-1" data-testid="text-detail-rating">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                  </div>
                )}
                {anime.episodeCount && (
                  <div className="flex items-center gap-1" data-testid="text-detail-episodes">
                    <Tv className="w-4 h-4" />
                    <span>{anime.episodeCount} Episodes</span>
                  </div>
                )}
                {anime.status && (
                  <Badge variant="outline" data-testid="badge-detail-status">
                    {anime.status}
                  </Badge>
                )}
                {anime.ageRating && (
                  <Badge variant="secondary" data-testid="badge-detail-age-rating">
                    {anime.ageRating}
                  </Badge>
                )}
              </div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="default">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Action button */}
              {episodes && episodes.length > 0 && (
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => handlePlayEpisode(episodes[0])}
                  data-testid="button-watch-first-episode"
                >
                  <Play className="w-5 h-5" />
                  Mulai Menonton
                </Button>
              )}
            </div>

            <Separator />

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Sinopsis</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-detail-synopsis">
                  {anime.synopsis}
                </p>
              </div>
            )}

            <Separator />

            {/* Episodes */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold font-display" data-testid="heading-episodes">
                Daftar Episode
              </h3>

              {episodesLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : episodes && episodes.length > 0 ? (
                <div className="grid gap-3">
                  {episodes.map((episode) => (
                    <EpisodeCard
                      key={episode.id}
                      episode={episode}
                      onPlay={handlePlayEpisode}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-card-border">
                  <p className="text-muted-foreground">
                    Belum ada episode tersedia
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                    }
