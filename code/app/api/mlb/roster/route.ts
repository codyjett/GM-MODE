import {NextRequest,NextResponse} from 'next/server';
import {teams} from '../../../../lib/data';
const ids:Record<string,number>={ARI:109,ATL:144,BAL:110,BOS:111,CHC:112,CWS:145,CIN:113,CLE:114,COL:115,DET:116,HOU:117,KC:118,LAA:108,LAD:119,MIA:146,MIL:158,MIN:142,NYM:121,NYY:147,ATH:133,PHI:143,PIT:134,SD:135,SF:137,SEA:136,STL:138,TB:139,TEX:140,TOR:141,WSH:120};
export async function GET(req:NextRequest){
 const code=req.nextUrl.searchParams.get('team')??'';
 if(!teams.some(t=>t[0]===code))return NextResponse.json({error:'Unknown team'},{status:400});
 try{
 const url=`https://statsapi.mlb.com/api/v1/teams/${ids[code]}/roster?rosterType=40Man`;
 const res=await fetch(url,{next:{revalidate:21600}});
 if(!res.ok)throw new Error(`MLB upstream ${res.status}`);
 const data=await res.json();
 const players=(data.roster??[]).map((r:{person:{id:number;fullName:string};position?:{abbreviation:string};status?:{description:string};jerseyNumber?:string})=>({id:r.person.id,name:r.person.fullName,position:r.position?.abbreviation??'—',status:r.status?.description??'Unknown',number:r.jerseyNumber??'—'}));
 return NextResponse.json({team:code,source:'MLB Stats API',rosterType:'40Man',retrievedAt:new Date().toISOString(),players});
 }catch{return NextResponse.json({error:'Unable to retrieve MLB roster right now. Demo simulator remains available.'},{status:502});}
}
