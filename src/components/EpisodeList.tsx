'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EpisodeList({ episodes }: { episodes: any[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleEpisodes = showAll ? episodes : episodes.slice(0, 10)

  return (
    <div className="bg-pink-50 rounded-2xl p-3 shadow">
      <ul className="space-y-2">
        {visibleEpisodes.map((ep, i) => (
          <li key={i}>
            <Link
              href={`/watch/${ep.endpoint}`}
              className="block bg-white hover:bg-pink-100 p-2 rounded-lg transition text-sm font-medium text-sakura-700"
            >
              {ep.title}
            </Link>
          </li>
        ))}
      </ul>

      {episodes.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm text-sakura-500 font-semibold underline"
        >
          {showAll ? 'Tampilkan lebih sedikit' : 'Tampilkan semua episode'}
        </button>
      )}
    </div>
  )
}
