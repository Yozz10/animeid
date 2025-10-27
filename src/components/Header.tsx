'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useUser } from '../context/UserContext'

export default function Header() {
  const [query, setQuery] = useState('')
  const { user, logout } = useUser()

  return (
    <header className="flex items-center justify-between p-4 bg-pink-100 dark:bg-gray-900 shadow-md">
      <Link href="/" className="text-2xl font-bold text-pink-600 dark:text-pink-300">
        🌸 AniStream
      </Link>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari anime..."
          className="px-3 py-1 rounded-lg border border-pink-300 text-sm focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <Link
          href={`/search/${encodeURIComponent(query)}`}
          className="px-3 py-1 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
        >
          🔍
        </Link>
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm dark:text-white">Hi, {user}</span>
            <button
              onClick={logout}
              className="text-sm text-pink-600 dark:text-pink-300 underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-pink-400 text-white px-2 py-1 rounded-lg hover:bg-pink-500"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
