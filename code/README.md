# GM MODE — Franchise Transactions & Payroll

Next.js 15 / React 19 offseason simulator, preserving the original GM MODE interface.

## Features
- Real 40-man MLB roster identities loaded via MLB Stats API (cached 6 hours).
- One-for-one sandbox trades, applied to the selected franchise's roster and recorded in Trade History.
- Simulation free-agent market: release roster players, or look up any real MLB player by numeric MLB player ID; offer one-year simulation contracts.
- User-entered annual salaries in millions and live payroll calculation reflecting roster moves and signings.
- Automatic browser localStorage persistence of the franchise roster, salaries, trade history, free-agent pool, and signing history.

## Important limits
- The MLB roster feed does not contain salaries, real-world free-agent eligibility, trade valuation, or contract terms. Salary figures are user-entered simulation scenarios, not verified actual MLB payroll.
- Free-agent membership is user-selected for the simulation, not a claim about actual MLB free agency.
- Trades are automatically executed in the sandbox, not negotiated by an AI GM and not actual MLB transactions. No contract restrictions or CBT logic.
- Data is saved **only in the same browser**, not to a server or across devices. Clearing browser storage removes the save.
- The real-world roster feed is a snapshot at the time a franchise is started; a saved franchise does not automatically overwrite its transactions when the source roster changes.

## Local setup
`npm install` then `npm run dev`. Test with `npm run lint` and `npm run build` before deploying to Vercel.

## Deployment
Upload the contents of this project directory to the GitHub repository root. Vercel will deploy on a connected production-branch push.
