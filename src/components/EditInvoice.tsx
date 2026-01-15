"use client";


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
import { EditIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { editInvoice } from "@/app/actions/client-table.action";


type EditInvoiceProps = NonNullable<Awaited<ReturnType<typeof editInvoice>>>;

interface EditInvoiceComponentProps {
  clientData: EditInvoiceProps;
}


const EditableInvoice = ({ clientData }: EditInvoiceComponentProps ) => {
  const [formData, setFormData] = useState({
    amount: clientData.amount,
    dueDate: clientData.dueDate,
    isPaid: clientData.isPaid,
    clientId: clientData?.clientId,
  });

  const handleChange = (field: string, value: string | number | boolean | Date) => {
    setFormData({ ...formData, [field]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updateInvoice = await editInvoice({
        ...formData, 
        amount: Number(formData.amount),}, 
        clientData.id);

      console.log("New invoice created", updateInvoice)
      toast.success("Invoice successfully created")
    } catch (error) {
      console.error("Error updating invoice", error)
      toast.error("Failed to update invoice")
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center justify-center gap-2"
          asChild

        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Invoice
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Invoice</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the info below to update the invoice.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>

          <Label htmlFor="amount">Amount</Label>
          <Input 
            id="amount"
            type="number"
            placeholder="New amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", Number(e.target.value))}
          />

          <Label htmlFor="dueDate">Due Date</Label>
          <Input 
            id="dueDate"
            type="date"
            placeholder="Enter new due date"
            value={formData.dueDate.toISOString().split('T')[0]}
            onChange={(e) => handleChange("dueDate", new Date(e.target.value))}
          />

          <Label htmlFor="isPaid">Is Paid</Label>
          <select
            id="isPaid"
            value={formData.isPaid ? "true" : "false"}
            onChange={(e) => handleChange("isPaid", e.target.value === "true")}
          >
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Update Invoice</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditableInvoice