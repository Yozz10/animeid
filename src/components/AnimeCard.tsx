'use client'

import Link from 'next/link'

export default function AnimeCard({ anime }: { anime: any }) {
  return (
    <Link
      href={
        anime.id
          ? `/anime/${anime.id}`
          : anime.slug
          ? `/watch/${anime.slug}`
          : '#'
      }
      className="block bg-pink-50 hover:bg-pink-100 rounded-2xl shadow-md overflow-hidden transition"
    >
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold text-sakura-700 line-clamp-2">
          {anime.title}
        </h3>
      </div>
    </Link>
  )
}
