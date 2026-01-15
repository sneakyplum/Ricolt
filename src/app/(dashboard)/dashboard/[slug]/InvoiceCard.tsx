import { getClientWithInvoice } from "@/app/actions/client-table.action";
import DeleteInvoice from "@/components/DeleteInvoice";
import EditInvoice from "@/components/EditInvoice";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type InvoiceCardProps = Awaited<ReturnType<typeof getClientWithInvoice>>;

interface InvoiceCardLabels {
  invoiceCard: InvoiceCardProps;
}

const InvoiceCard = ({ invoiceCard }: InvoiceCardLabels) => {

  
  return (
    <div>
      {invoiceCard?.invoices.map((invoice) => (
        <Card key={invoice.clientId}>
          <CardHeader>
            <CardTitle></CardTitle>
            
          <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <p>{invoice.amount}</p>
            <p>{invoice.dueDate.toDateString()}</p>
            <p>{invoice.isPaid ? "Paid" : "Unpaid"}</p>
          </CardContent>
          <CardFooter>
            <EditInvoice clientData={invoice} />
            <DeleteInvoice invoiceDelete={invoice} />
          </CardFooter>
        </Card>
      ))}

    </div>
  )
}

export default InvoiceCard