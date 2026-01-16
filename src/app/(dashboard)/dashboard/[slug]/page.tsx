import { getClientWithInvoice } from "@/app/actions/client-table.action";
import InvoiceCard from "./InvoiceCard"
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const page = async (props: { params: Promise<{ slug: string }> }) => {

const { slug } = await props.params;


  const invoiceCard = await getClientWithInvoice(slug);
  console.log("invoiceCard", invoiceCard?.id);

  if (!invoiceCard) {
    return <div>Client not found</div>;
  }

  return (
    <main>
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
      <div>
        <InvoiceCard invoiceCard={invoiceCard} />
      </div>
    </main>
  )
}

export default page