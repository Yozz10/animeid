export default function Trailer({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden shadow">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
