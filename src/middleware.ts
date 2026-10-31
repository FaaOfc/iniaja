import { NextRequest, NextResponse } from "next/server";
import { categorySlugs } from "@/lib/categories";

// Rewrite pretty downloader URLs to the internal /dl route:
//   taoosite.my.id/igdl            -> /dl/igdl
//   taoosite.my.id/igdl/snapsave   -> /dl/igdl/snapsave
// Everything else (short codes, CDN files) falls through to the root
// catch-all route handler unchanged.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length >= 1 &&
    segments.length <= 2 &&
    categorySlugs.includes(segments[0])
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/dl/${segments.join("/")}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals and static files (anything with a dot).
  matcher: ["/((?!api/|_next/|favicon.ico).*)"],
};
