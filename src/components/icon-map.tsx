"use client";

import {
  Music2,
  Camera,
  Monitor,
  Youtube,
  Twitter,
  Pin,
  AudioLines,
  AtSign,
  MessageSquare,
  Box,
  Brush,
  Disc3,
  CloudDrizzle,
  BookOpen,
  Clapperboard,
  Link2,
  Smartphone,
  Tv,
  Wallet,
  UploadCloud,
  Home,
  Users,
  Heart,
  FileText,
  Sparkles,
  LucideIcon,
} from "lucide-react";

// Maps the string icon keys used in lib/categories.ts & sidebar nav
// to actual lucide components (keeps data files client-safe).
const icons: Record<string, LucideIcon> = {
  music: Music2,
  musical: AudioLines,
  instagram: Camera,
  facebook: Monitor,
  youtube: Youtube,
  twitter: Twitter,
  pin: Pin,
  at: AtSign,
  message: MessageSquare,
  box: Box,
  brush: Brush,
  disc: Disc3,
  wave: CloudDrizzle,
  book: BookOpen,
  clapper: Clapperboard,
  link2: Link2,
  smartphone: Smartphone,
  tv: Tv,
  wallet: Wallet,
  upload: UploadCloud,
  home: Home,
  users: Users,
  heart: Heart,
  file: FileText,
  sparkles: Sparkles,
};

export function CatIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Link2;
  return <Icon className={className} />;
}
