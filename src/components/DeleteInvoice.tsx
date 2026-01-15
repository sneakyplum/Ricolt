"use client";

import { deleteInvoice } from "@/app/actions/client-table.action";
import { toast } from "react-hot-toast";
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
import { Trash2 } from "lucide-react"

interface DeleteInvoiceComponentProps {
  invoiceDelete: {
    id: string;
  }
}

const DeleteInvoice = ({ invoiceDelete }: DeleteInvoiceComponentProps) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const deletedInvoice = await deleteInvoice(invoiceDelete.id);
      console.log("Invoice deleted", deletedInvoice)
      toast.success("Invoice successfully deleted")
    } catch (error) {
      console.error("Error deleting invoice", error)
      toast.error("Failed to delete invoice")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="ml-auto font-bold flex items-center gap-2"
          asChild>

          <span>
            <Trash2 className="w-4 h-4" />
            Delete Client
          </span>
          </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this client?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteInvoice