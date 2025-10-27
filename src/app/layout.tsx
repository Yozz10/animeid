import "../styles/globals.css"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const metadata = {
  title: 'AnimeStream - Stage 1',
  description: 'Web anime streaming (scaffold)'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-offwhite text-gray-800 antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
