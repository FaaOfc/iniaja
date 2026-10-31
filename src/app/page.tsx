"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Cloud,
  Zap,
  Shield,
  Globe,
  Smartphone,
  MousePointerClick,
  Server,
  Download,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { categories } from "@/lib/categories";
import { CatIcon } from "@/components/icon-map";
import IntroScreen from "@/components/intro";

const features = [
  {
    id: "cdn",
    title: "CDN Hosting",
    subtitle: "Host any file, any mimetype",
    description:
      "Upload images, videos, documents, executables — anything. Your files are stored on GitHub and served through your own domain with proper MIME types.",
    color: "#f97316",
    href: "/cdn",
  },
  {
    id: "shorturl",
    title: "URL Shortener",
    subtitle: "Shorten any URL instantly",
    description:
      "Transform long URLs into short, shareable links. Optionally customize your short codes. All mappings stored in a GitHub Gist — zero cost.",
    color: "#10b981",
    href: "/short",
  },
  {
    id: "downloader",
    title: "All-in-one Downloader",
    subtitle: "54 engine, 16 platform",
    description:
      "Unduh video, foto, musik, komik, dan anime dari TikTok, Instagram, YouTube, Facebook, Twitter, Spotify, dan banyak lagi — pilih engine favoritmu.",
    color: "#e1306c",
    href: "/ttdl",
  },
  {
    id: "app",
    title: "Unduh Versi Aplikasi",
    subtitle: "Lebih cepat langsung dari HP",
    description:
      "TaoSite juga tersedia sebagai aplikasi. Ringan, tanpa iklan, tanpa login. Unduh APK-nya dari halaman downloads.",
    color: "#8b5cf6",
    href: "/downloads",
  },
  {
    id: "github-powered",
    title: "GitHub Powered",
    subtitle: "Zero cost infrastructure",
    description:
      "No database, no cloud storage, no hosting fees. GitHub's free tier acts as both a file storage system (repos) and a URL database (gists).",
    color: "#0ea5e9",
    href: "/about",
  },
];

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = features.length;

  useEffect(() => {
    const seen = sessionStorage.getItem("tao_intro_seen");
    if (!seen) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("tao_intro_seen", "1");
    setShowIntro(false);
    setIntroComplete(true);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === displayIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayIndex(index);
        setActiveIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    },
    [displayIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goToSlide((displayIndex + 1) % total);
  }, [displayIndex, total, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((displayIndex - 1 + total) % total);
  }, [displayIndex, total, goToSlide]);

  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      goNext();
    }, 3000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goNext();
    } else if (touchDeltaX.current > threshold) {
      goPrev();
    }
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleManualNav = (fn: () => void) => {
    setIsPaused(true);
    fn();
    setTimeout(() => setIsPaused(false), 5000);
  };

  const currentFeature = features[displayIndex];

  return (
    <>
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}

      <div
        className={`flex flex-col transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-20">
          <div className="absolute inset-0 bg-dots opacity-[0.03]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
            <div className="text-center animate-slide-up">
              <div className="inline-flex items-center gap-2 neo-btn px-4 py-1.5 bg-gray-100 dark:bg-gray-900 text-[var(--neo-accent)] text-sm font-mono mb-6">
                <Zap className="size-4" />
                Open Source &middot; Free Forever
              </div>
              <h1 className="text-4xl sm:text-5xl font-mono font-bold tracking-tight mb-4">
                {siteConfig.siteName}
              </h1>
              <p
                className="text-base sm:text-lg font-mono max-w-xl mx-auto"
                style={{ color: "var(--neo-muted-text)" }}
              >
                {siteConfig.tagline}. Host files, shorten URLs, download media
                dari 16+ platform — all in one place.
              </p>
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-mono font-bold mb-1">
                  Fitur Lengkap
                </h2>
                <p
                  className="font-mono text-xs sm:text-sm"
                  style={{ color: "var(--neo-muted-text)" }}
                >
                  {displayIndex + 1} / {total} — Geser atau klik untuk pindah
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleManualNav(goPrev)}
                  className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => handleManualNav(goNext)}
                  className="neo-btn p-2 bg-[var(--neo-card-bg)] hover:opacity-80"
                  aria-label="Next"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="transition-opacity duration-300 ease-in-out"
                style={{ opacity: isTransitioning ? 0 : 1 }}
              >
                <div className="neo-card p-6 sm:p-8 max-w-md mx-auto text-center">
                  <div className="neo-border rounded-xl p-3 mx-auto mb-4 w-fit bg-gray-100 dark:bg-gray-900">
                    <span className="text-[var(--neo-accent)]">
                      <FeatureIcon id={currentFeature.id} />
                    </span>
                  </div>
                  <h3 className="font-mono font-bold text-lg mb-1">
                    {currentFeature.title}
                  </h3>
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {currentFeature.subtitle}
                  </p>
                  <p
                    className="text-sm mb-5 leading-relaxed"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {currentFeature.description}
                  </p>
                  <Link
                    href={currentFeature.href}
                    className="neo-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-medium text-sm bg-[var(--neo-btn-bg)] text-[var(--neo-btn-fg)] hover:bg-[var(--neo-btn-bg-hover)] hover:-translate-y-1 hover:shadow-[0_0_0_4px_var(--neo-shadow-color)] transition-all duration-200"
                  >
                    Buka {currentFeature.title}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => handleManualNav(() => goToSlide(i))}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    height: 8,
                    backgroundColor:
                      i === activeIndex
                        ? "var(--neo-accent)"
                        : "var(--neo-border-color)",
                    opacity: i === activeIndex ? 1 : 0.3,
                  }}
                  aria-label={`Go to ${f.title}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Downloader Grid */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">
                Semua Downloader
              </h2>
              <p
                className="font-mono text-xs sm:text-sm"
                style={{ color: "var(--neo-muted-text)" }}
              >
                {categories.length} kategori &middot; 54 engine scraper siap pakai
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="neo-card p-4 flex flex-col items-center gap-2 text-center hover:-translate-y-1 hover:shadow-[0_0_0_4px_var(--neo-shadow-color)] transition-all duration-200"
                >
                  <span className="neo-border rounded-lg p-2 bg-gray-100 dark:bg-gray-900 text-[var(--neo-accent)]">
                    <CatIcon name={cat.icon} className="size-5" />
                  </span>
                  <span className="font-mono font-bold text-xs">{cat.short}</span>
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {cat.engines.length} engine
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: <Cloud className="size-5" />,
                  label: "Free CDN",
                  desc: "No cost hosting",
                },
                {
                  icon: <Zap className="size-5" />,
                  label: "Instant",
                  desc: "Sub-second uploads",
                },
                {
                  icon: <Shield className="size-5" />,
                  label: "Secure",
                  desc: "GitHub-backed",
                },
                {
                  icon: <Download className="size-5" />,
                  label: "54 Engines",
                  desc: "16 kategori DL",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="neo-card p-4 text-center animate-slide-up"
                >
                  <div className="flex justify-center mb-2 text-[var(--neo-accent)]">
                    {stat.icon}
                  </div>
                  <div className="font-mono font-bold text-sm">{stat.label}</div>
                  <div
                    className="font-mono text-xs"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className="py-8 sm:py-12"
          style={{ backgroundColor: "var(--neo-card-bg)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-mono font-bold mb-2">
                Cara Kerja
              </h2>
              <p
                className="font-mono text-xs sm:text-sm"
                style={{ color: "var(--neo-muted-text)" }}
              >
                Sederhana, cepat, dan gratis
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Upload / Input",
                  desc: "Drag file untuk CDN, shorten URL, atau paste link media yang mau diunduh",
                  icon: <MousePointerClick className="size-6" />,
                },
                {
                  step: "02",
                  title: "Proses Otomatis",
                  desc: "File ke hosting, URL ke Gist database, dan media diekstrak oleh engine scraper",
                  icon: <Server className="size-6" />,
                },
                {
                  step: "03",
                  title: "Hasil Instan!",
                  desc: "Dapatkan short link, file tersaji via domainmu, atau langsung download media",
                  icon: <Globe className="size-6" />,
                },
              ].map((item) => (
                <div key={item.step} className="neo-card p-5 sm:p-6 text-center">
                  <div className="text-[var(--neo-accent)] flex justify-center mb-3">
                    {item.icon}
                  </div>
                  <div className="font-mono font-bold text-xs text-[var(--neo-accent)] mb-1">
                    STEP {item.step}
                  </div>
                  <h3 className="font-mono font-bold text-base mb-2">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--neo-muted-text)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* App banner */}
            <div className="neo-card p-6 sm:p-8 mt-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="neo-border rounded-xl p-3 bg-gray-100 dark:bg-gray-900 shrink-0 mx-auto sm:mx-0">
                <Smartphone className="size-7 text-[var(--neo-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-base mb-1">
                  Ada versi aplikasinya loh
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--neo-muted-text)" }}
                >
                  Lebih praktis, buka langsung dari home screen HP kamu.
                </p>
              </div>
              <Link
                href="/downloads"
                className="neo-btn shrink-0 inline-flex items-center gap-2 px-5 py-2.5 font-mono font-medium text-sm bg-[var(--neo-btn-bg)] text-[var(--neo-btn-fg)] hover:opacity-90"
              >
                <Smartphone className="size-4" />
                Unduh Aplikasi
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FeatureIcon({ id }: { id: string }) {
  switch (id) {
    case "cdn":
      return <Cloud className="size-6" />;
    case "shorturl":
      return <Globe className="size-6" />;
    case "downloader":
      return <Download className="size-6" />;
    case "app":
      return <Smartphone className="size-6" />;
    default:
      return <Shield className="size-6" />;
  }
}
