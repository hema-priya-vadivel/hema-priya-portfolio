# Hema Priya — Personal Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4. Single-page personal site: Home, About, Experience, Selected Work, Skills, AI × QA, Recommendations, Resume, Contact.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

### Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL, sitemap, Open Graph |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_LINKEDIN_URL` / `_GITHUB_URL` / `_TWITTER_URL` / `_LINKTREE_URL` | public | Optional overrides for the contact links (defaults live in `src/data/site.ts`) |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` | server | Contact form delivery via Resend (`FROM_EMAIL` must be a verified sender) |
| `RECOMMENDATIONS_SOURCE_URL`, `RECOMMENDATIONS_SOURCE_TOKEN` | server | Optional authorized recommendations feed |

### Content

- All copy lives in `src/data/site.ts`.
- The "Download Resume" buttons open the Google Drive link in `src/data/site.ts` (`resumeDriveUrl`; override with `NEXT_PUBLIC_RESUME_DRIVE_URL`). Keep the Drive file restricted so visitors use Drive's "Request access".

### Contact flow

Form → `POST /api/contact` → zod validation, honeypot + timing check, per-IP rate limit (in-memory; best-effort on serverless) → Resend → inbox. Returns 503 if the env vars are missing.

### Recommendations

Update from LinkedIn's data export:

1. LinkedIn → Settings → Data privacy → **Get a copy of your data** → select Recommendations → download when ready.
2. Run `npm run import:recommendations -- ~/Downloads/Recommendations_Received.csv`
3. Review `src/data/recommendations.json` (hidden recommendations are skipped) and commit it. Keep the CSV itself out of the repo.

Details:

`/api/recommendations` and the Recommendations section read an authorized source server-side. LinkedIn is never scraped; if no source is configured or it fails, a curated list is shown and labelled as such (never as a live feed).

## Checks

```bash
npx tsc --noEmit && npm run lint && npm run build
```
