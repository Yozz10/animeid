"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        setAnimeList(response.data.data);
        setFilteredList(response.data.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchTopAnime();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredList(animeList);
    } else {
      const filtered = animeList.filter((anime: any) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, animeList]);

  return (
    <main className="min-h-screen bg-pink-50 p-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Top Anime
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-pink-300 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
        />
      </div>

      {/* 🖼️ Anime Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredList.map((anime: any) => (
          <div
            key={anime.mal_id}
            className="bg-pink-100 rounded-2xl p-2 shadow hover:shadow-md transition cursor-pointer"
          >
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="rounded-xl w-full object-cover"
            />
            <p className="text-sm font-semibold mt-2 text-center text-gray-800">
              {anime.title}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
