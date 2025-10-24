import { useQuery } from "@tanstack/react-query";
import { AnimeHero } from "@/components/anime-hero";
import { AnimeCard } from "@/components/anime-card";
import { ContinueWatching } from "@/components/continue-watching";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Sparkles } from "lucide-react";
import type { Anime, WatchHistory } from "@shared/schema";

export default function Home() {
  const { data: trendingAnime, isLoading: trendingLoading } = useQuery<Anime[]>({
    queryKey: ["/api/anime/trending"],
  });

  const { data: newAnime, isLoading: newLoading } = useQuery<Anime[]>({
    queryKey: ["/api/anime/new"],
  });

  const { data: watchHistory, isLoading: historyLoading } = useQuery<WatchHistory[]>({
    queryKey: ["/api/watch-history"],
  });

  const featuredAnime = trendingAnime?.[0];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="mb-8 md:mb-12">
        {trendingLoading ? (
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <Skeleton className="w-full h-[500px] md:h-[600px] rounded-lg" />
          </div>
        ) : featuredAnime ? (
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <AnimeHero anime={featuredAnime} />
          </div>
        ) : null}
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
        {/* Continue Watching */}
        {!historyLoading && watchHistory && watchHistory.length > 0 && (
          <section>
            <ContinueWatching history={watchHistory} />
          </section>
        )}

        {/* Trending Anime */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold font-display" data-testid="heading-trending">
              Trending Sekarang
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {trendingLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            ) : (
              trendingAnime?.slice(1).map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))
            )}
          </div>
        </section>

        {/* New Releases */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-chart-2" />
            <h2 className="text-xl md:text-2xl font-bold font-display" data-testid="heading-new-releases">
              Rilis Terbaru
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {newLoading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))
            ) : (
              newAnime?.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
