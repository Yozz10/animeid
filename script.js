document.addEventListener("DOMContentLoaded", () => {
    // GANTI URL API DI SINI
    // -----------------------------------------------------------------
    // Jika Anda punya endpoint untuk wajik-anime-api, ganti URL di bawah
    // Saya menggunakan API Kitsu.io sebagai contoh
    const API_BASE_URL = "https://kitsu.io/api/edge";
    const TRENDING_ENDPOINT = `${API_BASE_URL}/trending/anime`;
    const SEARCH_ENDPOINT = `${API_BASE_URL}/anime?filter[text]=`;
    // -----------------------------------------------------------------

    const featuredContainer = document.getElementById("featured-anime");
    const gridContainer = document.getElementById("anime-grid");
    const searchInput = document.getElementById("search-input");

    // Fungsi untuk mengambil data dari API
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            gridContainer.innerHTML =
                "<p style='color: #aaa;'>Gagal memuat data anime.</p>";
            featuredContainer.innerHTML = "";
        }
    }

    // Fungsi untuk menampilkan anime di grid
    function displayAnime(animeList) {
        gridContainer.innerHTML = ""; // Bersihkan loader

        animeList.forEach((anime) => {
            const data = anime.attributes;
            const title = data.canonicalTitle;
            const poster = data.posterImage.small;
            const rating = data.averageRating
                ? (parseFloat(data.averageRating) / 10).toFixed(2)
                : "N/A";
            const episodeCount = data.episodeCount || "?";

            const card = document.createElement("div");
            card.className = "anime-card";
            card.innerHTML = `
                <img src="${poster}" alt="${title}">
                <span class="badge">New</span>
                <span class="rating">
                    <i class="fas fa-star"></i> ${rating}
                </span>
                <span class="episode">Eps ${episodeCount}</span>
                <div class="anime-card-info">
                    <h3>${title}</h3>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // Fungsi untuk menampilkan anime unggulan (featured)
    function displayFeatured(anime) {
        featuredContainer.innerHTML = ""; // Bersihkan loader
        const data = anime.attributes;

        // Gunakan gambar cover jika ada, jika tidak, gunakan poster
        const bannerImage = data.coverImage
            ? data.coverImage.large
            : data.posterImage.large;
        const title = data.canonicalTitle;
        // Kitsu API tidak punya view count, kita buat dummy
        const dummyViews = (
            Math.floor(Math.random() * 1000000) + 100000
        ).toLocaleString("id-ID");

        featuredContainer.innerHTML = `
            <img src="${bannerImage}" alt="${title}">
            <div class="featured-overlay">
                <span class="badge">#1</span>
                <h3>${title}</h3>
                <div class="views">
                    <i class="fas fa-eye"></i> ${dummyViews}
                </div>
            </div>
        `;
    }

    // Fungsi untuk memuat anime (Trending dan Search)
    async function loadAnime(query = null) {
        let url = TRENDING_ENDPOINT;
        if (query) {
            url = `${SEARCH_ENDPOINT}${encodeURIComponent(query)}`;
        }

        const data = await fetchData(url);

        if (data && data.data) {
            if (!query && data.data.length > 0) {
                // Jika ini halaman utama (trending), set anime pertama sebagai featured
                displayFeatured(data.data[0]);
                // Tampilkan sisanya di grid
                displayAnime(data.data.slice(1));
            } else {
                // Jika ini hasil pencarian, tampilkan semua di grid
                displayAnime(data.data);
                // Kosongkan featured jika sedang mencari
                if (query) featuredContainer.style.display = "none";
                else featuredContainer.style.display = "block";
            }
        }
    }

    // Event listener untuk search bar
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = e.target.value.trim();
            if (query) {
                gridContainer.innerHTML =
                    '<div class="skeleton-loader small"></div><div class="skeleton-loader small"></div><div class="skeleton-loader small"></div>'; // Tampilkan loader
                loadAnime(query);
            } else {
                loadAnime(); // Kembali ke trending jika search kosong
            }
        }
    });

    // Muat anime trending saat halaman pertama kali dibuka
    loadAnime();
// ----------------------
// FITUR LIST EPISODE
// ----------------------
const episodeContainer = document.getElementById("episode-list");

// Contoh daftar episode manual
const episodes = [
  { number: 1, title: "Perpisahan dan Awal", link: "#" },
  { number: 2, title: "Kenangan Sang Pahlawan", link: "#" },
  { number: 3, title: "Malam Seribu Tahun", link: "#" },
  { number: 4, title: "Perjalanan Baru", link: "#" },
  { number: 5, title: "Ujian Penyihir", link: "#" },
];

// Tampilkan episode ke halaman
function displayEpisodes() {
  if (!episodeContainer) return;
  episodeContainer.innerHTML = "";
  episodes.forEach(ep => {
    const div = document.createElement("div");
    div.className = "episode-card";
    div.innerHTML = `
      <a href="${ep.link}" target="_blank">
        <p><strong>Episode ${ep.number}</strong> - ${ep.title}</p>
      </a>
    `;
    episodeContainer.appendChild(div);
  });
}

// Jalankan setelah halaman selesai dimuat
displayEpisodes();
// ----------------------
// FITUR LIST EPISODE (GRID STYLE)
// ----------------------
const episodeContainer = document.getElementById("episode-list");

// Contoh daftar episode manual
const episodes = [
  { number: 1, title: "Perpisahan dan Awal", link: "#" },
  { number: 2, title: "Kenangan Sang Pahlawan", link: "#" },
  { number: 3, title: "Malam Seribu Tahun", link: "#" },
  { number: 4, title: "Perjalanan Baru", link: "#" },
  { number: 5, title: "Ujian Penyihir", link: "#" },
  { number: 6, title: "Kota Penyihir", link: "#" },
];

// Fungsi tampilkan episode
function displayEpisodes() {
  if (!episodeContainer) return;
  episodeContainer.innerHTML = "";
  episodes.forEach(ep => {
    const div = document.createElement("div");
    div.className = "episode-card";
    div.innerHTML = `
      <a href="${ep.link}" target="_blank" class="episode-link">
        <div class="episode-thumb">
          <i class="fas fa-play"></i>
        </div>
        <div class="episode-info">
          <strong>Episode ${ep.number}</strong>
          <p>${ep.title}</p>
        </div>
      </a>
    `;
    episodeContainer.appendChild(div);
  });
}

displayEpisodes();
});
