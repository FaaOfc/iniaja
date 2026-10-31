"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Zap,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { categories } from "@/lib/categories";
import { CatIcon } from "@/components/icon-map";

const toolsNav = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/cdn", label: "CDN", icon: "upload" },
  { href: "/short", label: "ShortURL", icon: "link2" },
];

const extraNav = [
  { href: "/downloads", label: "Unduh Versi Aplikasi", icon: "smartphone" },
  { href: "/nonton-anime", label: "Nonton Anime", icon: "tv" },
  { href: "/topup", label: "Top UP Murah", icon: "wallet" },
];

const infoNav = [
  { href: "/about", label: "About", icon: "users" },
  { href: "/thanks", label: "Thanks To", icon: "heart" },
  { href: "/tos", label: "ToS", icon: "file" },
  { href: "/credits", label: "Credits", icon: "sparkles" },
];

function NavItem({
  href,
  label,
  active,
  onClick,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={label}
      className={`flex items-center gap-2 px-3 py-2 rounded-md font-mono text-sm font-medium transition-all ${
        active
          ? "bg-[var(--neo-btn-bg)] text-[var(--neo-btn-fg)] shadow-none"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const close = () => setMobileOpen(false);

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="p-4 border-b-2 flex items-center gap-2 shrink-0"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        <Zap className="size-5 text-[var(--neo-accent)] shrink-0" />
        <span className="font-mono font-bold text-base tracking-tight truncate">
          TaoSite
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* Tools */}
        {toolsNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href)}
            onClick={close}
          >
            <CatIcon name={item.icon} className="size-4 shrink-0" />
          </NavItem>
        ))}

        <SectionDivider label="Downloader" />

        {/* Downloader categories */}
        {categories.map((cat) => (
          <NavItem
            key={cat.slug}
            href={`/${cat.slug}`}
            label={cat.short}
            active={isActive(`/${cat.slug}`)}
            onClick={close}
          >
            <span className="text-[var(--neo-muted-text)]">
              <CatIcon name={cat.icon} className="size-4 shrink-0" />
            </span>
          </NavItem>
        ))}

        <SectionDivider label="Lainnya" />

        {/* Extra pages */}
        {extraNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href)}
            onClick={close}
          >
            <CatIcon name={item.icon} className="size-4 shrink-0" />
          </NavItem>
        ))}

        <SectionDivider label="Info" />

        {/* Info pages */}
        {infoNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(item.href)}
            onClick={close}
          >
            <CatIcon name={item.icon} className="size-4 shrink-0" />
          </NavItem>
        ))}
      </nav>

      {/* Theme toggle at bottom */}
      <div
        className="p-3 border-t-2 shrink-0"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="neo-btn w-full flex items-center gap-2 px-3 py-2 font-mono text-sm bg-[var(--neo-card-bg)] hover:opacity-80"
          >
            {theme === "dark" ? (
              <Sun className="size-4 shrink-0" />
            ) : (
              <Moon className="size-4 shrink-0" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden sm:flex w-52 shrink-0 border-r-2 flex-col sticky top-0 h-screen bg-[var(--neo-card-bg)] z-40"
        style={{ borderColor: "var(--neo-border-color)" }}
      >
        {navContent}
      </aside>

      {/* Mobile: top bar + overlay sidebar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-50 neo-border bg-[var(--neo-card-bg)] flex items-center justify-between px-3 h-12">
        <div className="flex items-center gap-2 font-mono font-bold text-base">
          <Zap className="size-4 text-[var(--neo-accent)]" />
          TaoSite
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="neo-btn p-1.5 bg-[var(--neo-card-bg)]"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="sm:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="sm:hidden fixed top-0 left-0 bottom-0 w-56 z-50 border-r-2 bg-[var(--neo-card-bg)] animate-slide-left"
            style={{ borderColor: "var(--neo-border-color)" }}
          >
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-2 mx-1 flex items-center gap-2">
      <span
        className="font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-600"
        style={{ color: "var(--neo-muted-text)", opacity: 0.8 }}
      >
        {label}
      </span>
      <span
        className="flex-1"
        style={{ borderBottom: "1px dashed var(--neo-border-color)", opacity: 0.5 }}
      />
    </div>
  );
}
