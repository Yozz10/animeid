import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  fetchTrendingAnime, 
  fetchAnimeByCategory,
  fetchAnimeById, 
  searchAnime,
  fetchEpisodesByAnimeId,
  transformKitsuAnime,
  transformKitsuEpisode
} from "./kitsu";
import { insertWatchHistorySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // GET /api/anime/trending - Get trending anime
  app.get("/api/anime/trending", async (req, res) => {
    try {
      // Check if we have cached data
      let animeList = await storage.getTrendingAnime(20);
      
      // If no data in storage, fetch from Kitsu
      if (animeList.length === 0) {
        const kitsuAnime = await fetchTrendingAnime(20);
        
        for (const ka of kitsuAnime) {
          const transformed = transformKitsuAnime(ka);
          await storage.createAnime(transformed);
        }
        
        animeList = await storage.getTrendingAnime(20);
      }
      
      res.json(animeList);
    } catch (error) {
      console.error("Error fetching trending anime:", error);
      res.status(500).json({ error: "Failed to fetch trending anime" });
    }
  });

  // GET /api/anime/new - Get new releases
  app.get("/api/anime/new", async (req, res) => {
    try {
      let animeList = await storage.getNewAnime(20);
      
      // If no data in storage, fetch from Kitsu
      if (animeList.length === 0) {
        const kitsuAnime = await fetchAnimeByCategory("startDate", 20);
        
        for (const ka of kitsuAnime) {
          const transformed = transformKitsuAnime(ka);
          const existing = await storage.getAnime(transformed.id);
          if (!existing) {
            await storage.createAnime(transformed);
          }
        }
        
        animeList = await storage.getNewAnime(20);
      }
      
      res.json(animeList);
    } catch (error) {
      console.error("Error fetching new anime:", error);
      res.status(500).json({ error: "Failed to fetch new anime" });
    }
  });

  // GET /api/anime/search - Search anime
  app.get("/api/anime/search", async (req, res) => {
    try {
      const query = req.query.query as string || "";
      const genre = req.query.genre as string || "";
      
      if (!query && !genre) {
        return res.json([]);
      }
      
      // Try local search first
      let results = await storage.searchAnime(query, genre);
      
      // If no results and there's a query, search Kitsu API
      if (results.length === 0 && query) {
        const kitsuAnime = await searchAnime(query, 20);
        
        for (const ka of kitsuAnime) {
          const transformed = transformKitsuAnime(ka);
          const existing = await storage.getAnime(transformed.id);
          if (!existing) {
            await storage.createAnime(transformed);
          }
        }
        
        results = await storage.searchAnime(query, genre);
      }
      
      res.json(results);
    } catch (error) {
      console.error("Error searching anime:", error);
      res.status(500).json({ error: "Failed to search anime" });
    }
  });

  // GET /api/anime/:id - Get anime by ID
  app.get("/api/anime/:id", async (req, res) => {
    try {
      const { id } = req.params;
      let anime = await storage.getAnime(id);
      
      // If not in storage, fetch from Kitsu
      if (!anime) {
        const { anime: kitsuAnime, genres } = await fetchAnimeById(id);
        const transformed = transformKitsuAnime(kitsuAnime, genres);
        anime = await storage.createAnime(transformed);
      }
      
      if (!anime) {
        return res.status(404).json({ error: "Anime not found" });
      }
      
      res.json(anime);
    } catch (error) {
      console.error("Error fetching anime:", error);
      res.status(404).json({ error: "Anime not found" });
    }
  });

  // GET /api/episodes/:animeId - Get episodes for an anime
  app.get("/api/episodes/:animeId", async (req, res) => {
    try {
      const { animeId } = req.params;
      let episodes = await storage.getEpisodesByAnime(animeId);
      
      // If no episodes in storage, fetch from Kitsu
      if (episodes.length === 0) {
        const kitsuEpisodes = await fetchEpisodesByAnimeId(animeId, 50);
        
        for (const ke of kitsuEpisodes) {
          const transformed = transformKitsuEpisode(ke, animeId);
          await storage.createEpisode(transformed);
        }
        
        episodes = await storage.getEpisodesByAnime(animeId);
        
        // If Kitsu API didn't return episodes, generate mock episodes for demo
        if (episodes.length === 0) {
          const anime = await storage.getAnime(animeId);
          const episodeCount = anime?.episodeCount || 12; // Default to 12 episodes
          const maxEpisodes = Math.min(episodeCount, 24); // Cap at 24 for demo
          
          // Generate mock episodes with demo video URL
          const mockVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
          
          for (let i = 1; i <= maxEpisodes; i++) {
            const mockEpisode = {
              id: `${animeId}-ep${i}`,
              animeId: animeId,
              number: i,
              title: `Episode ${i}`,
              synopsis: `This is episode ${i} of ${anime?.title || 'the anime'}.`,
              thumbnail: anime?.posterImage || anime?.coverImage,
              videoUrl: mockVideoUrl,
              duration: 1440, // 24 minutes
              airDate: null,
            };
            await storage.createEpisode(mockEpisode);
          }
          
          episodes = await storage.getEpisodesByAnime(animeId);
        }
      }
      
      res.json(episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  // GET /api/watch-history - Get watch history
  app.get("/api/watch-history", async (req, res) => {
    try {
      const history = await storage.getWatchHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching watch history:", error);
      res.status(500).json({ error: "Failed to fetch watch history" });
    }
  });

  // POST /api/watch-history - Update watch history
  app.post("/api/watch-history", async (req, res) => {
    try {
      const validated = insertWatchHistorySchema.parse(req.body);
      
      // Get anime and episode info to store in history
      const anime = await storage.getAnime(validated.animeId);
      const episode = await storage.getEpisodeByNumber(validated.animeId, validated.episodeNumber);
      
      const historyData = {
        ...validated,
        animeTitle: anime?.title,
        animePoster: anime?.posterImage,
        episodeTitle: episode?.title,
      };
      
      const history = await storage.updateWatchHistory(historyData);
      res.json(history);
    } catch (error) {
      console.error("Error updating watch history:", error);
      res.status(500).json({ error: "Failed to update watch history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
