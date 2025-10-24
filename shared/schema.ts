import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const anime = pgTable("anime", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  synopsis: text("synopsis"),
  coverImage: text("cover_image"),
  posterImage: text("poster_image"),
  averageRating: real("average_rating"),
  episodeCount: integer("episode_count"),
  status: text("status"),
  genres: text("genres").array(),
  ageRating: text("age_rating"),
  startDate: text("start_date"),
  youtubeVideoId: text("youtube_video_id"),
});

export const episodes = pgTable("episodes", {
  id: varchar("id").primaryKey(),
  animeId: varchar("anime_id").notNull(),
  number: integer("number").notNull(),
  title: text("title").notNull(),
  synopsis: text("synopsis"),
  thumbnail: text("thumbnail"),
  videoUrl: text("video_url"),
  duration: integer("duration"),
  airDate: text("air_date"),
});

export const watchHistory = pgTable("watch_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  animeId: varchar("anime_id").notNull(),
  episodeNumber: integer("episode_number").notNull(),
  progress: real("progress").default(0),
  lastWatched: timestamp("last_watched").defaultNow(),
  animeTitle: text("anime_title"),
  animePoster: text("anime_poster"),
  episodeTitle: text("episode_title"),
});

export const insertAnimeSchema = createInsertSchema(anime).omit({
  id: true,
});

export const insertEpisodeSchema = createInsertSchema(episodes).omit({
  id: true,
});

export const insertWatchHistorySchema = createInsertSchema(watchHistory).omit({
  id: true,
  lastWatched: true,
});

export type InsertAnime = z.infer<typeof insertAnimeSchema>;
export type Anime = typeof anime.$inferSelect;

export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type Episode = typeof episodes.$inferSelect;

export type InsertWatchHistory = z.infer<typeof insertWatchHistorySchema>;
export type WatchHistory = typeof watchHistory.$inferSelect;
