import { NextResponse } from "next/server";
import type { PublicPortfolio } from "@/types/public-api";
import { normalizeImageUrl } from "@/lib/public-api";
import { deduplicatePortfolios } from "@/lib/portfolio-dedupe";

const DEFAULT_PUBLIC_API_BASE = "http://localhost:3000/frime-admin/api/public";

function getAdminPublicApiBase() {
  return (process.env.FRIMECRAFT_ADMIN_PUBLIC_API_BASE || DEFAULT_PUBLIC_API_BASE).replace(/\/$/, "");
}

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const query = incomingUrl.searchParams.toString();
  const target = `${getAdminPublicApiBase()}/portfolios${query ? `?${query}` : ""}`;

  const targetUrl = new URL(target);
  if (targetUrl.origin === incomingUrl.origin && targetUrl.pathname === incomingUrl.pathname) {
    console.error("Portfolios API proxy points to itself; configure FRIMECRAFT_ADMIN_PUBLIC_API_BASE");
    return NextResponse.json({ success: false, message: "Portfolios API is not configured" }, { status: 502 });
  }

  try {
    const response = await fetch(target, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) {
      return new NextResponse(text, {
        status: response.status,
        headers: { "content-type": response.headers.get("content-type") || "application/json" },
      });
    }

    let payload: { data?: PublicPortfolio[]; [key: string]: unknown };
    try {
      payload = JSON.parse(text) as { data?: PublicPortfolio[]; [key: string]: unknown };
    } catch {
      return new NextResponse(text, {
        status: response.status,
        headers: { "content-type": response.headers.get("content-type") || "application/json" },
      });
    }

    if (!Array.isArray(payload.data)) {
      return NextResponse.json(payload, { status: response.status });
    }

    return NextResponse.json(
      {
        ...payload,
        data: deduplicatePortfolios(payload.data.map((portfolio) => ({
          ...portfolio,
          imageUrl: normalizeImageUrl(portfolio.imageUrl),
        }))),
      },
      { status: response.status },
    );
  } catch (error) {
    console.error("Failed to proxy portfolios endpoint", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to proxy portfolios endpoint",
      },
      { status: 502 },
    );
  }
}
