# GM MODE — Player Performance Database v4

This version keeps the existing GM MODE interface, offseason, trades, free agency, farm system, season simulation, A–F grading and local save key (`gmmode-v2-save`).

## Player data

- **MLB roster**: official MLB Stats API, 40-man rosters, current team.
- **Performance**: new `/api/mlb/performance?team=PHI` returns 2026 MLB hitting/pitching statistics for a team.
- **GM Rating**: transparent **game-derived** score from actual 2026 OPS, batting average, home runs, plate appearances, ERA, WHIP, strikeouts and innings pitched. Not official ratings, scouting grades, WAR, or 2027 projections. Players without enough 2026 MLB playing time show `—` and `No 2026 MLB sample`.
- **Season simulation**: acquired/current roster player ratings influence the user's team strength, where data is available; the existing simplified fallback remains for unscored players and other franchises.
- **Salaries**: existing partial sourced 2027 Phillies contract reference retained. All 30 teams' verified 2027 player salaries are **not available** in this build. User-entered salaries and signed free-agent contracts continue to persist. No false claims of full league salary coverage.

## Install

Unzip and place the **contents** of `gm-mode` at the repository root. `npm install`, `npm run lint`, `npm run build` then deploy. No keys required.

## Important

MLB Stats API is an unofficially documented public endpoint; upstream shape/availability may change. Check data rights for commercial usage. LocalStorage saves are browser-specific, not server accounts. 2027 contract options/arbitration are unresolved. This project is a playable simulation, not a verified baseball projection service.

## October 2026 roster / salary consistency patch

- The game starts in the **2027 offseason**, not on the live 2026 MLB roster date. Players listed as **unconditional upcoming 2027 free agents** are therefore excluded from the initial saved roster and shown in Free Agency instead. Alec Bohm is included. Players with unresolved contract options remain on their teams until the option is resolved; the free-agent screen labels those options.
- Existing browser saves are migrated conservatively: unsigned upcoming free agents are removed from saved starting rosters, while completed simulation signings and recorded incoming trades are preserved. Browser localStorage key remains `gmmode-v2-save`.
- Guaranteed 2027 salaries for the Phillies are loaded from the October 5, 2026 published payroll breakdown; unknown or arbitration figures are not represented as guaranteed salaries. Annual salary is distinct from CBT AAV.
- Real-life offseason transactions after the dataset snapshot may change eligibility. The simulator uses an October 2026 snapshot, not a live official transaction ledger.
- Full production build not verified in this environment because npm registry access is unavailable.

Sources: https://www.mlb.com/news/mlb-free-agents-2026-2027 ; https://www.mlb.com/phillies/news/phillies-avoid-arbitration-2026 ; https://phuturephillies.com/2026/10/05/2026-27-offseason-roster-and-payroll-information/
