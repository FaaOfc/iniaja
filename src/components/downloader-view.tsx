"use client";

import { useCallback, useState } from "react";
import {
  Download,
  Loader2,
  Video,
  Music2,
  Image as ImageIcon,
  File as FileIcon,
  Link2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { CategoryDef } from "@/lib/categories";
import { CatIcon } from "@/components/icon-map";

interface MediaItem {
  url: string;
  type: "video" | "audio" | "image" | "file" | "link";
  quality?: string;
  thumbnail?: string;
  size?: string;
}

interface NormalResponse {
  status: boolean;
  message?: string;
  result?: {
    title?: string;
    thumbnail?: string;
    author?: string;
    medias: MediaItem[];
  };
}

const typeIcon = (t: MediaItem["type"]) => {
  switch (t) {
    case "video":
      return Video;
    case "audio":
      return Music2;
    case "image":
      return ImageIcon;
    case "link":
      return Link2;
    default:
      return FileIcon;
  }
};

const typeLabel = (t: MediaItem["type"]) => {
  switch (t) {
    case "video":
      return "Video";
    case "audio":
      return "Audio";
    case "image":
      return "Foto";
    case "link":
      return "Link";
    default:
      return "File";
  }
};

function qualityFallback(m: MediaItem, index: number) {
  if (m.quality) return m.quality;
  switch (m.type) {
    case "video":
      return `Video ${index + 1}`;
    case "audio":
      return `Audio ${index + 1}`;
    case "image":
      return `Foto ${index + 1}`;
    case "link":
      return `Link ${index + 1}`;
    default:
      return `File ${index + 1}`;
  }
}

export default function DownloaderView({
  category,
  initialEngine,
}: {
  category: CategoryDef;
  initialEngine: string;
}) {
  const [engine, setEngine] = useState(initialEngine);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NormalResponse["result"] | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!url.trim() || loading) return;

      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch(
          `/api/dl/${category.slug}?engine=${encodeURIComponent(
            engine
          )}&url=${encodeURIComponent(url.trim())}`
        );
        const json: NormalResponse = await res.json();

        if (json.status && json.result && json.result.medias.length > 0) {
          setResult(json.result);
        } else {
          setError(
            json.message ||
              "Gagal mengekstrak link. Coba lagi atau ganti engine lain."
          );
        }
      } catch {
        setError("Tidak dapat menghubungi server. Periksa koneksi internetmu.");
      } finally {
        setLoading(false);
      }
    },
    [url, loading, engine, category.slug]
  );

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-8 sm:py-14 px-4">
      {/* Single shared column — input card & result box are ALWAYS the same
          width and perfectly aligned (never offside to one side). */}
      <div className="w-full max-w-xl min-w-0 mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-3 mb-4 bg-gray-100 dark:bg-gray-900">
            <span className="text-[var(--neo-accent)]">
              <CatIcon name={category.icon} className="size-8" />
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-1">
            {category.label}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {category.description}
          </p>
          <p className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mt-1">
            /{category.slug}/{engine}
          </p>
        </div>

        {/* Input card — same width & padding as the result box below */}
        <div className="neo-card w-full p-4 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full min-w-0">
              <label
                htmlFor="engine"
                className="block font-mono text-xs font-bold mb-1.5"
              >
                Engine
              </label>
              <select
                id="engine"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="neo-border rounded-lg w-full px-3 py-2.5 font-mono text-sm bg-[var(--neo-card-bg)] focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
              >
                {category.engines.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full min-w-0">
              <label
                htmlFor="media-url"
                className="block font-mono text-xs font-bold mb-1.5"
              >
                Link {category.short}
              </label>
              <input
                id="media-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={category.placeholder}
                required
                className="neo-border rounded-lg w-full px-3 py-2.5 font-mono text-sm bg-[var(--neo-card-bg)] focus:outline-none focus:ring-2 focus:ring-gray-400 break-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-btn w-full bg-[#18181b] text-white px-5 py-2.5 font-mono font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Process
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="neo-card w-full p-8 flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-4 border-gray-200 border-t-[#18181b] rounded-full animate-spin" />
            <p className="text-sm font-mono text-gray-500 animate-pulse text-center">
              Mengambil data dari server...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="neo-card w-full p-4 border-red-300! bg-red-50! dark:bg-red-950/40! flex items-start gap-3">
            <AlertTriangle className="size-5 text-red-500 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-mono text-sm font-bold text-red-700 dark:text-red-400">
                Gagal
              </p>
              <p className="font-mono text-xs text-red-600 dark:text-red-400 break-words">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Result — same width as the input card above, fully aligned */}
        {result && !loading && (
          <div className="neo-card w-full overflow-hidden p-4">
            {/* Card header */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b-2 border-gray-200 dark:border-gray-700 mb-4 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[var(--neo-accent)]">
                  <CatIcon name={category.icon} className="size-5 shrink-0" />
                </span>
                <span className="font-mono font-bold text-sm truncate min-w-0">
                  Hasil Ekstraksi
                </span>
              </div>
              <span className="shrink-0 text-xs px-3 py-1 rounded-full font-mono font-bold neo-border bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
                {result.medias.length} Link
              </span>
            </div>

            {/* Preview — full width banner, never shifts sideways */}
            {result.thumbnail && (
              <div className="w-full rounded-xl overflow-hidden neo-border mb-4 bg-black/5 dark:bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.thumbnail}
                  alt="Thumbnail"
                  className="w-full max-w-full max-h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement?.classList.add(
                      "hidden"
                    );
                  }}
                />
              </div>
            )}

            {/* Title / author */}
            {result.title && (
              <p className="font-mono text-sm font-bold mb-1 break-words">
                {result.title}
              </p>
            )}
            {result.author && (
              <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mb-3 break-words">
                {result.author}
              </p>
            )}
            {(result.title || result.author) && (
              <div className="mb-4" />
            )}

            {/* Download buttons — responsive grid, every cell flush & equal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full min-w-0">
              {result.medias.map((m, i) => {
                const TIcon = typeIcon(m.type);
                return (
                  <div
                    key={`${m.url}-${i}`}
                    className="neo-border rounded-lg p-2.5 flex flex-col gap-2 min-w-0 w-full bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="flex items-center gap-2 min-w-0 w-full">
                      <TIcon className="size-3.5 shrink-0 text-[var(--neo-accent)]" />
                      <span className="font-mono text-xs font-bold truncate min-w-0 flex-1">
                        {qualityFallback(m, i)}
                      </span>
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full neo-border bg-[var(--neo-card-bg)] font-mono uppercase">
                        {typeLabel(m.type)}
                      </span>
                    </div>
                    {m.size && (
                      <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 truncate w-full">
                        Ukuran: {m.size}
                      </p>
                    )}
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="neo-btn w-full min-w-0 bg-[#18181b] text-white px-3 py-2 font-mono font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-800"
                    >
                      <Download className="size-3 shrink-0" />
                      <span className="truncate">
                        Download {typeLabel(m.type)}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Footer note + reset */}
            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-dashed border-gray-300 dark:border-gray-700 min-w-0">
              <p className="font-mono text-[10px] text-gray-400 dark:text-gray-500 truncate min-w-0">
                Tekan lama pada link untuk menyalin jika unduhan gagal.
              </p>
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="neo-btn shrink-0 px-2.5 py-1.5 font-mono text-[11px] bg-[var(--neo-card-bg)] flex items-center gap-1"
              >
                <RefreshCw className="size-3" />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
