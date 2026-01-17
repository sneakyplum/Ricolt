
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-40">
      <div className="text-6xl font-bold text-black mb-4 text-center mt-10">
        <h1 >Welcome to Ricolt</h1>

      </div>
      <div className="text-2xl text-black mb-12 text-center">
        <h2>Lightweight software for freelancers tracking invoices</h2>
      </div>
      <div className="flex justify-center items-center gap-4 mb-8">
        <Link href="/sign-up"><Button className="cursor-pointer w-25 h-10 bg-blue-700">Sign Up</Button></Link>
        <Link href="/sign-in"><Button className="cursor-pointer w-25 h-10 bg-blue-700">Sign In</Button></Link>
      </div>
    </div>
  );
}
