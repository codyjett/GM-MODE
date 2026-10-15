# GM MODE — Real Player Edition

Next.js 15 + TypeScript application with all 30 MLB franchises and real player names, positions, jersey numbers, and roster statuses from the MLB Stats API.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production run `npm run build && npm start`.

## Deploy to Vercel

Push the project directory to a GitHub repository, import it at https://vercel.com/new, choose Next.js, and deploy. No environment variables are needed for this build.

## Data and limitations

`/api/mlb/roster?team=PHI` fetches `https://statsapi.mlb.com/api/v1/teams/143/roster?rosterType=40Man`. Responses are cached for 6 hours. The source is a public, undocumented MLB API and may change. Check MLB data rights before commercial distribution.

The application uses **real player identities in the roster and trade proposal UI**. Trade proposals are non-executable drafts and are not validated or accepted. Free-agent eligibility, salaries, contract details, CBT calculations, player valuation and actual transaction execution are intentionally unavailable until independently verified sources and business rules are integrated. The app does not fabricate these values.

Saved team selection uses browser local storage. Trade proposals are in-memory and do not persist. No authentication or database is included.

## Validation

Run `npm run lint` (TypeScript check) and `npm run build` before deployment.
