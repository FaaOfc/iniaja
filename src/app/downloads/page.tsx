import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Apple,
  Download,
  Package,
  Info,
  ExternalLink,
} from "lucide-react";
import { appConfig } from "@/lib/appConfig";

export const metadata: Metadata = {
  title: "Unduh Versi Aplikasi — TaoSite",
  description: "Unduh aplikasi TaoSite untuk Android dan iOS.",
};

export default function DownloadsPage() {
  const { android, ios, mirrors } = appConfig;

  const platforms = [
    { key: "android", icon: Smartphone, ...android },
    { key: "ios", icon: Apple, ...ios },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-start justify-center py-8 sm:py-14 px-4">
      {/* Single shared column — header, info card & buttons always aligned */}
      <div className="w-full max-w-xl min-w-0 mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-3 mb-4 bg-gray-100 dark:bg-gray-900">
            <Smartphone className="size-8 text-[var(--neo-accent)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-1">
            Unduh Versi Aplikasi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            Nikmati {appConfig.appName} lebih cepat langsung dari HP kamu.
          </p>
        </div>

        {/* Version info card */}
        <div className="neo-card w-full p-4 mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <Package className="size-5 text-[var(--neo-accent)] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-sm font-bold truncate">
                {appConfig.appName} v{appConfig.latestVersion}
              </p>
              <p className="font-mono text-xs text-gray-500 dark:text-gray-400 break-words">
                {appConfig.updatedNote}
              </p>
            </div>
          </div>
        </div>

        {/* Download buttons — equal width, stacked, flush */}
        <div className="flex flex-col gap-4 w-full">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.key} className="neo-card w-full p-4">
                <div className="flex items-center gap-3 mb-3 min-w-0">
                  <div className="neo-border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm font-bold truncate">
                      {p.label}
                    </p>
                    <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                      v{p.version} &middot; {p.size} &middot; {p.minOs}
                    </p>
                  </div>
                </div>

                {p.enabled && p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn w-full bg-[#18181b] text-white px-4 py-3 font-mono font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-800"
                  >
                    <Download className="size-4 shrink-0" />
                    Download {p.key === "ios" ? "iOS" : "APK"}
                  </a>
                ) : (
                  <button
                    disabled
                    className="neo-btn w-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 px-4 py-3 font-mono font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Download className="size-4 shrink-0" />
                    Segera Tersedia
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Mirrors (optional) */}
        {mirrors.length > 0 && (
          <div className="neo-card w-full p-4 mt-6">
            <p className="font-mono text-xs font-bold mb-3 flex items-center gap-2">
              <ExternalLink className="size-3.5" /> Link Alternatif
            </p>
            <div className="flex flex-col gap-2">
              {mirrors.map((m) => (
                <a
                  key={m.url}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-3 py-2 font-mono text-xs bg-[var(--neo-card-bg)] flex items-center justify-between gap-2 hover:opacity-80"
                >
                  <span className="truncate min-w-0">{m.label}</span>
                  <Download className="size-3.5 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Info note */}
        <div className="neo-card w-full p-4 mt-6 border-dashed">
          <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400 flex items-start gap-2 break-words">
            <Info className="size-4 shrink-0 mt-0.5 text-[var(--neo-accent)]" />
            Tidak bisa download lewat browser? Semua fitur web tetap bisa
            diakses gratis tanpa aplikasi.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="font-mono text-xs text-[var(--neo-accent)] hover:underline"
          >
            &larr; Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
