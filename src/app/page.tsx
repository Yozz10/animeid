"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [popularAnime, setPopularAnime] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnime, setSelectedAnime] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  const API_URL = "https://api.jikan.moe/v4";

  // Fetch Anime Populer
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/top/anime?filter=bypopularity&limit=12`);
        const data = await res.json();
        setPopularAnime(data.data);
      } catch (err) {
        setError("Gagal memuat anime populer.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  // Cari Anime
  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setSearchResults([]);
    try {
      const res = await fetch(`${API_URL}/anime?q=${encodeURIComponent(searchQuery)}&limit=18`);
      const data = await res.json();
      setSearchResults(data.data || []);
    } catch (err) {
      setError("Gagal mencari anime.");
    } finally {
      setLoading(false);
    }
  };

  // Detail Anime
  const openModal = async (id: string) => {
    setLoading(true);
    try {
      const [animeRes, episodeRes] = await Promise.all([
        fetch(`${API_URL}/anime/${id}/full`),
        fetch(`${API_URL}/anime/${id}/episodes`),
      ]);
      const animeData = await animeRes.json();
      const epData = await episodeRes.json();
      setSelectedAnime(animeData.data);
      setEpisodes(epData.data || []);
    } catch (err) {
      setError("Gagal memuat detail anime.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedAnime(null);
    setEpisodes([]);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen font-inter">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-cyan-400">Pencari Rekomendasi Anime</h1>
        <p className="text-lg text-gray-300 mt-2">Temukan anime favoritmu berikutnya!</p>
      </header>

      {/* Form Pencarian */}
      <form
        onSubmit={handleSearch}
        className="mb-8 max-w-lg mx-auto flex px-4"
      >
        <input
          type="text"
          placeholder="Cari anime (cth: Naruto, One Piece...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-r-lg font-semibold transition-colors"
        >
          Cari
        </button>
      </form>

      {loading && <p className="text-center text-gray-400 animate-pulse">Memuat...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Hasil Pencarian */}
      {searchResults.length > 0 && (
        <section className="px-4">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Hasil Pencarian</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((anime) => (
              <div
                key={anime.mal_id}
                onClick={() => openModal(anime.mal_id)}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-sm font-semibold text-gray-200 truncate">
                    {anime.title}
                  </h3>
                  <p className="text-yellow-400 text-xs">★ {anime.score || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Anime Populer */}
      {searchResults.length === 0 && (
        <section className="px-4">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Anime Populer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularAnime.map((anime) => (
              <div
                key={anime.mal_id}
                onClick={() => openModal(anime.mal_id)}
                className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-sm font-semibold text-gray-200 truncate">
                    {anime.title}
                  </h3>
                  <p className="text-yellow-400 text-xs">★ {anime.score || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal Detail Anime */}
      {selectedAnime && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-4 max-w-4xl w-full overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={selectedAnime.images.webp.large_image_url}
                alt={selectedAnime.title}
                className="w-full md:w-64 rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedAnime.title}</h2>
                <p className="text-gray-400 mb-2">{selectedAnime.synopsis}</p>
                <p className="text-yellow-400 font-semibold mb-2">
                  ⭐ {selectedAnime.score || "N/A"}
                </p>
                {selectedAnime.trailer?.embed_url && (
                  <div className="mt-4">
                    <iframe
                      src={selectedAnime.trailer.embed_url}
                      className="w-full h-64 rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {episodes.length > 0 && (
                  <div className="mt-4 bg-gray-900 p-2 rounded-lg h-40 overflow-y-auto">
                    <h4 className="text-cyan-400 font-semibold mb-2">Daftar Episode</h4>
                    {episodes.map((ep) => (
                      <div
                        key={ep.mal_id}
                        className="text-sm bg-gray-700 p-2 rounded-md mb-1"
                      >
                        Ep {ep.mal_id}: {ep.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
      }
