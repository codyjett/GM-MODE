# GM MODE — Full Single-Season Simulator

Next.js 15 + React 19. Original dark navy/gold design with a complete playable 2027 GM challenge.

## How to play
1. Choose any MLB team and load the MLB Stats API 40-man roster.
2. Make offseason one-for-one sandbox trades and sign players from the candidate market.
3. Open **Season simulator** and simulate the first 105 games to the trade deadline.
4. Make additional trades, then simulate the remaining 57 games.
5. Simulate the postseason: three division winners + three wild cards per league; Wild Card best-of-3, Division Series best-of-5, LCS and World Series best-of-7.
6. Receive an A/B/C/D/F report card with score breakdown.

**Save:** Franchise, salary overrides, completed trades, signings, phase, standings, postseason and grade persist in `localStorage` key `gmmode-v2-save`. Saves are per browser and origin, not cloud-synced. Refresh to resume.

**Simulation realism limitations:** This is a fully playable *gameplay prototype*, not a validated baseball prediction engine. Team strengths and player impact are deterministic estimates derived from identifiers and roster size with a small payroll modifier, not real projected WAR, Statcast, player skills, injuries, minor leagues or official contract valuations. The 162-game schedule is a simplified deterministic matchup rotation, not the actual MLB schedule; postseason uses the standard 12-team format. Trades are instant sandbox exchanges, without AI accept/reject/counteroffers or complete league-wide roster mutation. Free-agent list contains *candidates*, including pending options, not verified available players. Salary references are partial. Grade transaction components reward activity rather than measured trade surplus value. This should not be presented as realistic scouting/valuation.

## Build
`npm install && npm run lint && npm run build`

Deploy repository root to Vercel. MLB API routes require server-side access to the public MLB Stats API.
