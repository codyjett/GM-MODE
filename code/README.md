# GM MODE — Original UI + Real MLB Players

Preserves the original GM MODE dark navy/gold interface and navigation. Loads current MLB 40-man roster identities from the MLB Stats API. No fictional players are displayed. Trade proposals use real players but cannot be executed. Financials, WAR, OVR, free-agent eligibility and contracts show N/A or pending until verified.

## Run
`npm install` then `npm run dev`. Build: `npm run build`.

## Deploy
Upload the contents of this folder to the **root** of your GitHub repository and commit. Vercel will deploy the latest commit from the configured production branch. Verify `/api/mlb/roster?team=PHI` after deployment.

## Notes
The current roster endpoint is cached for 6 hours. It is not a historical offseason snapshot. MLB data rights should be checked before commercial use. Team selection is stored in localStorage; trades are previews only.
