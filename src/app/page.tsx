import DarkVeil from "@/components/LandingPageShad";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full h-screen relative bg-black flex justify-center items-center">
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <DarkVeil />
      </div>
      <div className="absolute flex justify-center items-center w-2xs gap-4">
        <h1 className="text-6xl font-bold text-white mb-4 text-center">Welcome to Ricolt</h1>
        <Button className="w-25 h-10 bg-blue-700"><Link href="/sign-up">Sign Up</Link></Button>
        <Button className="w-25 h-10 bg-blue-700"><Link href="/sign-in">Sign In</Link></Button>
      </div>
    </div>
  );
}
