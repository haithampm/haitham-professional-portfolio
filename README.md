# Haitham Elmohamady Portfolio

Bilingual Arabic/English professional portfolio for Haitham Elmohamady,
focused on SAP program management, ERP delivery, Smart City municipal solutions,
certifications, company logos, project partners, gallery media, and a simple
admin panel for content and image management.

## Live Site

https://haitham-portfolio-2026.mazen-raslan-7066.chatgpt-team.site

The hosted site is private to the configured OpenAI workspace user.

## Features

- Arabic and English interface with RTL/LTR switching.
- Professional profile image, visual hero, logo sections, and motion.
- Certification, company, and project partner logo areas.
- Gallery section backed by uploaded media when storage is available.
- Simple admin panel at `/admin` for editing key portfolio copy and adding
  images.
- Cloudflare Sites deployment with D1 metadata storage and R2 media storage.

## Local Setup

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run lint
npm run build
```

Production preview:

```bash
npm run start -- --port 3011
```

## Project Structure

- `app/`: portfolio pages, admin panel, and API routes.
- `app/content.ts`: default bilingual copy, gallery entries, and logo data.
- `db/`: Drizzle schema and D1 helper.
- `drizzle/`: generated D1 migrations.
- `public/`: profile image, CV, logos, screenshot, and visual assets.
- `worker/`: Cloudflare Worker entry point.
- `.openai/hosting.json`: Sites project and logical D1/R2 bindings.

## Notes

Local development does not include real Cloudflare D1/R2 bindings, so API routes
return safe warnings instead of crashing. The deployed Worker receives those
bindings from Sites at runtime.
