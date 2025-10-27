import Link from 'next/link'

export default function AnimeCard({ anime }: { anime: any }) {
  const href = anime.id ? `/anime/${anime.id}` : (anime.slug ? `/watch/${anime.slug}` : '/')
  return (
    <Link href={href} className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition p-2">
      <div className="aspect-[3/4] w-full bg-gray-100">
        <img src={anime.image} alt={anime.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
      </div>
    </Link>
  )
}
