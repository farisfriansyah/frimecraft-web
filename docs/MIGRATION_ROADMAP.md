# Frimecraft Laravel -> Next.js Migration Roadmap

## Tujuan
Recode frontend Laravel lama menjadi Next.js dengan sumber konten dari frimecraft-admin.

## Fase 0: Foundation (sudah dimulai)
- Setup project terpisah frimecraft-web.
- Sediakan data client ke endpoint publik admin.
- Bentuk layout global, navigasi, footer, metadata SEO dasar.

## Fase 1: Parity Halaman Utama
- Home page parity visual + copywriting.
- Halaman article list dan article detail.
- Migrasi reusable UI section (hero, portfolio highlight, CTA).

## Fase 2: Data Contract Stabilization
- Finalisasi endpoint publik admin versi v1.
- Tetapkan DTO dan fallback policy saat data kosong.
- Tambahkan cache strategy: ISR + stale-while-revalidate.

## Fase 3: SEO and Performance
- Migrasi metadata per halaman dari Laravel.
- Tambahkan Open Graph dan structured data (JSON-LD).
- Optimasi image delivery dan Core Web Vitals.

## Fase 4: Content Freeze & Cutover
- Freeze update konten di Laravel frontend.
- Verifikasi parity konten dan URL mapping.
- Uji 301 redirect plan dan canonical URLs.
- Rollout bertahap dengan canary traffic.

## Fase 5: Post Cutover
- Monitoring error, search indexing, dan conversion metrics.
- Decommission frontend Laravel setelah stabil.

## Checklist Teknis Penting
- Environment FRIMECRAFT_ADMIN_PUBLIC_API_BASE terpasang.
- Endpoint publik admin hanya expose field aman.
- Semua request publik memiliki rate limit.
- Jalur media/image dapat diakses dari domain frontend.
