import { fetchOtakudesu, fetchSamehadaku } from '../../../lib/api'
import EpisodeList from '../../../components/EpisodeList'

export default async function WatchPage({ params }: { params: { slug: string } }) {
  let data: any = null

  try {
    // Coba ambil data dari Otakudesu API
    const od = await fetchOtakudesu(`/anime/${params.slug}`)
    data = od.data
  } catch (err) {
    // Kalau gagal, coba dari Samehadaku API
    const sd = await fetchSamehadaku(`/anime/${params.slug}`)
    data = sd.data
  }

  if (!data) {
    return <p className="text-center mt-10 text-gray-600">Anime tidak ditemukan 😢</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-sakura-700 mb-3">{data.title}</h1>
      <div className="aspect-video rounded-2xl overflow-hidden shadow mb-4">
        <iframe
          src={data.stream_url}
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <h2 className="text-lg font-semibold text-sakura-600 mb-2">Daftar Episode</h2>
      <EpisodeList episodes={data.episodes || []} />
    </div>
  )
}
