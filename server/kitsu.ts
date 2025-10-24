// Kitsu.io API integration helper functions
const KITSU_BASE_URL = "https://kitsu.io/api/edge";

interface KitsuAnime {
  id: string;
  type: string;
  attributes: {
    canonicalTitle: string;
    synopsis?: string;
    coverImage?: {
      large?: string;
      original?: string;
    };
    posterImage?: {
      small?: string;
      medium?: string;
      large?: string;
    };
    averageRating?: string;
    episodeCount?: number;
    status?: string;
    startDate?: string;
    ageRating?: string;
    youtubeVideoId?: string;
  };
  relationships?: {
    genres?: {
      data?: Array<{ id: string; type: string }>;
    };
  };
}

interface KitsuGenre {
  id: string;
  attributes: {
    name: string;
  };
}

interface KitsuResponse<T> {
  data: T | T[];
  included?: any[];
}

export async function fetchTrendingAnime(limit: number = 20) {
  const response = await fetch(`${KITSU_BASE_URL}/trending/anime?page[limit]=${limit}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch trending anime");
  }
  
  const data: KitsuResponse<KitsuAnime[]> = await response.json();
  return Array.isArray(data.data) ? data.data : [data.data];
}

export async function fetchAnimeByCategory(category: string, limit: number = 20) {
  const response = await fetch(
    `${KITSU_BASE_URL}/anime?page[limit]=${limit}&sort=-${category}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch anime by category: ${category}`);
  }
  
  const data: KitsuResponse<KitsuAnime[]> = await response.json();
  return Array.isArray(data.data) ? data.data : [data.data];
}

export async function fetchAnimeById(id: string) {
  const response = await fetch(`${KITSU_BASE_URL}/anime/${id}?include=genres`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch anime: ${id}`);
  }
  
  const data: KitsuResponse<KitsuAnime> = await response.json();
  
  // Extract genres from included data
  const genres: string[] = [];
  if (data.included) {
    for (const item of data.included) {
      if (item.type === "genres") {
        genres.push(item.attributes.name);
      }
    }
  }
  
  return { anime: data.data as KitsuAnime, genres };
}

export async function searchAnime(query: string, limit: number = 20) {
  const response = await fetch(
    `${KITSU_BASE_URL}/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=${limit}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to search anime");
  }
  
  const data: KitsuResponse<KitsuAnime[]> = await response.json();
  return Array.isArray(data.data) ? data.data : [data.data];
}

export async function fetchEpisodesByAnimeId(animeId: string, limit: number = 50) {
  const response = await fetch(
    `${KITSU_BASE_URL}/anime/${animeId}/episodes?page[limit]=${limit}&sort=number`
  );
  
  if (!response.ok) {
    // Some anime don't have episodes in the API, return empty array
    return [];
  }
  
  const data = await response.json();
  return Array.isArray(data.data) ? data.data : [];
}

export function transformKitsuAnime(kitsuAnime: KitsuAnime, genres: string[] = []) {
  return {
    id: kitsuAnime.id,
    title: kitsuAnime.attributes.canonicalTitle,
    synopsis: kitsuAnime.attributes.synopsis,
    coverImage: kitsuAnime.attributes.coverImage?.large || kitsuAnime.attributes.coverImage?.original,
    posterImage: kitsuAnime.attributes.posterImage?.large || 
                 kitsuAnime.attributes.posterImage?.medium || 
                 kitsuAnime.attributes.posterImage?.small,
    averageRating: kitsuAnime.attributes.averageRating ? parseFloat(kitsuAnime.attributes.averageRating) : null,
    episodeCount: kitsuAnime.attributes.episodeCount,
    status: kitsuAnime.attributes.status,
    genres: genres.length > 0 ? genres : null,
    ageRating: kitsuAnime.attributes.ageRating,
    startDate: kitsuAnime.attributes.startDate,
    youtubeVideoId: kitsuAnime.attributes.youtubeVideoId,
  };
}

export function transformKitsuEpisode(kitsuEpisode: any, animeId: string) {
  return {
    id: kitsuEpisode.id,
    animeId: animeId,
    number: kitsuEpisode.attributes.number || 1,
    title: kitsuEpisode.attributes.canonicalTitle || `Episode ${kitsuEpisode.attributes.number}`,
    synopsis: kitsuEpisode.attributes.synopsis,
    thumbnail: kitsuEpisode.attributes.thumbnail?.original,
    videoUrl: undefined, // Kitsu doesn't provide video URLs
    duration: kitsuEpisode.attributes.length ? kitsuEpisode.attributes.length * 60 : null,
    airDate: kitsuEpisode.attributes.airdate,
  };
}
