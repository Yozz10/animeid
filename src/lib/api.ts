// helper untuk fetch beberapa API yang kamu sebutkan
export async function fetchJikan(path: string) {
  const res = await fetch(`https://api.jikan.moe/v4${path}`)
  if (!res.ok) throw new Error('Jikan fetch failed')
  return res.json()
}

export async function fetchOtakudesu(path: string) {
  const base = 'https://wajik-anime-api.vercel.app/otakudesu'
  const res = await fetch(`${base}${path}`)
  if (!res.ok) throw new Error('Otakudesu fetch failed')
  return res.json()
}

export async function fetchSamehadaku(path: string) {
  const base = 'https://wajik-anime-api.vercel.app/samehadaku'
  const res = await fetch(`${base}${path}`)
  if (!res.ok) throw new Error('Samehadaku fetch failed')
  return res.json()
}
