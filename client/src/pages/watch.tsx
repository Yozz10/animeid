import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useRef, useCallback } from "react";
import { VideoPlayer } from "@/components/video-player";
import { EpisodeCard } from "@/components/episode-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Anime, Episode } from "@shared/schema";

export default function Watch() {
  const [, params] = useRoute("/watch/:animeId/:episodeNumber");
  const [, setLocation] = useLocation();
  const animeId = params?.animeId;
  const episodeNumber = params?.episodeNumber ? parseInt(params.episodeNumber) : null;

  const { data: anime } = useQuery<Anime>({
    queryKey: ["/api/anime", animeId],
    enabled: !!animeId,
  });

  const { data: episodes } = useQuery<Episode[]>({
    queryKey: ["/api/episodes", animeId],
    enabled: !!animeId,
  });

  const updateHistoryMutation = useMutation({
    mutationFn: async (data: { animeId: string; episodeNumber: number; progress: number }) => {
      return apiRequest("POST", "/api/watch-history", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/watch-history"] });
    },
  });

  const currentEpisode = episodes?.find((ep) => ep.number === episodeNumber);
  const currentIndex = episodes?.findIndex((ep) => ep.number === episodeNumber) ?? -1;
  const hasNextEpisode = currentIndex >= 0 && currentIndex < (episodes?.length ?? 0) - 1;
  const hasPreviousEpisode = currentIndex > 0;

  // Throttle watch history updates to every 10 seconds
  const lastUpdateTime = useRef<number>(0);
  const lastProgress = useRef<number>(0);

  const handleTimeUpdate = useCallback((progress: number) => {
    if (!animeId || !episodeNumber || !anime || !currentEpisode) return;
    
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTime.current;
    const progressDelta = Math.abs(progress - lastProgress.current);
    
    // Update if: 10+ seconds passed, or progress jumped significantly (seek), or progress > 90% (near end)
    const shouldUpdate = timeSinceLastUpdate > 10000 || progressDelta > 5 || progress > 90;
    
    if (shouldUpdate) {
      lastUpdateTime.current = now;
      lastProgress.current = progress;
      
      updateHistoryMutation.mutate({
        animeId,
        episodeNumber,
        progress,
      });
    }
  }, [animeId, episodeNumber, anime, currentEpisode, updateHistoryMutation]);

  // Update on pause/end events
  const handlePause = useCallback((progress: number) => {
    if (animeId && episodeNumber) {
      updateHistoryMutation.mutate({
        animeId,
        episodeNumber,
        progress,
      });
    }
  }, [animeId, episodeNumber, updateHistoryMutation]);

  const handleVideoEnd = useCallback(() => {
    if (animeId && episodeNumber) {
      updateHistoryMutation.mutate({
        animeId,
        episodeNumber,
        progress: 100,
      });
    }
  }, [animeId, episodeNumber, updateHistoryMutation]);

  const handleNextEpisode = () => {
    if (hasNextEpisode && episodes) {
      const nextEpisode = episodes[currentIndex + 1];
      setLocation(`/watch/${animeId}/${nextEpisode.number}`);
    }
  };

  const handlePreviousEpisode = () => {
    if (hasPreviousEpisode && episodes) {
      const prevEpisode = episodes[currentIndex - 1];
      setLocation(`/watch/${animeId}/${prevEpisode.number}`);
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    setLocation(`/watch/${animeId}/${episode.number}`);
  };

  if (!anime || !currentEpisode) {
    return (
      <div className="min-h-screen pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <Skeleton className="w-full aspect-video rounded-lg mb-6" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => setLocation(`/anime/${animeId}`)}
          data-testid="button-back"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </Button>

        {/* Video Player */}
        <div className="space-y-4">
          <VideoPlayer
            videoUrl={currentEpisode.videoUrl}
            posterUrl={currentEpisode.thumbnail || anime.coverImage}
            onTimeUpdate={handleTimeUpdate}
            onPause={handlePause}
            onEnded={handleVideoEnd}
            onNextEpisode={handleNextEpisode}
            onPreviousEpisode={handlePreviousEpisode}
            hasNextEpisode={hasNextEpisode}
            hasPreviousEpisode={hasPreviousEpisode}
          />

          {/* Episode info */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display" data-testid="text-watch-title">
              {anime.title}
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-watch-episode">
              Episode {currentEpisode.number}
              {currentEpisode.title && ` - ${currentEpisode.title}`}
            </p>
            {currentEpisode.synopsis && (
              <p className="text-sm text-muted-foreground" data-testid="text-watch-synopsis">
                {currentEpisode.synopsis}
              </p>
            )}
          </div>
        </div>

        {/* Other episodes */}
        {episodes && episodes.length > 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display" data-testid="heading-other-episodes">
              Episode Lainnya
            </h2>
            <div className="grid gap-3">
              {episodes
                .filter((ep) => ep.number !== episodeNumber)
                .map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    onPlay={handlePlayEpisode}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
