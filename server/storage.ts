import { 
  type Anime, type InsertAnime,
  type Episode, type InsertEpisode,
  type WatchHistory, type InsertWatchHistory
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Anime methods
  getAnime(id: string): Promise<Anime | undefined>;
  getAllAnime(): Promise<Anime[]>;
  getTrendingAnime(limit?: number): Promise<Anime[]>;
  getNewAnime(limit?: number): Promise<Anime[]>;
  searchAnime(query: string, genre?: string): Promise<Anime[]>;
  createAnime(anime: InsertAnime): Promise<Anime>;
  
  // Episode methods
  getEpisode(id: string): Promise<Episode | undefined>;
  getEpisodesByAnime(animeId: string): Promise<Episode[]>;
  getEpisodeByNumber(animeId: string, episodeNumber: number): Promise<Episode | undefined>;
  createEpisode(episode: InsertEpisode): Promise<Episode>;
  
  // Watch history methods
  getWatchHistory(): Promise<WatchHistory[]>;
  getWatchHistoryByAnime(animeId: string): Promise<WatchHistory | undefined>;
  updateWatchHistory(history: InsertWatchHistory): Promise<WatchHistory>;
}

export class MemStorage implements IStorage {
  private anime: Map<string, Anime>;
  private episodes: Map<string, Episode>;
  private watchHistory: Map<string, WatchHistory>;

  constructor() {
    this.anime = new Map();
    this.episodes = new Map();
    this.watchHistory = new Map();
  }

  // Anime methods
  async getAnime(id: string): Promise<Anime | undefined> {
    return this.anime.get(id);
  }

  async getAllAnime(): Promise<Anime[]> {
    return Array.from(this.anime.values());
  }

  async getTrendingAnime(limit: number = 20): Promise<Anime[]> {
    return Array.from(this.anime.values())
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, limit);
  }

  async getNewAnime(limit: number = 20): Promise<Anime[]> {
    return Array.from(this.anime.values())
      .sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }

  async searchAnime(query: string, genre?: string): Promise<Anime[]> {
    let results = Array.from(this.anime.values());

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter((anime) =>
        anime.title.toLowerCase().includes(lowerQuery)
      );
    }

    if (genre) {
      results = results.filter((anime) =>
        anime.genres?.includes(genre)
      );
    }

    return results;
  }

  async createAnime(insertAnime: InsertAnime): Promise<Anime> {
    const id = randomUUID();
    const anime: Anime = { ...insertAnime, id };
    this.anime.set(id, anime);
    return anime;
  }

  // Episode methods
  async getEpisode(id: string): Promise<Episode | undefined> {
    return this.episodes.get(id);
  }

  async getEpisodesByAnime(animeId: string): Promise<Episode[]> {
    return Array.from(this.episodes.values())
      .filter((ep) => ep.animeId === animeId)
      .sort((a, b) => a.number - b.number);
  }

  async getEpisodeByNumber(animeId: string, episodeNumber: number): Promise<Episode | undefined> {
    return Array.from(this.episodes.values())
      .find((ep) => ep.animeId === animeId && ep.number === episodeNumber);
  }

  async createEpisode(insertEpisode: InsertEpisode): Promise<Episode> {
    const id = randomUUID();
    const episode: Episode = { ...insertEpisode, id };
    this.episodes.set(id, episode);
    return episode;
  }

  // Watch history methods
  async getWatchHistory(): Promise<WatchHistory[]> {
    return Array.from(this.watchHistory.values())
      .sort((a, b) => {
        const dateA = a.lastWatched ? new Date(a.lastWatched).getTime() : 0;
        const dateB = b.lastWatched ? new Date(b.lastWatched).getTime() : 0;
        return dateB - dateA;
      });
  }

  async getWatchHistoryByAnime(animeId: string): Promise<WatchHistory | undefined> {
    return Array.from(this.watchHistory.values())
      .find((h) => h.animeId === animeId);
  }

  async updateWatchHistory(insertHistory: InsertWatchHistory): Promise<WatchHistory> {
    // Find existing history for this anime + episode
    const existing = Array.from(this.watchHistory.values())
      .find((h) => h.animeId === insertHistory.animeId && h.episodeNumber === insertHistory.episodeNumber);

    if (existing) {
      // Update existing
      const updated: WatchHistory = {
        ...existing,
        progress: insertHistory.progress,
        lastWatched: new Date(),
        animeTitle: insertHistory.animeTitle || existing.animeTitle,
        animePoster: insertHistory.animePoster || existing.animePoster,
        episodeTitle: insertHistory.episodeTitle || existing.episodeTitle,
      };
      this.watchHistory.set(existing.id, updated);
      return updated;
    } else {
      // Create new
      const id = randomUUID();
      const history: WatchHistory = {
        ...insertHistory,
        id,
        lastWatched: new Date(),
      };
      this.watchHistory.set(id, history);
      return history;
    }
  }
}

export const storage = new MemStorage();
