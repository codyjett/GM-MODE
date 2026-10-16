import {NextRequest,NextResponse} from 'next/server';
import payroll from '../../../../lib/payroll2027.json';

type SalaryEntry={team:string;name:string;key:string;millions:number;status:'guaranteed'|'arbitration'|'option'|'optout'};
const entries=payroll as SalaryEntry[];
const aliases:Record<string,string>={CWS:'CHW',OAK:'ATH',KCR:'KC',SDP:'SD',SFG:'SF',TBR:'TB',WSN:'WSH'};
export async function GET(req:NextRequest){
 const requested=(req.nextUrl.searchParams.get('team')||'').toUpperCase();
 if(!/^[A-Z]{2,3}$/.test(requested))return NextResponse.json({error:'Invalid team'},{status:400});
 const team=aliases[requested]||requested;
 const teamRows=entries.filter(r=>r.team===team);
 const salaries:Record<string,number>={};
 const statuses:Record<string,string>={};
 for(const row of teamRows){salaries[row.key]=row.millions;statuses[row.key]=row.status;}
 const leagueSalaries:Record<string,number>={};
 const leagueStatuses:Record<string,string>={};
 for(const row of entries){leagueSalaries[row.key]=row.millions;leagueStatuses[row.key]=row.status;}
 return NextResponse.json({
  salaries,statuses,leagueSalaries,leagueStatuses,season:2027,
  verified:teamRows.length>0,records:teamRows.length,leagueRecords:entries.length,
  source:'FanGraphs RosterResource 2027 contract columns; Spotrac 2027 arbitration projections',
  sourceUrl:'https://www.fangraphs.com/roster-resource/breakdowns/payroll',
  arbitrationUrl:'https://www.spotrac.com/mlb/arbitration/year/_/year/2027',
  coverage:'partial-player-coverage-all-30-teams',
  salaryType:'2027 player-year amounts (USD millions); options and arbitration not guaranteed; not CBT AAV',
  lastReviewed:'2026-10-15'
 });
}
