import '../styles/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AniMeid 🌸 | Streaming Anime Indonesia',
  description: 'Tonton anime favoritmu dari Otakudesu & Samehadaku dengan mudah. Update anime ongoing setiap hari!',
  keywords: ['anime', 'streaming anime', 'otakudesu', 'samehadaku', 'anime sub indo', 'anime online'],
  authors: [{ name: 'AniMeid Project' }],
  openGraph: {
    title: 'AniMeid 🌸 | Streaming Anime Indonesia',
    description: 'Streaming anime sub Indo, update tiap hari — ongoing & completed.',
    url: 'https://animeid.vercel.app',
    siteName: 'AniMeid',
    images: [
      {
        url: '/banner.png', // nanti bisa kamu ganti dengan file banner kamu
        width: 1200,
        height: 630,
        alt: 'AniMeid — Streaming Anime Sub Indo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="bg-offwhite text-gray-900">
      <body className="min-h-screen bg-offwhite text-gray-900">
        <main className="max-w-6xl mx-auto px-4">{children}</main>
        <footer className="text-center py-6 text-sm text-gray-500">
          🌸 AniMeid © {new Date().getFullYear()} — Dibuat dengan cinta
        </footer>
      </body>
    </html>
  )
}
