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
