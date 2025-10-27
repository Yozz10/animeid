export default function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-pink-200 py-2 text-sm">
      <span className="font-semibold text-sakura-700">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  )
}
