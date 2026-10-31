"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { CatIcon } from "@/components/icon-map";

export default function ComingSoon({
  icon,
  title,
  subtitle,
}: {
  icon: string; // lucide key from icon-map
  title: string;
  subtitle: string;
  accent?: string; // kept for compatibility; monochrome theme ignores it
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md min-w-0 mx-auto">
        <div className="neo-card w-full p-8 text-center">
          <div className="inline-flex items-center justify-center neo-border rounded-xl p-4 mb-5 bg-gray-100 dark:bg-gray-900">
            <span className="text-[var(--neo-accent)]">
              <CatIcon name={icon} className="size-10" />
            </span>
          </div>

          <div className="inline-flex items-center gap-2 neo-border rounded-full px-4 py-1.5 bg-gray-100 dark:bg-gray-900 mb-4">
            <Clock className="size-3.5 text-[var(--neo-muted-text)]" />
            <span className="font-mono text-xs font-bold text-[var(--neo-accent)]">
              Coming Soon
            </span>
          </div>

          <h1 className="text-2xl font-mono font-bold mb-2">{title}</h1>
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-relaxed break-words">
            {subtitle}
          </p>

          <div
            className="my-6"
            style={{ borderBottom: "1px dashed var(--neo-border-color)" }}
          />

          <Link
            href="/"
            className="neo-btn inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-bold bg-[#18181b] text-white hover:bg-zinc-800"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
