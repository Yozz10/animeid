// src/lib/api.ts
import axios from "axios";

const JIKAN_BASE = "https://api.jikan.moe/v4";
const OTAKUDESU_BASE = "https://wajik-anime-api.vercel.app/otakudesu";
const SAMEHADAKU_BASE = "https://wajik-anime-api.vercel.app/samehadaku";

/* === Fetch Jikan API === */
export async function fetchJikan(endpoint: string) {
  const res = await axios.get(`${JIKAN_BASE}${endpoint}`);
  return res.data;
}

/* === Fetch Anime Detail (unified) === */
export async function fetchAnimeDetail(id: string) {
  try {
    // Coba ambil dari Jikan API dulu
    const { data } = await fetchJikan(`/anime/${id}`);
    return data;
  } catch (error) {
    console.error("Gagal fetch detail anime:", error);
    return null;
  }
}

/* === Fetch Ongoing Anime (Otakudesu + Samehadaku) === */
export async function fetchOngoingAnime() {
  try {
    const [otakuRes, samehadaRes] = await Promise.all([
      axios.get(`${OTAKUDESU_BASE}/ongoing`),
      axios.get(`${SAMEHADAKU_BASE}/ongoing`)
    ]);
    return [...(otakuRes.data || []), ...(samehadaRes.data || [])];
  } catch (error) {
    console.error("Gagal fetch ongoing anime:", error);
    return [];
  }
}
