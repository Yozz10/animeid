import { fetchAnimeDetail } from "../../../lib/api";
import Trailer from "../../../components/Trailer";
import InfoBlock from "../../../components/InfoBlock";

export default async function AnimeDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);
  const data = await res.json();
  const anime = data.data;

  if (!anime) {
    return (
      <div className="text-center text-pink-600 p-6">
        😿 Data anime tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">{anime.title}</h1>
      <img
        src={anime.images?.jpg?.large_image_url}
        alt={anime.title}
        className="rounded-2xl shadow-md mb-4 w-full"
      />

      <div className="space-y-2 text-gray-700">
        <p><b>🎬 Episodes:</b> {anime.episodes || "Unknown"}</p>
        <p><b>📅 Status:</b> {anime.status}</p>
        <p><b>⭐ Score:</b> {anime.score || "N/A"}</p>
        <p><b>🏷️ Genre:</b> {anime.genres.map((g: any) => g.name).join(", ")}</p>
      </div>

      <p className="mt-4 text-gray-600 leading-relaxed">{anime.synopsis}</p>

      {anime.trailer?.youtube_id && (
        <div className="mt-6">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
            title="Trailer Anime"
            allowFullScreen
            className="rounded-2xl shadow-md"
          ></iframe>
        </div>
      )}
    </div>
  );
}
