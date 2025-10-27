'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/UserContext'

export default function LoginPage() {
  const { login } = useUser()
  const router = useRouter()
  const [name, setName] = useState('')

  const handleLogin = () => {
    if (!name.trim()) return alert('Masukkan username!')
    login(name)
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Login ke AniStream</h1>
      <input
        type="text"
        placeholder="Username kamu..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-lg mb-3 text-center dark:bg-gray-700"
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
      >
        Masuk
      </button>
    </div>
  )
}
