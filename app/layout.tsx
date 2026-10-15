import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'GM MODE | Run the Front Office',description:'A baseball front office simulator. Sprint 1 uses demonstration data only.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
