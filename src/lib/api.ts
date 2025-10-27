const JIKAN_BASE = 'https://api.jikan.moe/v4'
const OTAKUDESU_BASE = 'https://wajik-anime-api.vercel.app/otakudesu'
const SAMEHADAKU_BASE = 'https://wajik-anime-api.vercel.app/samehadaku'

export async function fetchJikan(path: string) {
  const res = await fetch(`${JIKAN_BASE}${path}`)
  return res.json()
}

export async function fetchOtakudesu(path: string) {
  const res = await fetch(`${OTAKUDESU_BASE}${path}`)
  return res.json()
}

export async function fetchSamehadaku(path: string) {
  const res = await fetch(`${SAMEHADAKU_BASE}${path}`)
  return res.json()
}
