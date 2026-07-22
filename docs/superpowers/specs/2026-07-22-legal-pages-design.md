# Legal Pages — Privacy Policy & Terms of Use

**Date:** 2026-07-22
**Status:** Approved (user: "shtoj ne fund te website!")

## Goal

Add two legal pages to halitsta.com — a Privacy Policy and Terms of Use —
written in English, grounded in the law of the Republic of Kosovo
(Law No. 06/L-082 on Protection of Personal Data), and linked from the
site footer.

## Decisions

- **Language:** English (matches the rest of the site).
- **Controller identity:** Halit Statovci, Prishtina, Kosovo + contact
  email (`PROFILE.email`). No street address published.
- **Approach:** Real static routes (`app/privacy/page.tsx`,
  `app/terms/page.tsx`) exported as `privacy.html` / `terms.html` —
  not a modal. Clean URLs on GitHub Pages, `.html` hrefs in links so the
  pages also work when the export is opened via `file://` (a stated
  design goal of this repo); `alternates.canonical` points to the clean
  URL to avoid SEO duplication.

## Components

- `components/LegalPage.tsx` — shared server-component shell: minimal
  header (brand + back-to-site link), title, "last updated" line,
  `legal-prose` content area, minimal bottom bar (copyright + link to
  the other legal page). The full site `Footer` is NOT reused — its nav
  links are `#hash` anchors that only resolve on the home page.
- `app/globals.css` — small `.legal-prose` block (h2, p, ul, a styling)
  consistent with existing tokens (ink/mist/accent, display font).

## Content

**Privacy Policy** covers what the site actually does: contact form
(name, email, company, service, budget, message; currently posts
nowhere — direct-email fallback), hosting on GitHub Pages (server logs,
IPs), Google Fonts loaded from Google's CDN, YouTube embeds via
youtube-nocookie.com, no analytics and no first-party cookies. Data
subject rights per Law No. 06/L-082 and complaint route to the
Information and Privacy Agency (AIP).

**Terms of Use** covers: acceptance, permitted use, intellectual
property (incl. client work shown in the portfolio), third-party links,
"as is" disclaimer, limitation of liability, changes, governing law —
Republic of Kosovo, courts of Prishtina.

## Wiring

- `Footer.tsx`: add "Privacy Policy" and "Terms of Use" links to the
  bottom bar row.
- `app/sitemap.ts`: add both URLs.
- Rebuild static export (`npm run build`; postbuild copies `out/` to
  repo root per existing convention).
