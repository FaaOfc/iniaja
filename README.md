# ⚡ TaoSite

**Super-efficient multifunction web app** — CDN hosting, URL shortener, dan **54 engine downloader** untuk 16 platform (TikTok, Instagram, YouTube, Facebook, Twitter/X, Spotify, dan lainnya). Tanpa login, tanpa database, gratis deploy di Vercel.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| **54 Engine Downloader** | 16 kategori: `ttdl`, `igdl`, `fbdl`, `ytdl`, `twitterdl`, `pindl`, `douyindl`, `threadsdl`, `redditdl`, `teraboxdl`, `pixivdl`, `spotidl`, `soundclouddl`, `comicdl`, `animedl`, `resolver` |
| **Routing per engine** | Setiap engine punya URL sendiri: `taosite.my.id/igdl/snapsave`, `/ttdl/snaptik`, dst. |
| **CDN Hosting** | Upload file apapun ke repo GitHub, disajikan lewat domain sendiri. |
| **URL Shortener** | Shorten URL dengan custom code, disimpan di GitHub Gist. |
| **/downloads** | Halaman "Unduh versi aplikasi" — link APK diatur di `src/lib/appConfig.ts`. |
| **Coming Soon** | Halaman Nonton Anime & Top UP Murah. |
| **Tanpa login** | Tidak ada auth, tidak ada database user. |

## 🧩 Engine Downloader

Semua engine berasal dari [scrapr](https://github.com/coflyn/scrapr) (`@coflyn/scrapr`) dan sudah di-bundle ke dalam `vendor/scrapr/`. Registry engine dibuat otomatis di `src/lib/engines.ts`.

URL pattern:

```
https://taosite.my.id/<kategori>            → halaman kategori (engine default)
https://taosite.my.id/<kategori>/<engine>   → halaman kategori + engine terpilih
API: /api/dl/<kategori>?engine=<engine>&url=<link>
```

Kategori dikecualikan dari scrapr: `bandcamp`, `applemusic`, `bilibili`, `rednote`.

## 🚀 Menjalankan Lokal

```bash
npm install
npm run dev      # http://localhost:3000
```

## ☁️ Deploy ke Vercel (Gratis)

1. Push semua file ini ke repo GitHub (repo harus **bersih** dari file lama — jangan campur dengan kode versi sebelumnya).
2. Import repo di [vercel.com/new](https://vercel.com/new) → Deploy. Tidak perlu env apa pun untuk fitur downloader.
3. (Opsional) Untuk fitur **CDN & ShortURL**, isi env vars di Vercel: `GITHUB_TOKEN`, `GITHUB_USER`, `CDN_REPO`, `GIST_ID` (lihat `.env.example`).

> ⚠️ **Penting:** jika sebelumnya pernah deploy opensorc versi lama, hapus dulu SEMUA isi repo, lalu upload isi paket ini. Sisa file lama (mis. `src/app/api/auth/`) akan membuat build gagal (`module not found: bcryptjs`) karena versi ini tidak lagi punya dependency auth.

## 📁 Struktur Penting

```
src/
├── lib/
│   ├── categories.ts     # daftar 16 kategori + engine (routing & UI)
│   ├── engines.ts        # registry engine (auto-generated dari vendor/scrapr)
│   ├── downloader.ts     # runner + normalizer hasil scrape
│   ├── appConfig.ts      # link download APK (edit di sini)
│   └── config.ts         # branding situs
├── app/
│   ├── dl/[...parts]/    # halaman downloader (di-rewrite dari /<kategori>/<engine>)
│   ├── api/dl/[...parts] # API extractor
│   ├── downloads/        # halaman unduh versi aplikasi
│   ├── nonton-anime/     # coming soon
│   ├── topup/            # coming soon
│   └── [...path]/        # CDN file server + short URL (tidak berubah)
├── middleware.ts         # rewrite /igdl/snapsave → /dl/igdl/snapsave
└── vendor/scrapr/        # scraper library (54 engine)
```

## 🎨 Ganti Link APK

Edit `src/lib/appConfig.ts`, isi `url` dan ubah `enabled: true` pada platform yang diinginkan.

## 📜 License

Mengikuti lisensi proyek asal (opensorc — MIT, scrapr — MIT).
# new-web
