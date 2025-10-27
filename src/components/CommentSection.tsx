'use client'

import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'

type Comment = {
  user: string
  text: string
  rating: number
  date: string
}

export default function CommentSection({ animeId }: { animeId: string }) {
  const { user } = useUser()
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`comments_${animeId}`) || '[]')
    setComments(saved)
  }, [animeId])

  const handleSubmit = () => {
    if (!user) return alert('Kamu harus login dulu!')
    if (!text.trim()) return alert('Komentar tidak boleh kosong!')

    const newComment: Comment = {
      user,
      text,
      rating,
      date: new Date().toLocaleString(),
    }

    const updated = [...comments, newComment]
    setComments(updated)
    localStorage.setItem(`comments_${animeId}`, JSON.stringify(updated))
    setText('')
    setRating(5)
  }

  return (
    <div className="mt-8 bg-pink-50 dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold text-pink-600 mb-3">💬 Komentar & Rating</h2>

      {/* Form komentar */}
      {user ? (
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis komentar kamu..."
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white mb-2"
          />
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-1 rounded dark:bg-gray-700"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}⭐
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Kirim
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-3">Login dulu untuk menulis komentar 💡</p>
      )}

      {/* List komentar */}
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Belum ada komentar 😢</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c, i) => (
            <li
              key={i}
              className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-pink-100 dark:border-gray-600"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-pink-600 dark:text-pink-300">
                  {c.user}
                </span>
                <span className="text-yellow-500">{'⭐'.repeat(c.rating)}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">{c.text}</p>
              <p className="text-xs text-gray-400 mt-1">{c.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
          }
