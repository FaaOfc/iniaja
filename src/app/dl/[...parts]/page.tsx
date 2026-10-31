import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/lib/categories";
import DownloaderView from "@/components/downloader-view";

interface Props {
  params: Promise<{ parts: string[] }>;
}

export function generateStaticParams() {
  // Pre-render /dl/<slug> for every category (engine defaults to first).
  return categories.map((c) => ({ parts: [c.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { parts } = await params;
  const category = getCategory(parts[0] || "");
  if (!category) return { title: "Not Found — TaoSite" };
  return {
    title: `${category.label} — TaoSite`,
    description: category.description,
  };
}

export default async function DlPage({ params }: Props) {
  const { parts } = await params;
  const [slug, engineParam] = parts || [];
  const category = getCategory(slug || "");

  if (!category) notFound();

  const engine =
    engineParam && category.engines.some((e) => e.id === engineParam)
      ? engineParam
      : category.engines[0].id;

  return <DownloaderView category={category} initialEngine={engine} />;
}
