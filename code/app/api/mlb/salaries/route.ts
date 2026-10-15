import {NextRequest,NextResponse} from 'next/server';
// 2027 scheduled guaranteed salary amounts in USD millions. Source: FanGraphs
// RosterResource Phillies payroll, as of October 2026. This is NOT full payroll.
const PHI_2027:Record<string,number>={
 'zackwheeler':42,'kyleschwarber':33,'treaturner':27.272727,
 'bryceharper':27.538462,'aaronnola':24.571429
};
const PHI_2026:Record<string,number>={
 'zackwheeler':42,'kyleschwarber':18,'treaturner':27.272727,
 'bryceharper':27.538462,'aaronnola':24.571429
};
export async function GET(req:NextRequest){
 const team=req.nextUrl.searchParams.get('team')||'';
 if(!/^[A-Z]{2,3}$/.test(team))return NextResponse.json({error:'Invalid team'},{status:400});
 const salaries=team==='PHI'?PHI_2027:{};
 return NextResponse.json({
  salaries,season:2027,verified:team==='PHI',
  source:team==='PHI'?'FanGraphs RosterResource: Phillies 2027 guaranteed contracts (selected players)':'No verified 2027 contract feed for this team — use salary overrides',
  sourceUrl:team==='PHI'?'https://www.fangraphs.com/roster-resource/payroll/phillies':null,
  coverage:'partial',
  reference2026:team==='PHI'?PHI_2026:undefined
 });
}
