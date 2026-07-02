Frimecraft Web is a standalone Next.js frontend application.

It is intentionally separated from frimecraft-admin and consumes read-only public endpoints from admin.

## Getting Started

1) Copy environment file and adjust API base URL:

```bash
cp .env.example .env.local
```

2) Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Required Environment

- FRIMECRAFT_ADMIN_PUBLIC_API_BASE
	- Example: http://localhost:3000/api/public
	- If frimecraft-admin runs on a different port, update this value accordingly.

## Current Implemented Foundation

- Site shell: layout, navbar, footer
- SEO metadata generated from public frontend settings endpoint
- Home page foundation
- Dedicated profile page at /profile
- Articles listing page
- Article detail page
- Query-based filters and pagination for /articles and /portfolios
- JSON-LD structured data for article and portfolio detail pages
- Public API client layer in src/lib/public-api.ts

## Public API Contract Used

- GET /api/public/frontend-settings
- GET /api/public/profile-summary
- GET /api/public/articles?page=1&pageSize=9
- GET /api/public/articles/:slug
- GET /api/public/portfolios?featured=true&page=1&pageSize=6
- GET /api/public/portfolios/:slug

## Migration Roadmap

Detailed Laravel -> Next.js migration plan is available at:

- docs/MIGRATION_ROADMAP.md

## Notes

- Keep admin and web deployment lifecycle separated.
- Restrict admin API exposure to public-safe fields only.
