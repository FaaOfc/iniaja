import { NextRequest, NextResponse } from "next/server";
import { runEngine } from "@/lib/downloader";
import { getCategory } from "@/lib/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/dl/<slug>?engine=<id>&url=<target>
// GET /api/dl/<slug>/<engine>?url=<target>
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ parts: string[] }> }
) {
  const { parts } = await params;
  const [slug, engineParam] = parts;

  const category = slug ? getCategory(slug) : undefined;
  if (!category) {
    return NextResponse.json(
      { status: false, message: "Kategori downloader tidak ditemukan." },
      { status: 404 }
    );
  }

  const engine =
    engineParam ||
    request.nextUrl.searchParams.get("engine") ||
    category.engines[0].id;
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { status: false, message: "Parameter url wajib diisi." },
      { status: 400 }
    );
  }

  const outcome = await runEngine(slug, engine, url);

  if (!outcome.ok) {
    return NextResponse.json(
      { status: false, message: outcome.message || "Gagal memproses URL." },
      { status: 422 }
    );
  }

  return NextResponse.json({
    status: true,
    category: slug,
    engine,
    result: outcome.data,
  });
}
