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
