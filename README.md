# Hema Priya V — Portfolio

Personal portfolio of **Hema Priya V**, Quality Engineer II / SDET II (automation framework design, web and mobile UI automation, CI/CD, AI-assisted quality engineering).

Built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**. Contact email is sent through **[Resend](https://resend.com/)**, and the site is designed to deploy on **[Vercel](https://vercel.com/)**.

> This repo uses a recent Next.js with breaking changes. When changing framework behaviour, read the bundled docs in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## What's on the site

| Route | Content |
| --- | --- |
| `/` | Hero and metrics · About · How I Work · Experience · Selected Work · Skills · AI × QA · Recommendations · Education · Contact |
| `/internships` | All internships and early roles |
| `/recommendations` | Every recommendation in full |
| `/api/contact` | Contact form endpoint (POST) |
| `/api/recommendations` | Recommendations as JSON (GET) |

Also included: dark/light theme (no flash on load), active-section highlighting and scroll progress in the header, Open Graph image, `sitemap.xml`, `robots.txt`, Person JSON-LD, and custom 404 / error pages.

## Getting started

Requires a current Node.js release (developed on Node 25; check the Next.js installation docs for the minimum supported version).

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

The site runs without any environment variables. Only the contact form needs the Resend settings below.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run import:recommendations -- <file.csv>` | Convert a LinkedIn export into `src/data/recommendations.json` |

Before committing, run `npx tsc --noEmit && npm run lint && npm run build`.

## Editing content

Almost everything you'll want to change lives in **`src/data/site.ts`**:

| Export | Controls |
| --- | --- |
| `site` | Name, title, SEO description, contact links, resume link |
| `availability` | The green "Open to…" status pills |
| `navItems` | Header menu |
| `metrics`, `about`, `exploring` | Hero cards, About text, "Currently exploring" |
| `leadership`, `principles` | Leadership cards, the ten "How I Work" principles |
| `experience`, `internships` | Timeline entries |
| `work` | Selected Work tabs |
| `coreSkills`, `moreSkills` | Skills cards |
| `aiTopics`, `education`, `certifications` | AI × QA, Education sections |

Recommendations live separately in **`src/data/recommendations.json`** (see below).

## Environment variables

Copy `.env.example` to `.env.local`. This file is gitignored — never commit real values.

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | server | for contact form | Resend API key |
| `CONTACT_EMAIL` | server | for contact form | Inbox that receives messages |
| `FROM_EMAIL` | server | for contact form | Sender address (a verified domain in production) |
| `NEXT_PUBLIC_SITE_URL` | public | recommended | Canonical URL, sitemap, Open Graph |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_LINKEDIN_URL`, `_GITHUB_URL`, `_TWITTER_URL`, `_LINKTREE_URL` | public | no | Override the contact links (defaults are in `site.ts`) |
| `NEXT_PUBLIC_RESUME_DRIVE_URL` | public | no | Override the resume link |
| `RECOMMENDATIONS_SOURCE_URL`, `RECOMMENDATIONS_SOURCE_TOKEN` | server | no | Optional authorized feed (see below) |

Restart `npm run dev` after changing `.env.local`.

## Contact form

```
Form → POST /api/contact → validation → spam checks → Resend → your inbox
```

- **Validation:** `zod` schema in `src/lib/contact-schema.ts`.
- **Spam protection:** a hidden honeypot checkbox, a minimum time-on-form check measured in the browser, and a per-IP rate limit (5 per 10 minutes). Suspected spam gets a normal-looking success response and a warning in the server log (`submission dropped by spam check`).
- **Rate limiting** is in-memory and only enforced in production. On serverless hosts it is best-effort per instance; use a shared store (e.g. Upstash) if you see abuse.
- **Email:** HTML + plain-text template in `src/lib/email-template.ts`; Reply-To is the visitor's address. Sending code is in `src/lib/mail.ts`.
- If the Resend variables are missing, the endpoint returns `503` and the form shows an error.
- Resend's sandbox sender (`onboarding@resend.dev`) only delivers to the account owner's email. Verify your own domain for production.

## Recommendations

Recommendations are read from `src/data/recommendations.json` and shown as collapsible cards on the home page, with all of them on `/recommendations`. LinkedIn is never scraped, and the data is labelled as selected from LinkedIn, not as a live feed.

To refresh from LinkedIn's data export:

1. LinkedIn → **Settings → Data privacy → Get a copy of your data** → choose Recommendations.
2. `npm run import:recommendations -- ~/Downloads/Recommendations_Received.csv`
3. Review `src/data/recommendations.json` (hidden recommendations are skipped), then commit it. Keep the CSV out of the repo.

The import **overwrites** the JSON file, so re-apply any manual edits afterwards. You can also edit the JSON by hand: each entry is `{ "quote", "author", "context" }`.

*Optional:* set `RECOMMENDATIONS_SOURCE_URL` (and `RECOMMENDATIONS_SOURCE_TOKEN`) to a server-side feed that returns the same shape. If it is unset or fails, the JSON file is used.

## Resume

The "Download Resume" button opens a Google Drive link (`resumeDriveUrl` in `site.ts`). Keep the file **Restricted** in Drive so visitors use Drive's "Request access" flow. The link is visible in the page source, so access control must come from Drive.

## Project structure

```
src/
├── app/                  Routes, layout, SEO files (sitemap, robots, icons, OG image), API routes
│   ├── api/contact/
│   ├── api/recommendations/
│   ├── internships/
│   └── recommendations/
├── components/           Page sections and UI pieces
├── data/                 site.ts (all copy) and recommendations.json
└── lib/                  Email, validation, rate limiting, recommendations loader
scripts/
└── import-recommendations.mjs
```

## Deploying (Vercel)

1. Import the repo into [Vercel](https://vercel.com/).
2. Add the environment variables above (at least `NEXT_PUBLIC_SITE_URL` and the three Resend variables).
3. Use a `FROM_EMAIL` on a domain you've verified in [Resend](https://resend.com/).
4. Redeploy after changing any variable.
