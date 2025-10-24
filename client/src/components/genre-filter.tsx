import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

export function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        <Badge
          variant={selectedGenre === null ? "default" : "outline"}
          className="cursor-pointer hover-elevate active-elevate-2 toggle-elevate"
          onClick={() => onSelectGenre(null)}
          data-testid="filter-genre-all"
        >
          Semua
        </Badge>
        {genres.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            className={`cursor-pointer hover-elevate active-elevate-2 toggle-elevate ${
              selectedGenre === genre ? "toggle-elevated" : ""
            }`}
            onClick={() => onSelectGenre(selectedGenre === genre ? null : genre)}
            data-testid={`filter-genre-${genre.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {genre}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
