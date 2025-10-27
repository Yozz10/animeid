"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=24");
        const data = await res.json();
        setAnimes(data.data);
      } catch (error) {
        console.error("Gagal mengambil data anime:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnime();
  }, []);

  const showMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        🌸 AnimeID — Top Anime Pilihan
      </h1>

      {loading ? (
        <p className="text-pink-500 animate-pulse">⏳ Memuat daftar anime...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {animes.slice(0, visible).map((anime) => (
              <div
                key={anime.mal_id}
                className="anime-card bg-white rounded-2xl shadow-md hover:shadow-pink-200 transition hover:-translate-y-1 border border-pink-100 overflow-hidden"
              >
                <img
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                  className="rounded-t-2xl w-full object-cover"
                />
                <div className="p-3">
                  <h2 className="text-base font-semibold text-gray-800 truncate">
                    {anime.title}
                  </h2>
                  <p className="text-sm text-pink-500">
                    ⭐ {anime.score || "N/A"}
                  </p>
                  <a
                    href={`/anime/${anime.mal_id}`}
                    className="inline-block mt-2 bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600 transition"
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            ))}
          </div>

          {visible < animes.length && (
            <button
              onClick={showMore}
              className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-xl shadow hover:bg-pink-600 transition"
            >
              Tampilkan Lebih Banyak 🌸
            </button>
          )}
        </>
      )}
    </div>
  );
}
