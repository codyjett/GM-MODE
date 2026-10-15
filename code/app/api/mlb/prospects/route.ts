import {NextRequest,NextResponse} from 'next/server';
import {teams} from '../../../../lib/data';
const ids:Record<string,number>={ARI:109,ATL:144,BAL:110,BOS:111,CHC:112,CWS:145,CIN:113,CLE:114,COL:115,DET:116,HOU:117,KC:118,LAA:108,LAD:119,MIA:146,MIL:158,MIN:142,NYM:121,NYY:147,ATH:133,PHI:143,PIT:134,SD:135,SF:137,SEA:136,STL:138,TB:139,TEX:140,TOR:141,WSH:120};
type MinorTeam={id:number;name:string;parentOrgId?:number;sport?:{id:number}};
type RosterPerson={person?:{id:number;fullName:string};position?:{abbreviation:string}};
export async function GET(req:NextRequest){
 const code=req.nextUrl.searchParams.get('team')||'';
 if(!teams.some(t=>t[0]===code)||!ids[code])return NextResponse.json({error:'Invalid MLB team'},{status:400});
 try{
  const minor=await fetch('https://statsapi.mlb.com/api/v1/teams?sportIds=11,12,13,14,15,16&season=2026',{next:{revalidate:86400}});
  if(!minor.ok)throw new Error('Minor league affiliation data unavailable');
  const data=await minor.json() as {teams?:MinorTeam[]};
  const affiliates=(data.teams||[]).filter(t=>t.parentOrgId===ids[code]).sort((a,b)=>(a.sport?.id||99)-(b.sport?.id||99)).slice(0,5);
  const batches=await Promise.all(affiliates.map(async team=>{
   const response=await fetch(`https://statsapi.mlb.com/api/v1/teams/${team.id}/roster?rosterType=active&season=2026`,{next:{revalidate:86400}});
   if(!response.ok)return [];
   const roster=await response.json() as {roster?:RosterPerson[]};
   return (roster.roster||[]).filter(p=>p.person?.id&&p.person.fullName).map(p=>({id:String(p.person!.id),name:p.person!.fullName,position:p.position?.abbreviation||'—',level:team.name,team:code,organization:code}));
  }));
  const players=Array.from(new Map(batches.flat().map(p=>[p.id,p])).values());
  return NextResponse.json({players,source:'2026 MLB-affiliated minor-league active rosters',affiliates:affiliates.length});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Prospects unavailable',players:[]},{status:502})}
}
