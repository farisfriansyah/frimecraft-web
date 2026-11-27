import { NextResponse } from "next/server";
import { getPublicApiBaseUrl } from "@/lib/public-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const imageContentTypes = new Set([
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function imageError(message: string, status: number) {
  return NextResponse.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function getAdminImageUrl(filename: string) {
  const publicApiUrl = new URL(getPublicApiBaseUrl());
  const adminBasePath = publicApiUrl.pathname.replace(/\/api\/public\/?$/, "").replace(/\/$/, "");
  const imageUrl = new URL(`${adminBasePath}/api/portfolio-images`, publicApiUrl.origin);
  imageUrl.searchParams.set("filename", filename);
  return imageUrl;
}

export async function GET(request: Request) {
  const filename = new URL(request.url).searchParams.get("filename");
  if (
    !filename ||
    filename.length > 255 ||
    filename === "." ||
    filename === ".." ||
    /[\\/]/.test(filename)
  ) {
    return imageError("Nama file gambar tidak valid.", 400);
  }

  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension || !["avif", "bmp", "gif", "jpeg", "jpg", "png", "webp"].includes(extension)) {
    return imageError("Format gambar tidak didukung.", 415);
  }

  let upstream: Response;
  try {
    upstream = await fetch(getAdminImageUrl(filename), {
      headers: { Accept: "image/avif,image/webp,image/png,image/jpeg,image/*" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Failed to load portfolio image from admin API", error);
    return imageError("Gambar portfolio sementara tidak tersedia.", 502);
  }

  if (!upstream.ok) {
    return imageError(
      upstream.status === 404 ? "Gambar portfolio tidak ditemukan." : "Gagal memuat gambar portfolio.",
      upstream.status === 404 ? 404 : 502,
    );
  }

  const contentType = upstream.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (!contentType || !imageContentTypes.has(contentType) || !upstream.body) {
    return imageError("Respons gambar dari admin tidak valid.", 502);
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
