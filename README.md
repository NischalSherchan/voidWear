@'
# voidWear

A full-stack TypeScript monorepo: a NestJS API, a React admin dashboard, and a Next.js storefront, all sharing one typed package so the API and both frontends stay in sync.

## Tech stack

- **Monorepo tooling:** pnpm workspaces, Turborepo (task orchestration and caching)
- **Backend:** NestJS (ESM), Vitest
- **Admin:** React, Vite
- **Storefront:** Next.js (App Router), Tailwind CSS
- **Shared:** TypeScript package (types and constants) built with tsup

## Structure

| Package | Path | Port |
|---|---|---|
| Backend | `apps/backend` | 4000 |
| Admin | `apps/admin` | 5173 |
| Storefront | `apps/storefront` | 3000 |
| Shared types and constants | `packages/shared` | n/a |

## Getting started

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

- API: http://localhost:4000/products
- Storefront: http://localhost:3000
- Admin: http://localhost:5173

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build everything (cached by Turborepo) |
| `pnpm lint` | Lint everything |
| `pnpm --filter @voidwear/backend dev` | Run a single app |

## Documentation

See [MONOREPO.md](./MONOREPO.md) for the architecture diagrams, tooling decisions, and roadmap.
'@ | Set-Content README.md