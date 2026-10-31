"use client";

import { Heart, Github, ExternalLink, Server, Code2, Zap, MessageSquare, Globe } from "lucide-react";
import { siteConfig } from "@/lib/config";

const apiProviders = [
  {
    name: "Api Faa",
    url: "https://api-faa.my.id",
    description:
      "Repositori scraper open-source yang jadi mesin utama seluruh fitur downloader TaoSite — 54 engine untuk 16 platform.",
    icon: MessageSquare,
    color: "#7c3aed",
  },
  {
    name: "Faanrky API",
    url: "https://taosite.vercel.app",
    description:
      "API publik yang digunakan untuk TikTok Downloader dan Instagram Downloader. Menyediakan parsing dan ekstraksi link media dari platform sosial tanpa perlu autentikasi.",
    icon: Globe,
    color: "#0d9488",
  },
];

const techStack = [
  {
    name: "Next.js 16",
    description: "Framework React full-stack dengan App Router, Server Components, dan API Routes yang menjadi tulang punggung seluruh aplikasi.",
    icon: Code2,
    color: "#000000",
  },
  {
    name: "Prisma + PostgreSQL",
    description: "ORM dan database untuk menyimpan data user, chat sessions, dan messages. Digunakan untuk fitur autentikasi dan persistensi riwayat chat.",
    icon: Server,
    color: "#3b82f6",
  },
  {
    name: "Tailwind CSS 4",
    description: "Utility-first CSS framework untuk styling. Dikombinasikan dengan custom Neobrutalism CSS classes untuk desain yang unik dan konsisten.",
    icon: Zap,
    color: "#38bdf8",
  },
];

const contributors = [
  {
    name: "Alip JMBD",
    contribution: "Ide, desain, referensi, fitur ( CDN & Short url ).",
  },
  {
    name: "Faa - API",
    contribution: "Penyedia Layanan API yang digunakan lebih dari 50% dalam proyek ini.",
  },
  {
    name: "Komunitas Open Source",
    contribution: "Library, framework, dan API publik yang menjadi fondasi setiap fitur di TaoSite.",
  },
];

export default function ThanksPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center neo-border rounded-xl p-4 bg-gray-100 dark:bg-gray-900 mb-4">
          <Heart className="size-8 text-[var(--neo-accent)]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-mono font-bold mb-2">
          Thanks To
        </h1>
        <p className="font-mono text-sm" style={{ color: "var(--neo-muted-text)" }}>
          Ucapan terima kasih untuk semua pihak yang membuat TaoSite mungkin.
        </p>
      </div>

      {/* API Providers */}
      <div className="mb-8">
        <h2 className="font-mono font-bold text-base mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--neo-accent)]" />
          API Providers
        </h2>
        <div className="space-y-4">
          {apiProviders.map((provider) => {
            const Icon = provider.icon;
            return (
              <div key={provider.name} className="neo-card p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="neo-border rounded-lg p-3 shrink-0"
                    style={{ backgroundColor: `${provider.color}15` }}
                  >
                    <Icon className="size-5" style={{ color: provider.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-mono font-bold text-sm">{provider.name}</h3>
                      <a
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono hover:text-[var(--neo-accent)] transition-colors"
                        style={{ color: "var(--neo-muted-text)" }}
                      >
                        <ExternalLink className="size-3 inline" />
                      </a>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                      {provider.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <h2 className="font-mono font-bold text-base mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--neo-accent)]" />
          Teknologi yang Digunakan
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.name} className="neo-card p-5 text-center">
                <div
                  className="neo-border rounded-lg p-2.5 inline-flex mb-3"
                  style={{ backgroundColor: `${tech.color}15` }}
                >
                  <Icon className="size-5" style={{ color: tech.color }} />
                </div>
                <h3 className="font-mono font-bold text-sm mb-2">{tech.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contributors */}
      <div className="mb-8">
        <h2 className="font-mono font-bold text-base mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--neo-accent)]" />
          Kontributor
        </h2>
        <div className="space-y-3">
          {contributors.map((c) => (
            <div key={c.name} className="neo-card p-4 flex items-start gap-3">
              <div className="neo-border rounded-full p-2 shrink-0 bg-gray-100 dark:bg-gray-900">
                <Heart className="size-4 text-[var(--neo-accent)]" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-sm">{c.name}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--neo-muted-text)" }}>
                  {c.contribution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="neo-card p-5 text-center">
        <p className="font-mono text-sm mb-3" style={{ color: "var(--neo-muted-text)" }}>
          Ingin berkontribusi? Bisa Follow Github Dibawah!
        </p>
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-medium text-sm bg-[var(--neo-btn-bg)] text-[var(--neo-btn-fg)] hover:-translate-y-1 hover:shadow-[0_0_0_4px_var(--neo-shadow-color)] transition-all"
        >
          <Github className="size-4" />
          Follow di GitHub
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  );
                            }
                    
