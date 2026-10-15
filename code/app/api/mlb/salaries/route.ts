import {NextRequest,NextResponse} from 'next/server';
// Published 2027 guaranteed annual salary (USD millions), not CBT AAV.
// Source: Phuture Phillies 2026-27 offseason payroll, October 5, 2026.
// Arbitration estimates and unsigned players intentionally excluded.
const CONTRACTS_2027:Record<string,Record<string,number>>={
 PHI:{
  zackwheeler:42,
  kyleschwarber:33,
  treaturner:27.272727,
  jesusluzardo:27,
  bryceharper:27.538462,
  aaronnola:24.571429,
  cristophersanchez:7,
  jtrealmuto:15,
  bradkeller:13
 }
};
export async function GET(req:NextRequest){
 const team=(req.nextUrl.searchParams.get('team')||'').toUpperCase();
 if(!/^[A-Z]{2,3}$/.test(team))return NextResponse.json({error:'Invalid team'},{status:400});
 const salaries=CONTRACTS_2027[team]||{};
 return NextResponse.json({
  salaries,season:2027,verified:Object.keys(salaries).length>0,
  source:Object.keys(salaries).length? 'Published 2027 guaranteed salaries (Phuture Phillies, Oct. 5, 2026)':'2027 guaranteed salaries not yet integrated for this franchise',
  sourceUrl:Object.keys(salaries).length?'https://phuturephillies.com/2026/10/05/2026-27-offseason-roster-and-payroll-information/':null,
  coverage:'partial',salaryType:'2027 guaranteed annual salary; not CBT AAV',
  lastReviewed:'2026-10-15'
 });
}
