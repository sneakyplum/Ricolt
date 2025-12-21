

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Dashboard = async () => {

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

  const invoice = await prisma.invoice.findMany({
    where: {
      userId: session.user.id
    }
  });
    

  return (
    <main>
      <div className="w-full">
        <header className="h-20 w-full absolute bg-gray-200 flex top-0">

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

      <div className="w-full h-full mt-50">
        <ul className=" flex w-full h-full text-black justify-center items-center">
          {client.map((client) => (
            <li key={client.id}>{client.name}, {client.email}</li>
          ))}
          
          {invoice.map((invoice) => (
            <li key={invoice.id}>{invoice.amount}, {invoice.isPaid ? "Paid" : "Unpaid"}, {invoice.dueDate.toLocaleDateString()}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Dashboard