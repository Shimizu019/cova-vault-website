# Cova Vault Website

Official public website for **Cova Vault** — a personal vault for organizing credentials, notes, tasks, PeraLog, wallet, savings, folders, favorites, and calendar.

## Repositories

- **Android application:** https://github.com/Shimizu019/cova-vault
- **Website:** https://github.com/Shimizu019/cova-vault-website

The two repositories are separate. GitHub Releases of the Android repository is the source of truth for versions, APKs, and release notes.

## Stack

- React 18 + Vite 5
- TypeScript
- Tailwind CSS (primary styling)
- React Router 6 (`createBrowserRouter`)
- lucide-react (icons)
- Static build — no backend, no database, no login/signup/accounts

## Commands

```bash
npm install
npm run dev      # dev server (port 3000)
npm run build    # type-check + production build
npm run preview  # serve production build
npm run lint     # eslint
npm run format   # prettier
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/features` | Features |
| `/security` | Security |
| `/download` | Download |
| `/changelog` | Changelog |
| `/documentation` | Documentation |
| `/demo` | Interactive demo |
| `/about` | About |
| `*` | Not Found |

## Branding

| Asset | Purpose |
| --- | --- |
| `src/assets/images/CovaLogo.png` | Horizontal wordmark — navbar and footer (`CovaLogo.tsx`) |
| `src/assets/images/lockLogo.png` | Lock icon — app icon inside the phone mockup (`PhoneMockup.tsx`) |
| `public/favicon.png` | Browser tab / touch icon, copied from `lockLogo.png` |

`public/favicon.svg` is retained but no longer referenced by `index.html`.

## Interactive demo (`/demo`)

A self-contained preview of the app — not a functional vault.

- **Screens:** Dashboard, Credentials, Notes, Tasks, Wallet, Savings, Activity
- **Sample data:** fictional and hardcoded in `src/data/demoData.ts`
- **State:** React component state in memory only. Nothing is written to
  `localStorage`, IndexedDB, cookies, or any backend, and no input is sent to an
  API. Refreshing or using **Reset Demo** restores the original samples.
- **Safety:** a persistent banner states that the demo is fictional and that real
  passwords or sensitive information must never be entered.
- Reachable from the navbar (desktop + mobile) and the homepage hero CTA. The
  official Android download links remain unchanged.

## APK download counter

`src/lib/githubDownloads.ts` → `src/hooks/useApkDownloads.ts` → `src/components/common/DownloadCounter.tsx`

- Reads the public GitHub Releases REST API (no token, no backend):
  `https://api.github.com/repos/Shimizu019/cova-vault/releases?per_page=100`
- Sums `download_count` for every asset whose name ends in `.apk`
  (case-insensitive), across stable and beta releases, following pagination.
  Draft releases and non-APK assets (ZIPs, source archives) are excluded.
- Caches a successful result for ~15 minutes and reuses the last known total
  (marked *last known total*) if a refresh fails.
- Loading and unavailable states are handled gracefully; download buttons keep
  working regardless of the counter's state. No analytics or visitor tracking.
- Displayed on the homepage hero and the Download page.

## Structure

```text
src/
├── assets/images/    # CovaLogo.png (wordmark), lockLogo.png (lock icon)
├── components/
│   ├── buttons/      # Button, DownloadButton
│   ├── cards/        # DocumentationCard, FeatureCard, PlatformCard, ReleaseCard
│   ├── common/       # Badge, BrandMark, Container, CovaLogo, DownloadCounter,
│   │                 # GitHubIcon, ModuleTile, PhoneMockup, SectionHeading, SEO
│   ├── demo/         # DemoBanner, DemoScreens
│   ├── layout/       # Footer, Navbar, ThemeButton
│   └── sections/     # Download, Hero, LatestRelease, Modules, Money, Privacy
├── config/site/      # canonical repo URLs + GitHub-sourced release data
├── data/             # demoData, documentation, features, moduleMeta, platforms, topicIcons
├── hooks/            # useApkDownloads, useScrollReveal, useTheme
├── lib/              # githubDownloads (Releases API aggregation + cache)
├── layouts/          # MainLayout
├── pages/            # Home, Features, Security, Download, Changelog, Documentation,
│                     # Demo, About, NotFound
├── router.tsx
└── styles/globals/   # Tailwind + design tokens + a11y/reduced-motion

public/               # favicon.png, favicon.svg, brand/, images/screenshots/
```

## Theming

Dark (default), light, and system modes, cycled from the navbar control and
persisted to `localStorage` under `cova-theme`. Colors come from the `cova-*`
CSS-variable design tokens; no hardcoded brand colors in components. The demo
and phone mockup keep their own dark app screens intentionally.

## Accessibility

- `prefers-reduced-motion` disables scroll-reveal and floating animations
- Visible keyboard focus; 44px minimum touch targets
- Mobile menu traps focus and closes on `Escape`, with `aria-expanded`
- Decorative imagery uses `alt=""`; branding images have meaningful alt text
- Semantic headings and landmarks on every page

## Platform availability

| Platform | Status | Format | Source |
| --- | --- | --- | --- |
| Android | AVAILABLE | APK | `Shimizu019/cova-vault` GitHub Releases |
| Windows | COMING SOON | EXE | not available yet (no fake download) |

## Content rules

- Feature/security/release copy comes from verified Android project information only.
- No exaggerated security claims, no invented versions/dates/APK URLs.
- Windows is never shown as available until a real Windows build exists.
- The download counter is labeled as a total reported by GitHub — never as a
  unique-user, active-user, or successful-install figure.
- Release data in `src/config/site/site.ts` is a verified static snapshot; it is
  intended to be replaced by a build-time GitHub sync.
