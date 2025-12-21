"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Clients = () => {

  const router = useRouter();

  const signUserOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); 
        },
      },
    });
  }


  return (
    <main>
      <div className="w-full">
        <header className="h-20 w-full absolute bg-gray-200 flex">

          <div className="h-full w-full flex">
            <div className=" flex w-full h-full justify-start items-center gap-8 pl-10">
              <Button className="cursor-pointer"><Link href="/invoice">Invoices</Link></Button>
              <Button className="cursor-pointer"><Link href="/dashboard">Dashboard</Link></Button>
              <Button className="cursor-pointer"><Link href="/client">Clients</Link></Button>
            </div>
            <div className="justify-end items-center flex pr-10 h-full">
              <Button onClick={signUserOut} className="cursor-pointer bg-destructive">Log Out</Button>
            </div>
          </div>
        </header>
      </div>
    
      <div className="w-full h-full flex justify-center items-center flex-col">
        <h1 className="text-black text-4xl mt-40">Add your new client</h1>
        <form action={createClient} className="justify-center items-center w-3xs h-3xs mt-10 border-black p-7 rounded-lg border">
          <div>
            <Label htmlFor='name'>Client Name</Label>
            <br />
            <Input type="text" id="clientName" name='name' placeholder="Enter client's name" required/>
          </div>
          <br />
          <div>
            <Label htmlFor='email'>Email</Label>
            <br />
            <Input id="clientEmail" type='email' name='email' placeholder="Enter client email" />
          </div>
          <br />
          <div className="flex justify-center items-center">
            <Button type='submit' className="cursor-pointer">Create new client</Button>
          </div>
        </form>
      </div>
    </main>

  )
}

export default Clients