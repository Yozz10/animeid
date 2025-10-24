import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/search-bar";
import { GenreFilter } from "@/components/genre-filter";
import { AnimeCard } from "@/components/anime-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";
import type { Anime } from "@shared/schema";

const POPULAR_GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const { data: searchResults, isLoading } = useQuery<Anime[]>({
    queryKey: ["/api/anime/search", searchQuery, selectedGenre],
    enabled: searchQuery.length > 0 || selectedGenre !== null,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (selectedGenre) params.append("genre", selectedGenre);
      
      const response = await fetch(`/api/anime/search?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to search anime");
      return response.json();
    },
  });

  const hasFilters = searchQuery.length > 0 || selectedGenre !== null;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold font-display" data-testid="heading-search">
              Cari Anime
            </h1>
          </div>

          {/* Search bar */}
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Cari berdasarkan judul anime..."
          />

          {/* Genre filter */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Filter berdasarkan genre:</p>
            <GenreFilter
              genres={POPULAR_GENRES}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
            />
          </div>
        </div>

        {/* Results */}
        {hasFilters ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold" data-testid="heading-results">
                Hasil Pencarian
                {searchQuery && ` untuk "${searchQuery}"`}
                {selectedGenre && ` - Genre: ${selectedGenre}`}
              </h2>
              {searchResults && (
                <p className="text-sm text-muted-foreground" data-testid="text-result-count">
                  {searchResults.length} anime ditemukan
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {searchResults.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-card-border">
                <p className="text-muted-foreground">
                  Tidak ada anime yang ditemukan. Coba dengan kata kunci atau genre lain.
                </p>
              </Card>
            )}
          </div>
        ) : (
          <Card className="p-12 text-center border-card-border">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Mulai Pencarian</h3>
            <p className="text-muted-foreground">
              Gunakan kotak pencarian di atas atau pilih genre untuk menemukan anime favorit Anda
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
