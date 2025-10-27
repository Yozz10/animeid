'use client'

import { useEffect, useState } from 'react'
import AnimeCard from '../../components/AnimeCard'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(saved)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">❤️ Anime Favoritmu</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Belum ada anime favorit. Tambahkan dulu ya!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favorites.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  )
}
