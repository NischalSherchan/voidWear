# voidWear

A full-stack TypeScript monorepo for a clothing brand's ecommerce store: a Next.js storefront, a React admin dashboard and a NestJS API, sharing one typed package.

## Status

- [x] Storefront v1 (static)
- [ ] Backend (NestJS, PostgreSQL, Prisma)
- [ ] Authentication
- [ ] Cart and checkout
- [ ] Admin panel

Latest release: [storefront-v1.0.0](https://github.com/NischalSherchan/voidWear/releases/tag/storefront-v1.0.0)

## Tech stack

- **Monorepo:** pnpm workspaces, Turborepo
- **Storefront:** Next.js (App Router), Tailwind CSS, Motion
- **Admin:** React, Vite
- **Backend:** NestJS, PostgreSQL, Prisma (in progress)
- **Shared:** TypeScript package for types and constants

## Structure

| Package | Path | Port |
|---|---|---|
| Storefront | `apps/storefront` | 3000 |
| Admin | `apps/admin` | 5173 |
| Backend | `apps/backend` | 4000 |
| Shared types | `packages/shared` | n/a |

## Getting started

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm turbo run dev --filter=@voidwear/storefront
```

Open http://localhost:3000. Run `pnpm dev` to start every app (the backend needs the database: `docker compose up -d`).

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build everything (cached by Turborepo) |
| `pnpm lint` | Lint everything |
| `pnpm --filter @voidwear/storefront dev` | Run a single app |

## Storefront v1

**Home page**
- Hero: single image (kept simple to move faster)
- Products: Motion animation and a shared-element product dialog
- About and contact sections: static, no contact form API

**Product page**
- Static product list with filters
- Product detail page

**About and contact pages**
- Static pages

## Roadmap

**Home page**
- Hero: collection-linked images, multiple slides, optional video, API data, better mobile typography
- Products: GSAP intro where clothes drop in from the top, hang on the branch and swing realistically
- About and contact: GSAP scroll reveals

**Product page**
- API integration and server-side filtering and pagination

**About and contact pages**
- API integration (contact form submission)