import { fetchJikan } from '../../../lib/api'
import AnimeCard from '../../../components/AnimeCard'

export default async function SearchPage({ params }: { params: { query: string } }) {
  const res = await fetchJikan(`/anime?q=${params.query}&limit=20`)
  const results = res.data || []

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-sakura-700 dark:text-pink-300 mb-4">
        Hasil Pencarian: {decodeURIComponent(params.query)}
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Tidak ada hasil ditemukan 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {results.map((anime: any) => (
            <AnimeCard
              key={anime.mal_id}
              anime={{
                title: anime.title,
                image: anime.images?.jpg?.image_url,
                id: anime.mal_id,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
