# GM MODE — Sprint 1

A working, dark-themed MLB general manager **demonstration simulator** built with Next.js App Router, React, TypeScript and Lucide icons.

## What works

- Landing page with original GM MODE styling
- Selection of all 30 MLB franchises
- Team-specific demo rosters (26 fictional players per team)
- Dashboard with payroll, ownership budget, projected wins and transaction activity
- Roster table with search and position filtering
- Trade center with one-for-one offers, deterministic acceptance/rejection, and roster/payroll updates
- Free agency contract offer modal with accept/reject decisions and payroll updates
- Finances page with spending breakdown
- Automatic save/resume using browser `localStorage` and a reset option
- Responsive desktop/mobile layout

**Important:** All player names, performance ratings, WAR projections, contracts, financial values, and trade outcomes are fictional demo values. No live MLB feeds or real contracts are included. This is not a production MLB valuation engine.

## Requirements

- Node.js 20.9+ (Node 22 recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run lint
npm run build
npm start
```

## Deploy to Vercel

1. Create a GitHub repository and push the contents of this folder (the project files must be at the repository root).
2. Go to https://vercel.com/new and import the repository.
3. Select the **Next.js** framework preset, leave the build command as `next build`, and click **Deploy**.
4. No environment variables are needed for Sprint 1.
5. New pushes to the linked branch trigger new deployments.

Alternatively, from the project directory with the Vercel CLI installed:

```bash
npm install
npx vercel
npx vercel --prod
```

## Project layout

```
app/
  layout.tsx           Site metadata and global styles
  globals.css          Responsive design system
  page.tsx             Public landing page
  gm/page.tsx          Simulator route
components/
  GMApp.tsx            Interactive simulator UI and demo logic
lib/
  data.ts              Team list, fictional data generators and types
```

## Important limitations / next sprint

- `localStorage` is device/browser-specific; it is not cloud saving or authentication.
- Trade evaluation is a **single-player-for-single-player demo heuristic**, not MLB transaction or roster-rule compliance.
- Free agency uses a simple salary/term threshold and has no competing bids, 40-man constraints, waivers or player preferences.
- Payroll is a simple sum of annual salary, **not CBT payroll**. The budget is a fictional owner limit, not an MLB salary cap.
- Demo rosters are synthetic; real roster, contract and projection feeds require validation and data usage rights.
- All changes are local client state. Next sprint: Supabase Auth/Postgres, persistent simulations, versioned snapshots, robust rules and API-backed transactions.

## License and data

This project does not bundle MLB trademarks, logos, player photographs or licensed statistical datasets. Franchise names are used as identifiers for demonstration. Before commercial launch, review league/team branding and data licensing needs.
