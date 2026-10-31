// Pure data — safe to import from middleware, server and client components.
// Category slug = public URL (taosite.my.id/<slug>/<engine>),
// `vendor` = folder name inside vendor/scrapr/<vendor>/<engine>.

export interface EngineDef {
  id: string; // engine folder name inside vendor/scrapr/<vendor>/
  name: string; // display name
}

export interface CategoryDef {
  slug: string; // public URL slug, e.g. "igdl"
  vendor: string; // vendor/scrapr/<vendor>
  label: string; // sidebar / page title
  short: string; // short label for cards
  description: string;
  placeholder: string;
  color: string; // accent hex
  icon: string; // lucide icon key, mapped in components/icon-map.tsx
  engines: EngineDef[];
}

export const categories: CategoryDef[] = [
  {
    slug: "ttdl",
    vendor: "tiktok",
    label: "TikTok Downloader",
    short: "TikTok DL",
    description: "Unduh video TikTok tanpa watermark, dengan musik orisinal.",
    placeholder: "https://www.tiktok.com/@user/video/...",
    color: "#ff0050",
    icon: "music",
    engines: [
      { id: "snaptik", name: "SnapTik" },
      { id: "tiktokio", name: "TikTok.io" },
      { id: "savetik", name: "SaveTik" },
      { id: "ssstik", name: "SSSTik" },
      { id: "tikdownloader", name: "TikDownloader" },
    ],
  },
  {
    slug: "igdl",
    vendor: "instagram",
    label: "Instagram Downloader",
    short: "Instagram DL",
    description: "Unduh Reels, Post, Foto, IGTV, dan Carousel Instagram.",
    placeholder: "https://www.instagram.com/reel/...",
    color: "#e1306c",
    icon: "instagram",
    engines: [
      { id: "snapinsta", name: "SnapInsta" },
      { id: "snapsave", name: "SnapSave" },
      { id: "indown", name: "InDown" },
      { id: "direct", name: "IG Direct" },
    ],
  },
  {
    slug: "fbdl",
    vendor: "facebook",
    label: "Facebook Downloader",
    short: "Facebook DL",
    description: "Unduh video dan foto dari Facebook dengan kualitas HD.",
    placeholder: "https://www.facebook.com/watch?v=...",
    color: "#1877f2",
    icon: "facebook",
    engines: [
      { id: "fdown", name: "FDown" },
      { id: "snapsave", name: "SnapSave" },
    ],
  },
  {
    slug: "ytdl",
    vendor: "youtube",
    label: "YouTube Downloader",
    short: "YouTube DL",
    description: "Konversi YouTube ke MP3 atau unduh video, termasuk playlist.",
    placeholder: "https://www.youtube.com/watch?v=...",
    color: "#ff0000",
    icon: "youtube",
    engines: [
      { id: "ytmp3", name: "YT to MP3" },
      { id: "ytmp3gg", name: "YTMP3.gg" },
      { id: "playlist", name: "YT Playlist" },
    ],
  },
  {
    slug: "twitterdl",
    vendor: "twitter",
    label: "Twitter Downloader",
    short: "Twitter DL",
    description: "Unduh video dan gambar dari tweet (X/Twitter).",
    placeholder: "https://x.com/user/status/...",
    color: "#1d9bf0",
    icon: "twitter",
    engines: [
      { id: "direct", name: "Twitter Direct" },
      { id: "savetwt", name: "SaveTwt" },
      { id: "tvd", name: "TVD" },
      { id: "tweeload", name: "TweeLoad" },
    ],
  },
  {
    slug: "pindl",
    vendor: "pinterest",
    label: "Pinterest Downloader",
    short: "Pinterest DL",
    description: "Unduh gambar, GIF, dan video Pinterest dalam kualitas penuh.",
    placeholder: "https://id.pinterest.com/pin/...",
    color: "#e60023",
    icon: "pin",
    engines: [
      { id: "direct", name: "Pinterest Direct" },
      { id: "pindown", name: "PinDown" },
    ],
  },
  {
    slug: "douyindl",
    vendor: "douyin",
    label: "Douyin Downloader",
    short: "Douyin DL",
    description: "Unduh video Douyin (TikTok China) tanpa watermark.",
    placeholder: "https://www.douyin.com/video/...",
    color: "#fe2c55",
    icon: "musical",
    engines: [{ id: "direct", name: "Douyin Direct" }],
  },
  {
    slug: "threadsdl",
    vendor: "threads",
    label: "Threads Downloader",
    short: "Threads DL",
    description: "Unduh media dari postingan Threads.",
    placeholder: "https://www.threads.net/@user/post/...",
    color: "#374151",
    icon: "at",
    engines: [{ id: "threadster", name: "Threadster" }],
  },
  {
    slug: "redditdl",
    vendor: "reddit",
    label: "Reddit Downloader",
    short: "Reddit DL",
    description: "Unduh video dan gambar dari postingan Reddit.",
    placeholder: "https://www.reddit.com/r/sub/comments/...",
    color: "#ff4500",
    icon: "message",
    engines: [{ id: "rapidsave", name: "RapidSave" }],
  },
  {
    slug: "teraboxdl",
    vendor: "terabox",
    label: "Terabox Downloader",
    short: "Terabox DL",
    description: "Buat direct link file dari Terabox.",
    placeholder: "https://terabox.com/s/...",
    color: "#0ea5e9",
    icon: "box",
    engines: [{ id: "sechno", name: "Sechno" }],
  },
  {
    slug: "pixivdl",
    vendor: "pixiv",
    label: "Pixiv Downloader",
    short: "Pixiv DL",
    description: "Unduh ilustrasi, ugoira, dan manga dari Pixiv.",
    placeholder: "https://www.pixiv.net/en/artworks/...",
    color: "#0096fa",
    icon: "brush",
    engines: [{ id: "ajax", name: "Pixiv Ajax" }],
  },
  {
    slug: "spotidl",
    vendor: "spotify",
    label: "Spotify Downloader",
    short: "Spotify DL",
    description: "Unduh lagu dan playlist Spotify menjadi MP3.",
    placeholder: "https://open.spotify.com/track/...",
    color: "#1db954",
    icon: "disc",
    engines: [
      { id: "spotidown", name: "SpotiDown" },
      { id: "spotisaver", name: "SpotiSaver" },
      { id: "spotmate", name: "SpotMate" },
      { id: "soundloaders", name: "SoundLoaders" },
    ],
  },
  {
    slug: "soundclouddl",
    vendor: "soundcloud",
    label: "SoundCloud Downloader",
    short: "SoundCloud DL",
    description: "Unduh lagu dari SoundCloud menjadi MP3.",
    placeholder: "https://soundcloud.com/artist/track",
    color: "#ff5500",
    icon: "wave",
    engines: [{ id: "klickaud", name: "KlickAud" }],
  },
  {
    slug: "comicdl",
    vendor: "comic",
    label: "Comic Downloader",
    short: "Comic DL",
    description: "Unduh chapter manga/manhwa dari berbagai situs komik.",
    placeholder: "https://komikcast.site/komik/.../chapter-1/",
    color: "#f59e0b",
    icon: "book",
    engines: [
      { id: "komikcast", name: "KomikCast" },
      { id: "komiku", name: "Komiku" },
      { id: "kiryuu", name: "Kiryuu" },
      { id: "bacakomik", name: "BacaKomik" },
      { id: "komikindo", name: "KomikIndo" },
      { id: "asurascans", name: "Asura Scans" },
      { id: "mangadex", name: "MangaDex" },
      { id: "mangabats", name: "MangaBats" },
      { id: "manhwaindo", name: "ManhwaIndo" },
    ],
  },
  {
    slug: "animedl",
    vendor: "anime",
    label: "Anime Downloader",
    short: "Anime DL",
    description: "Unduh episode anime dari berbagai sumber.",
    placeholder: "https://otakudesu.cc/anime/.../episode-1/",
    color: "#a855f7",
    icon: "clapper",
    engines: [
      { id: "otakudesu", name: "OtakuDesu" },
      { id: "gogoanime", name: "GogoAnime" },
      { id: "nimegami", name: "Nimegami" },
      { id: "animetosho", name: "AnimeTosho" },
    ],
  },
  {
    slug: "resolver",
    vendor: "resolver",
    label: "Link Resolver",
    short: "Resolver",
    description: "Buka direct link: MediaFire, GDrive, Sfile, Safelinku, dll.",
    placeholder: "https://www.mediafire.com/file/...",
    color: "#10b981",
    icon: "link2",
    engines: [
      { id: "mediafire", name: "MediaFire" },
      { id: "gdrive", name: "Google Drive" },
      { id: "sfile", name: "Sfile" },
      { id: "pixeldrain", name: "Pixeldrain" },
      { id: "krakenfiles", name: "Krakenfiles" },
      { id: "doodstream", name: "Doodstream" },
      { id: "catbox", name: "Catbox" },
      { id: "safelinku", name: "SafelinkU" },
      { id: "sub2unlock", name: "Sub2Unlock" },
      { id: "rekonise", name: "Rekonise" },
      { id: "unshorten", name: "Unshorten" },
    ],
  },
];

export const categorySlugs = categories.map((c) => c.slug);

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getEngine(
  slug: string,
  engineId: string
): EngineDef | undefined {
  const cat = getCategory(slug);
  return cat?.engines.find((e) => e.id === engineId);
}
