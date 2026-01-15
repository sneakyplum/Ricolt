"use client";

import { getClientById } from "@/app/actions/client-table.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditClient from "./EditClient";
import AddClient from "./CreateClient";
import DeleteClient from "./DeleteClient";
import { useRouter } from "next/navigation";
import AddInvoice from "./CreateInvoice";



type Clients = Awaited<ReturnType<typeof getClientById>>;

interface ClientLabels {
  client: Clients;
}



function ClientTable({ client }: ClientLabels) {

  const router = useRouter();


  const addNewClient = client;

  return (
    <div>
      <div>
        <AddClient />
        <AddInvoice clients={addNewClient} />

      </div>
      <div className="w-full max-w-4xl rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addNewClient.map((newClient) => {
              const clientUrl = `${newClient.id}`;
              const redirectClientUrl = `/dashboard/${clientUrl}`;

              return (
              <TableRow key={newClient.id} onClick={() => router.push(redirectClientUrl)}>
                <TableCell className="font-medium">{newClient.name}</TableCell>
                <TableCell>{newClient.email}</TableCell>
                <TableCell>{newClient._count.invoices}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-4" onClick={(e) => {e.stopPropagation()}}>
                    <EditClient clientData={newClient} />
                    <DeleteClient clientDelete={newClient} />
                    
                  </div>

                </TableCell>
              </TableRow>

              )
            })}
          </TableBody>
        </Table>
      </div>

    </div>
  )
};

export default ClientTable;
