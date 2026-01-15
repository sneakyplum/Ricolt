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
import { editClient } from "@/app/actions/client-table.action";


type EditClientProps = NonNullable<Awaited<ReturnType<typeof editClient>>>;

interface EditClientComponentProps {
  clientData: EditClientProps;
}


const EditClient = ({ clientData }: EditClientComponentProps ) => {

  const [formData, setFormData] = useState({
    name: clientData.name,
    email: clientData.email
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updateClient = await editClient(formData, clientData.id);
      console.log("New client created", updateClient)
      toast.success("Client successfully created")
    } catch (error) {
      console.error("Error updating client", error)
      toast.error("Failed to update client")
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
            Edit Client
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update Client</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the info below to update the client.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>

          <Label htmlFor="name">Name</Label>
          <Input 
            id="name"
            type="text"
            placeholder="Enter clients name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            placeholder="Enter clients email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Edit Client</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditClient