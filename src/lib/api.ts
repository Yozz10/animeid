import axios from "axios";

// === API BASE URL ===
const JIKAN_BASE = "https://api.jikan.moe/v4";
const OTAKUDESU_BASE = "https://wajik-anime-api.vercel.app/otakudesu";
const SAMEHADAKU_BASE = "https://wajik-anime-api.vercel.app/samehadaku";

/* === 1️⃣ Fetch dari Jikan API (umum) === */
export async function fetchJikan(endpoint: string) {
  try {
    const res = await axios.get(`${JIKAN_BASE}${endpoint}`);
    return res.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data Jikan API:", error);
    return { data: [] };
  }
}

/* === 2️⃣ Fetch detail anime (by MAL ID) === */
export async function fetchAnimeDetail(id: string) {
  try {
    const res = await axios.get(`${JIKAN_BASE}/anime/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("❌ Gagal mengambil detail anime:", error);
    return null;
  }
}

/* === 3️⃣ Fetch dari Otakudesu (streaming ongoing / detail anime) === */
export async function fetchOtakudesu(endpoint: string) {
  try {
    const res = await axios.get(`${OTAKUDESU_BASE}${endpoint}`);
    return res.data;
  } catch (error) {
    console.error("❌ Gagal fetch data dari Otakudesu API:", error);
    return null;
  }
}

/* === 4️⃣ Fetch dari Samehadaku (streaming / detail anime) === */
export async function fetchSamehadaku(endpoint: string) {
  try {
    const res = await axios.get(`${SAMEHADAKU_BASE}${endpoint}`);
    return res.data;
  } catch (error) {
    console.error("❌ Gagal fetch data dari Samehadaku API:", error);
    return null;
  }
}

/* === 5️⃣ Gabungan: fetch ongoing dari 2 sumber === */
export async function fetchOngoingAnime() {
  try {
    const [otakudesuRes, samehadakuRes] = await Promise.all([
      axios.get(`${OTAKUDESU_BASE}/ongoing`),
      axios.get(`${SAMEHADAKU_BASE}/ongoing`),
    ]);
    return [...(otakudesuRes.data || []), ...(samehadakuRes.data || [])];
  } catch (error) {
    console.error("❌ Gagal fetch anime ongoing:", error);
    return [];
  }
}
