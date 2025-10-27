import { fetchJikan } from '../../../lib/api'
import Trailer from '../../../components/Trailer'
import InfoBlock from '../../../components/InfoBlock'

export default async function AnimeDetail({ params }: { params: { id: string } }) {
  const data = await fetchJikan(`/anime/${params.id}`)
  const anime = data.data

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-sakura-700 mb-4">{anime.title}</h1>
      <img
        src={anime.images?.jpg?.large_image_url}
        alt={anime.title}
        className="rounded-2xl shadow-md mb-4 w-full"
      />
      <InfoBlock label="Genre" value={anime.genres.map((g: any) => g.name).join(', ')} />
      <InfoBlock label="Episodes" value={anime.episodes || 'Unknown'} />
      <InfoBlock label="Status" value={anime.status} />
      <InfoBlock label="Score" value={anime.score || 'N/A'} />

      <p className="text-gray-700 leading-relaxed mt-4">{anime.synopsis}</p>

      {anime.trailer?.youtube_id && (
        <div className="mt-6">
          <Trailer youtubeId={anime.trailer.youtube_id} />
        </div>
      )}

      <a
        href={`/watch/${anime.title.toLowerCase().replace(/ /g, '-')}`}
        className="inline-block mt-6 bg-sakura-500 text-white px-4 py-2 rounded-xl shadow hover:bg-sakura-600 transition"
      >
        🎬 Tonton Sekarang
      </a>
    </div>
  )
}
