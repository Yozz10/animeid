import "../styles/globals.css"
import { UserProvider } from '../context/UserContext'
import Header from '../components/Header'

export const metadata = {
  title: 'AniStream',
  description: 'Nonton anime favoritmu dengan gaya pink putih!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-pink-50 dark:bg-gray-900">
        <UserProvider>
          <Header />
          <main className="max-w-6xl mx-auto p-4">{children}</main>
        </UserProvider>
      </body>
    </html>
  )
}
