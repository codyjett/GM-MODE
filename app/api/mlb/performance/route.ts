import {NextRequest,NextResponse} from 'next/server';
const ids:Record<string,number>={ARI:109,ATL:144,BAL:110,BOS:111,CHC:112,CWS:145,CIN:113,CLE:114,COL:115,DET:116,HOU:117,KC:118,LAA:108,LAD:119,MIA:146,MIL:158,MIN:142,NYM:121,NYY:147,ATH:133,PHI:143,PIT:134,SD:135,SF:137,SEA:136,STL:138,TB:139,TEX:140,TOR:141,WSH:120};
type Stat={player?:{id:number};stat?:Record<string,number|string>};
const number=(s:Record<string,number|string>,key:string)=>{const n=Number(s[key]);return Number.isFinite(n)?n:0};
function score(s:Record<string,number|string>,group:'hitting'|'pitching'){
 if(group==='hitting'){
  const pa=number(s,'plateAppearances'),ops=number(s,'ops'),avg=number(s,'avg'),hr=number(s,'homeRuns');
  if(pa<20)return null;
  return Math.max(35,Math.min(99,Math.round(55+(ops-.680)*90+(avg-.245)*40+Math.min(8,hr/5)+Math.min(6,pa/120))));
 }
 const ip=number(s,'inningsPitched'),era=number(s,'era'),whip=number(s,'whip'),so=number(s,'strikeOuts');
 if(ip<5)return null;
 return Math.max(35,Math.min(99,Math.round(74+(4.2-era)*4+(1.32-whip)*17+Math.min(8,so/35)+Math.min(4,ip/55))));
}
export async function GET(req:NextRequest){
 const team=(req.nextUrl.searchParams.get('team')||'').toUpperCase();
 if(!ids[team])return NextResponse.json({error:'Invalid team'},{status:400});
 const year=2026;
 try{
 const groups=['hitting','pitching'] as const;
 const payload=await Promise.all(groups.map(async group=>{
  const u=`https://statsapi.mlb.com/api/v1/stats?stats=season&group=${group}&season=${year}&teamId=${ids[team]}&sportIds=1&limit=150`;
  const r=await fetch(u,{next:{revalidate:86400}});if(!r.ok)throw new Error(`MLB ${r.status}`);return r.json();
 }));
 const players:Record<string,{rating:number;group:string;summary:string;season:number;source:string}>={};
 payload.forEach((data,i)=>{
  const group=groups[i];const splits:Stat[]=data.stats?.flatMap((x:{splits?:Stat[]})=>x.splits||[])||[];
  for(const row of splits){if(!row.player?.id||!row.stat)continue;
   const s=row.stat;const rating=score(s,group);if(rating===null)continue;
   const summary=group==='hitting'?`${number(s,'plateAppearances')} PA · ${s.avg??'—'} AVG · ${s.ops??'—'} OPS · ${number(s,'homeRuns')} HR`:`${s.inningsPitched??'—'} IP · ${s.era??'—'} ERA · ${s.whip??'—'} WHIP · ${number(s,'strikeOuts')} K`;
   const id=String(row.player.id);
   if(!players[id]||rating>players[id].rating)players[id]={rating,group,summary,season:year,source:'2026 MLB Stats API; GM MODE derived rating'};
  }
 });
 return NextResponse.json({team,season:year,players,source:'MLB Stats API',ratingMethod:'Game rating derived from 2026 season statistics; not an official MLB rating or WAR',coverage:Object.keys(players).length});
 }catch{return NextResponse.json({error:'Player statistics unavailable'},{status:502})}
}
