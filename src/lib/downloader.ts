// Server-only helpers: run scrapr engines + normalize heterogeneous results
// into one UI-friendly shape.
import { getEngine as getEngineLib } from "./engines";
import { getCategory } from "./categories";

export interface NormalMedia {
  url: string;
  type: "video" | "audio" | "image" | "file" | "link";
  quality?: string;
  thumbnail?: string;
  size?: string;
}

export interface NormalResult {
  title?: string;
  thumbnail?: string;
  author?: string;
  medias: NormalMedia[];
}

const URL_RE = /^https?:\/\//i;

function sniffType(url: string, hint?: string): NormalMedia["type"] {
  const t = (hint || "").toLowerCase();
  if (t.includes("video") || /\b(mp4|mkv|webm|mov|avi|m3u8)\b/.test(t))
    return "video";
  if (
    t.includes("audio") ||
    t.includes("mp3") ||
    t.includes("music") ||
    /\b(m4a|wav|opus|flac|aac|ogg)\b/.test(t)
  )
    return "audio";
  if (
    t.includes("image") ||
    t.includes("photo") ||
    t.includes("foto") ||
    /\b(jpg|jpeg|png|gif|webp|avif)\b/.test(t)
  )
    return "image";
  if (t.includes("link")) return "link";
  if (/\.(mp4|mkv|webm|mov|avi|m3u8)(\?|$)/i.test(url)) return "video";
  if (/\.(mp3|m4a|wav|opus|flac|aac|ogg)(\?|$)/i.test(url)) return "audio";
  if (/\.(jpe?g|png|gif|webp|bmp|avif)(\?|$)/i.test(url)) return "image";
  return "file";
}

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/** Extract a media list from any scrapr result shape. */
function deepCollect(node: unknown, out: NormalMedia[], seen: Set<string>, depth = 0) {
  if (!node || depth > 6 || out.length >= 60) return;

  if (Array.isArray(node)) {
    for (const item of node) deepCollect(item, out, seen, depth + 1);
    return;
  }

  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;

    // Direct entry with a url field
    const url = pickString(obj, [
      "url",
      "link",
      "download_url",
      "video",
      "videoUrl",
      "file",
      "audio",
      "image",
      "value",
    ]);
    if (url && URL_RE.test(url) && !seen.has(url)) {
      seen.add(url);
      out.push({
        url,
        type: sniffType(
          url,
          pickString(obj, ["type", "kind", "mediaType", "format"])
        ),
        quality: pickString(obj, [
          "quality",
          "resolution",
          "label",
          "key",
          "title",
        ]).slice(0, 60) || undefined,
        thumbnail: (() => {
          const th = pickString(obj, ["thumbnail", "thumb", "cover", "img", "preview"]);
          return th && URL_RE.test(th) ? th : undefined;
        })(),
        size: pickString(obj, ["size", "filesize", "formattedSize"]) || undefined,
      });
      return;
    }

    // Recurse into every value (arrays, nested objects)
    for (const v of Object.values(obj)) {
      if (typeof v !== "string") deepCollect(v, out, seen, depth + 1);
    }
  }
}

export function normalizeResult(raw: Record<string, unknown>): NormalResult {
  const medias: NormalMedia[] = [];
  const seen = new Set<string>();

  const result = (raw.result ?? {}) as Record<string, unknown>;

  // Preferred: explicit downloads array (most scrapr engines)
  const downloads = result.downloads;
  if (Array.isArray(downloads) && downloads.length > 0) {
    for (const d of downloads) {
      if (d && typeof d === "object") {
        const obj = d as Record<string, unknown>;
        const url = pickString(obj, ["url", "link", "download_url", "value"]);
        if (url && URL_RE.test(url) && !seen.has(url)) {
          seen.add(url);
          medias.push({
            url,
            type: sniffType(
              url,
              pickString(obj, ["type", "kind", "format"])
            ),
            quality:
              pickString(obj, ["quality", "resolution", "label", "key"]).slice(0, 60) ||
              undefined,
            thumbnail: (() => {
              const th = pickString(obj, ["thumbnail", "thumb"]);
              return th && URL_RE.test(th) ? th : undefined;
            })(),
            size: pickString(obj, ["size", "formattedSize"]) || undefined,
          });
        }
      } else if (typeof d === "string" && URL_RE.test(d) && !seen.has(d)) {
        seen.add(d);
        medias.push({ url: d, type: sniffType(d) });
      }
    }
  }

  // Fallback: deep scan for any URLs (covers exotic shapes)
  if (medias.length === 0) {
    deepCollect(result, medias, seen);
  }

  const title = pickString(result, ["title", "caption", "filename", "name"]);
  const thumbnail = pickString(result, ["thumbnail", "thumb", "cover"]);
  const author = (() => {
    const a = result.author;
    if (typeof a === "string") return a;
    if (a && typeof a === "object") {
      const o = a as Record<string, unknown>;
      return pickString(o, ["name", "username", "nickname"]);
    }
    return "";
  })();

  return {
    title: title || undefined,
    thumbnail: thumbnail && URL_RE.test(thumbnail) ? thumbnail : undefined,
    author: author || undefined,
    medias: medias.slice(0, 60),
  };
}

export interface RunOutcome {
  ok: boolean;
  message?: string;
  data?: NormalResult;
}

export async function runEngine(
  slug: string,
  engineId: string,
  url: string
): Promise<RunOutcome> {
  const category = getCategory(slug);
  if (!category) return { ok: false, message: "Kategori tidak ditemukan." };
  if (!category.engines.some((e) => e.id === engineId))
    return { ok: false, message: "Engine tidak ditemukan untuk kategori ini." };
  if (!/^https?:\/\//i.test(url))
    return { ok: false, message: "URL tidak valid. Harus diawali http:// atau https://" };

  const scrape = getEngineLib(category.vendor, engineId);
  if (!scrape)
    return { ok: false, message: "Engine scraper belum tersedia di server." };

  try {
    const raw = await scrape(url.trim());
    if (!raw || typeof raw !== "object")
      return { ok: false, message: "Respons scraper tidak valid." };
    if (!raw.status)
      return {
        ok: false,
        message: raw.message || "Gagal mengekstrak link. Coba engine lain.",
      };

    const data = normalizeResult(raw as Record<string, unknown>);
    if (data.medias.length === 0)
      return {
        ok: false,
        message: "Tidak ada link unduhan yang ditemukan. Coba engine lain.",
      };
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error
          ? `Error: ${err.message}`
          : "Terjadi kesalahan saat memproses URL.",
    };
  }
}
