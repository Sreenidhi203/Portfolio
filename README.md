# Sreenidhi — Portfolio

Personal portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Tech Stack

- **Framework** — React 19 + TypeScript (strict mode)
- **Build** — Vite 8 with manual chunk splitting
- **Styling** — Tailwind CSS v4 + CSS custom properties
- **Animation** — Framer Motion 12
- **Linting** — ESLint + oxlint + Prettier

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Base URL for the contact form API. Leave empty to disable form submission. |

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Other Scripts

| Script | Description |
|---|---|
| `npm run typecheck` | Run TypeScript type checking without emitting |
| `npm run lint` | Run ESLint across all `.ts` / `.tsx` files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format all source files with Prettier |

## Folder Structure

```
src/
├── components/     # Shared UI components (ThemeToggle, PillTabs, etc.)
├── config/         # Environment validation (env.ts)
├── constants/      # Site-wide constants and content (SITE, BIO, NAV_LINKS)
├── context/        # React context providers (ThemeContext)
├── data/           # Static data (projects, certifications, experience, skills)
├── hooks/          # Custom React hooks
├── layouts/        # Page-level layout components (Navbar, Footer, RootLayout)
├── pages/          # Section components (Hero, About, Skills, etc.)
├── services/       # HTTP client with typed errors and retry logic
├── styles/         # Global CSS (Tailwind base + custom properties)
├── types/          # Shared TypeScript interfaces
└── utils/          # Pure utility functions (cn, scrollToSection, inputCls)
```

## Deployment

The `public/` directory includes:

- `_headers` — Security headers (CSP, HSTS, X-Frame-Options) for Netlify / Cloudflare Pages
- `_redirects` — SPA fallback routing for Netlify
- `robots.txt` — Search engine crawl rules
- `sitemap.xml` — URL map for indexing

### Netlify

Connect the repo and set build command to `npm run build` with publish directory `dist`.

### Vercel

Zero-config. Import the repo — Vercel auto-detects Vite.

## Content Updates

All portfolio content lives in `src/constants/index.ts` and `src/data/`:

- **Personal info / social links** → `src/constants/index.ts` (`SITE`, `BIO`)
- **Projects** → `src/data/index.ts`
- **Experience / timeline** → `src/data/experience.ts`
- **Skills** → `src/data/skills.ts`
- **Certifications** → `src/data/index.ts`
