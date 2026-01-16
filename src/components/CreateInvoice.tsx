"use client";

import { createNewInvoice } from "@/app/actions/client-table.action"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { UserPen } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


type ClientWithInvoiceCount = {
  id: string;
  name: string;
  _count: {
    invoices: number;
  };
};

interface AddInvoiceProps {
  clients: ClientWithInvoiceCount[];
}

const AddInvoice = ({ clients }: AddInvoiceProps) => {

  
  const [ formData, setFormData ] = useState({
    amount: 0,
    dueDate: new Date(),
    isPaid: false,
    clientId: '',
  })

  console.log("all", formData);

  const handleChange = (field: string, value: string | number | boolean | Date) => {
    setFormData({...formData, [field]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNewInvoice(formData);
      console.log("New invoice created", formData)
      toast.success("Invoice successfully created")
    } catch (error) {
      console.error("Error creating invoice", error)
      toast.error("Failed to create invoice")
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2 mt-2"
          asChild

        >
          <span>
            <UserPen className="w-4 h-4" />
            Add Invoice
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new Invoice</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the info below to create a new invoice.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>

          
            
            <select value={formData.clientId} onChange={(e) => handleChange("clientId", e.target.value)}>
              <option>Select a client</option>
              {clients.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}
              </option>

              ))}
            </select>
          


            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => handleChange("amount", Number(e.target.value))}
            />

              
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate"
                type="date"
                placeholder="Enter due date"
                value={formData.dueDate.toISOString().split('T')[0]}
                onChange={(e) => handleChange("dueDate", new Date(e.target.value))}
              />

              <select
                value={formData.isPaid.toString()}
                onChange={(e) => handleChange("isPaid", e.target.value === "true")}
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Add Invoice</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddInvoice