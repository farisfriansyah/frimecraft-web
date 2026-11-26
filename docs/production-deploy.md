# Production deploy notes

## Target URLs
- Web: https://frimecraft.com
- Admin: https://frimecraft.com/frime-admin

## frimecraft-admin
Use `.env.production.example` as template.

Required behavior already configured:
- `basePath=/frime-admin`
- session cookie path scoped to `/frime-admin`
- middleware redirects aware of `/frime-admin`
- `output: "standalone"`

Build commands:
```powershell
npm install
npx prisma migrate deploy
npx prisma generate
npm run build
```

Optional bootstrap commands:
```powershell
npx prisma db seed
npx ts-node --esm prisma/backfill-bilingual.ts
```

## frimecraft-web
Use `.env.production.example` as template.

Required behavior already configured:
- locale middleware excludes `/frime-admin`
- admin public API points to `/frime-admin/api/public`
- `output: "standalone"`

Build commands:
```powershell
npm install
npm run build
```

## Reverse proxy / hosting expectation
Your hosting must route:
- `/` to frimecraft-web Node app
- `/frime-admin` to frimecraft-admin Node app

If the hosting control panel supports separate Node apps by subfolder/subpath, map them exactly that way.

## Visitor language
- Explicit language URLs and the visitor's language cookie take precedence over automatic detection.
- For country-based detection, configure the trusted reverse proxy or CDN to replace a request header with the visitor's two-letter country code, then set `GEO_COUNTRY_HEADER` to that header's name in the web app. For example, Cloudflare IP Geolocation supplies `CF-IPCountry` when enabled.
- Only enable this setting when the origin cannot be reached without the trusted proxy, and the proxy removes or overwrites client-supplied values of that header. Do not rely on an unverified header.
- Without a valid country header, the preferred browser language is used: Indonesian selects Indonesian, other languages select English. If no usable browser language is provided, Indonesian is the default.
- The locale redirect is temporary and not cacheable because it depends on the visitor. No IP address is sent to a geolocation service by the application.
