import { NextResponse } from "next/server";

const DEFAULT_PUBLIC_API_BASE = "http://localhost:3000/api/public";

function getAdminPublicApiBase() {
  return (process.env.FRIMECRAFT_ADMIN_PUBLIC_API_BASE || DEFAULT_PUBLIC_API_BASE).replace(/\/$/, "");
}

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const query = incomingUrl.searchParams.toString();
  const target = `${getAdminPublicApiBase()}/articles${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(target, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "content-type": response.headers.get("content-type") || "application/json" },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to proxy articles endpoint",
        data: [],
        pagination: { page: 1, pageSize: 9, total: 0, totalPages: 1 },
      },
      { status: 200 },
    );
  }
}
