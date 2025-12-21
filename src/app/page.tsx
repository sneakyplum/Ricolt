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
          <Link href="/sign-up"><Button className="cursor-pointer w-25 h-10 bg-gray-800 border-2 border-white">Sign Up</Button></Link>
          <Link href="/sign-in"><Button className="cursor-pointer w-25 h-10 bg-gray-800 border-2 border-white">Sign In</Button></Link>
      </div>
    </div>
  );
}
