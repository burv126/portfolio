# Portfolio

Russian-language portfolio for an independent full-stack and AI developer. The public copy lives in `src/config` and `src/data`. Do not add client counts, years of experience, ratings, or project metrics unless they are verified.

## Stack

- Next.js (App Router) and React
- TypeScript in strict mode
- Tailwind CSS
- Motion (`framer-motion`) for navigation, menus, and scroll reveal
- Lucide icons

## Requirements

- Node.js 20.9 or newer
- npm

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build.

## Configuration

Copy `.env.example` to `.env.local`. Restart the dev server after changes.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, and robots. Set this before production deploy. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shows an email link and enables the mailto fallback for the form. |
| `NEXT_PUBLIC_TELEGRAM` | Username with or without `@`. Shows a `t.me` link. |
| `NEXT_PUBLIC_FREELANCE_URL` | freelance.ru profile URL. |
| `CONTACT_WEBHOOK_URL` | Server-only endpoint that receives validated JSON applications. |
| `CONTACT_WEBHOOK_SECRET` | Optional bearer token. It is never sent to the browser. |

The public name is **Владислав Буров** in `src/config/site.ts`. Change `name` and `title` there if needed. A few supplied headlines use masculine grammar.

## Contact form

The form validates in the browser and again on `POST /api/contact`.

- If `CONTACT_WEBHOOK_URL` is set, the server forwards the application and the page shows success only when that request succeeds.
- Otherwise, if `NEXT_PUBLIC_CONTACT_EMAIL` is set, submit opens the visitor's mail client. The page does not claim the letter was sent.
- If neither is set, the contact section shows a setup TODO and submit reports that delivery is not configured. It never shows a success state.

Anti-spam for both paths: a hidden honeypot field and a short minimum fill time. The API also rejects cross-origin posts. Webhook redirects are not followed.

## Editing content

| What | Where |
| --- | --- |
| Name, role, SEO description, contacts | `src/config/site.ts` and `.env.local` |
| Projects, live URLs, case-study copy | `src/data/projects.ts` |
| Services | `src/data/services.ts` |
| Technologies and the "in a project" flag | `src/data/technologies.ts` |
| Process, about, AI, and principles | `src/data/process.ts`, `src/data/content.ts` |

АвтоЦентр deliberately omits features, stack, and results. Add them only after they are confirmed:

```ts
pending: {
  features: [],
  technologies: [],
  outcomes: [],
}
```

Empty lists are not rendered. Project cards use original interface illustrations and label them as illustrations, not screenshots.

Confirmed project link:

- АвтоЦентр — https://ratchethub-production.up.railway.app

NEXORA Vision 360 has no public URL. Its card links to the case study.

## SEO

`src/app/layout.tsx` sets `lang="ru"`, the title, description, Open Graph, and Twitter card metadata. `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` use `NEXT_PUBLIC_SITE_URL`. Person structured data includes only the configured name, role, and real profile links. There are no ratings.

## Deployment

Build on the host, then run the production server:

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the public origin before building so canonical URLs and the sitemap are correct. Set the webhook or email variables in the host's environment, not in client code. The app is a standard Next.js server build and can run on any Node host that supports it.

## Motion and accessibility

Scroll reveal and the architecture pulse respect `prefers-reduced-motion`. Navigation is keyboard accessible, form errors are tied to fields, and section targets use `scroll-margin` so the sticky header does not cover them.
