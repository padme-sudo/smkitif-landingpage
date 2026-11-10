# Landing Page — SMK IT Ihsanul Fikri Mungkid

An official landing page for **SMK IT Ihsanul Fikri Mungkid, Magelang**. Built with **React + TypeScript + Vite + Tailwind CSS**, and designed to be deployed as a **WordPress front page** (a ready-to-use theme package is included).

## Features & Page Sections

- **Navbar** — navigation aligned with the school website (Home, PPDB, Profile, Articles, Achievements, Academics, BKK, Contact).
- **Hero** — full-width Swiper banner with the original aspect ratio, slide indicator, and lightbox.
- **School Profile** — overview, vision, and mission.
- **Welcome Message** — principal’s message (Mustain, S.Pd., Gr.).
- **Study Programs** — TJKT, PPLG, and DKV (local icons, cardless layout).
- **Why SMK IT Ihsanul Fikri** — school strengths and flagship programs.
- **Alumni Testimonials** — vertical marquee with alumni data sourced from the school website.
- **News & Articles** — news cards, ready for WordPress integration.
- **Academy Partners** — Cisco, MikroTik, AWS, Red Hat, EC-Council, Fortinet.
- **Footer / Contact** — address, contact details, email, links, social media, and PPDB/WhatsApp actions.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Swiper](https://swiperjs.com/) (hero)
- [Framer Motion](https://www.framer.com/motion/) & [anime.js](https://animejs.com/) (animations)
- [lucide-react](https://lucide.dev/) (icons)

## Prerequisites

- Node.js (latest LTS recommended)
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

> `npm run build` runs `tsc -b` followed by `vite build` (type-check + build).

## Configuration (Environment)

Copy `.env.example` to `.env` if needed.

| Variable | Description |
| --- | --- |
| `VITE_WP_API_BASE` | WordPress base URL (no trailing slash), e.g. `https://smkitihsanulfikri.sch.id`. Used to fetch news via the REST API when the landing page is hosted separately (headless). Leave empty when news is injected from PHP/the WordPress theme. |

## WordPress Integration

This project supports three scenarios:

1. **Minimal WordPress theme (recommended)** — the landing page runs on the same WordPress site, with news injected via PHP (`window.__SMKIT__.berita`) (no CORS/extra fetch required).
2. **Inside an existing/child theme** — copy the template and build output into your current theme.
3. **Headless** — host the React app separately and fetch news from the REST API (`VITE_WP_API_BASE`).

### Ready-to-Use Theme Package

The `wordpress/` folder contains a minimal WordPress theme:

```text
wordpress/
├─ style.css         # Required theme header
├─ index.php         # Fallback template
├─ front-page.php    # Enqueues build assets + injects the latest 3 posts
├─ THEME-README.md   # README included in the theme ZIP
└─ README.md         # Full integration guide
```

- **Ready-to-upload theme ZIP:** `smkit-landing-theme.zip` (install via **Appearance → Themes → Upload Theme**, activate it, then set **Settings → Reading → Static front page**).
- **Full guide (including local setup with Laragon):** see [`wordpress/README.md`](wordpress/README.md).

### News Data Priority

1. `window.__SMKIT__.berita` — injected by PHP (most reliable)
2. REST API: `${VITE_WP_API_BASE|window.__SMKIT__.wpApiBase}/wp-json/wp/v2/posts?_embed&per_page=3`
3. Static sample data (`demoBerita`) as a fallback

## Project Structure

```text
.
├─ public/
├─ src/
│  ├─ assets/              # Images, icons, local assets
│  ├─ components/          # Page and UI components
│  │  └─ ui/               # Reusable UI components (shadcn-style)
│  ├─ data/                # Static data & data sources (navigation, news)
│  ├─ lib/                 # Utilities & hooks
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ globals.css
├─ wordpress/              # WordPress template/theme & integration guide
├─ dist/                   # Build output (generated)
├─ .env.example
├─ index.html
├─ vite.config.ts
└─ package.json
```

## Notes

- The build uses `base: './'` and generates `.vite/manifest.json` so assets can be served from a subfolder/WordPress theme directory.
- **Satoshi** and **Dancing Script** fonts are loaded from Fontshare (CDN) — an internet connection is required, or you can self-host the fonts for offline use.
- Some assets (banners/images/partner logos) are large; consider optimization if needed.
- Content (profile, vision & mission, testimonials, etc.) is based on information available at [smkitihsanulfikri.sch.id](https://www.smkitihsanulfikri.sch.id/).

## License

Not specified yet. Source code, design, and assets (logos, photos, school content) are subject to their respective owners’ terms. Please add an appropriate license before publishing this repository publicly.
