import {NextRequest,NextResponse} from 'next/server';
export async function GET(req:NextRequest){
 const id=req.nextUrl.searchParams.get('id')||'';
 if(!/^\d{1,9}$/.test(id))return NextResponse.json({error:'Invalid MLB player ID'},{status:400});
 try{
  const res=await fetch(`https://statsapi.mlb.com/api/v1/people/${id}`,{next:{revalidate:86400}});
  if(!res.ok)throw new Error('MLB lookup failed');
  const data=await res.json();const person=data.people?.[0];
  if(!person?.id||!person?.fullName) return NextResponse.json({error:'No MLB player found for this ID'},{status:404});
  return NextResponse.json({id:String(person.id),name:person.fullName,position:person.primaryPosition?.abbreviation||'—'});
 }catch{return NextResponse.json({error:'MLB player lookup is temporarily unavailable'},{status:502})}
}
