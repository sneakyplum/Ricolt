

import { Button } from "@/components/ui/button";
import Link from "next/link";

//import SignOutButton from "@/components/SignOutButton";


import ClientTable from "@/components/InventoryTable";
import { getClientById } from "@/app/actions/client-table.action";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

const Dashboard = async () => {


  const client = await getClientById();
    

  return (
    <main>
      <div className="w-full">

          <nav className="top-0 sticky h-20 w-full bg-gray-200 flex">
            <div className="h-full w-full flex">
              <div className=" flex w-full h-full justify-start items-center gap-8 pl-10">
                <Link href="/dashboard"><Button className="cursor-pointer">Dashboard</Button></Link>
              </div>
              <div className="justify-end items-center flex pr-10 h-full">
                <SignOutButton />
              </div>
            </div>

          </nav>
      </div>
      
      <div>
      <ClientTable client={client} />

      </div>

    </main>
  )
}

export default Dashboard