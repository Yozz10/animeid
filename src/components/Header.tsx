import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-sakura-600">Anime<span className="text-gray-600">Stream</span></Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-sakura-500">Home</Link>
          <Link href="/ongoing" className="text-gray-700 hover:text-sakura-500">Ongoing</Link>
        </nav>
      </div>
    </header>
  )
}
