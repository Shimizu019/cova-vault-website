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
- React Router 6
- Static build — no backend, no database, no login/signup/accounts

## Commands

```bash
npm install
npm run dev      # dev server (port 3000)
npm run build    # type-check + production build
npm run preview  # serve production build
npm run lint     # eslint
```

## Platform availability

| Platform | Status | Format | Source |
| --- | --- | --- | --- |
| Android | AVAILABLE | APK | `Shimizu019/cova-vault` GitHub Releases |
| Windows | COMING SOON | EXE | not available yet (no fake download) |

## Structure

```text
src/
├── components/{buttons,cards,common,layout}/
├── data/            # features, documentation, platforms (verified content)
├── pages/           # Home, Features, Security, Download, Changelog, Documentation, About, NotFound
├── layouts/         # MainLayout
├── config/site/     # canonical repo URLs + GitHub-sourced release data
├── hooks/           # useTheme (dark/light/system, persisted)
└── styles/globals/  # Tailwind + design tokens + a11y/reduced-motion
```

## Content rules

- Feature/security/release copy comes from verified Android project information only.
- No exaggerated security claims, no invented versions/dates/APK URLs.
- Windows is never shown as available until a real Windows build exists.
