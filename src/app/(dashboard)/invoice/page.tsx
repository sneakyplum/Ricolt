
import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createInvoice } from "@/lib/actions";
import { auth } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";


const Invoices = async () => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error('Not logged in')
  }

  const client = await prisma.client.findMany({
    where: {
      userId: session.user.id
    }
  });


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
              <SignOutButton />
            </div>
          </div>
        </header>
      </div>
    
      <div className="w-full h-full flex justify-center items-center flex-col">
        <h1 className="text-black text-4xl mt-40">Add your new client</h1>
        <form action={createInvoice} className="justify-center items-center w-3xs h-3xs mt-10 border-black p-7 rounded-lg border">
          <div >
            <select name="clientId" id="clientId" className="w-full border border-gray-300 rounded-md p-2 cursor-pointer" >
              <option>--Clients--</option>
              {client.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <Label htmlFor='amount'>Amount Owed</Label>
            <br />
            <Input id="amount" type="number" name='amount' placeholder="Amount owed" required/>
          </div>
          <br />
          <div >
            <select name="isPaid" id="isPaid" className="w-full border border-gray-300 rounded-md p-2">
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
          </div>
          <br />
          <div>
            <Label htmlFor='dueDate'>Due Date</Label>
            <br />
            <Input id="dueDate" type='date' name='dueDate'  />
          </div>
          <br />
          <div className="flex justify-center items-center">
            <Button type='submit' className="cursor-pointer">Add Invoice</Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Invoices