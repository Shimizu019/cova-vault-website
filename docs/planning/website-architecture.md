# Website Architecture

Foundation only. Next layer is page-by-page specification.

- `public/`: branding, screenshots, features, previews, icons, downloads, favicon, fonts
- `src/components/`: layout, navigation, buttons, cards, sections, common
- `src/pages/`: Home, Features, Security, Download, Changelog, Documentation, About
- `src/data/`: features, releases, documentation
- `src/layouts/MainLayout/`: Navbar + page + Footer
- `src/styles/`: globals, components, pages
- `src/config/site/`: product name, repo, release, download, links
- `docs/`: planning, design, content, releases
- `.github/workflows/`: build and deploy to covavault.com
