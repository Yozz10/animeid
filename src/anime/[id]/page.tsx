import { fetchJikan } from '@/lib/api'
import Trailer from '@/components/Trailer'
import InfoBlock from '@/components/InfoBlock'
import Link from 'next/link'

export default async function AnimeDetail({ params }: { params: { id: string } }) {
  const data = await fetchJikan(`/anime/${params.id}/full`)
  const anime = data.data

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="rounded-2xl shadow-lg" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-sakura-600 mb-2">{anime.title}</h1>
        <InfoBlock anime={anime} />

        <p className="text-gray-700 leading-relaxed mt-4 mb-6">{anime.synopsis}</p>

        {anime.trailer?.youtube_id && (
          <div className="my-6">
            <Trailer youtubeId={anime.trailer.youtube_id} />
          </div>
        )}

        <Link
          href={`/watch/${encodeURIComponent(anime.title.toLowerCase().replace(/\s+/g, '-'))}`}
          className="inline-block bg-sakura-500 text-white px-6 py-2 rounded-xl hover:bg-sakura-600 transition"
        >
          🎬 Tonton Sekarang
        </Link>
      </div>
    </div>
  )
}
