import { fetchJikan, fetchOtakudesu, fetchSamehadaku } from '../lib/api'
import AnimeCard from '../components/AnimeCard'

export default async function Home() {
  // fetch top anime (Jikan)
  const topData = await fetchJikan('/top/anime')
  const top = topData.data?.slice(0, 8) || []

  // fetch ongoing (otakudesu)
  let ongoing = []
  try {
    const od = await fetchOtakudesu('/ongoing')
    ongoing = od.data?.slice(0, 8) || []
  } catch (e) {
    ongoing = []
  }

  // fetch latest from samehadaku
  let latest = []
  try {
    const sd = await fetchSamehadaku('/latest')
    latest = sd.data?.slice(0, 8) || []
  } catch (e) {
    latest = []
  }

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-sakura-600 mb-4">Top Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {top.map((a: any) => (
            <AnimeCard key={a.mal_id} anime={{
              title: a.title,
              image: a.images?.jpg?.image_url,
              id: a.mal_id
            }} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-sakura-600 mb-4">Ongoing</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ongoing.map((o: any, i: number) => (
            <AnimeCard key={i} anime={{ title: o.title, image: o.thumb, slug: o.endpoint }} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-sakura-600 mb-4">Latest (Samehadaku)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {latest.map((l: any, i: number) => (
            <AnimeCard key={i} anime={{ title: l.title, image: l.thumb, slug: l.endpoint }} />
          ))}
        </div>
      </section>
    </div>
  )
}