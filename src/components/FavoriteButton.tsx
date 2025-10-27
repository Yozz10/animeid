'use client'

import { useEffect, useState } from 'react'

export default function FavoriteButton({ anime }: { anime: any }) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFav(saved.some((a: any) => a.id === anime.id))
  }, [anime.id])

  const toggleFav = () => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updated

    if (isFav) {
      updated = saved.filter((a: any) => a.id !== anime.id)
    } else {
      updated = [...saved, anime]
    }

    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFav(!isFav)
  }

  return (
    <button
      onClick={toggleFav}
      className={`px-3 py-1 rounded-lg text-sm ${
        isFav ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-700'
      }`}
    >
      {isFav ? '❤️ Favorit' : '🤍 Tambah Favorit'}
    </button>
  )
}
