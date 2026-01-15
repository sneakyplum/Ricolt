"use client";

import { createNewClient } from "@/app/actions/client-table.action"
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



const AddClient = () => {

  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
  })

  const handleChange = (field: string, value: string | number) => {
    setFormData({...formData, [field]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newClient = await createNewClient(formData);
      console.log("New client created", newClient)
      toast.success("Client successfully created")
    } catch (error) {
      console.error("Error creating client", error)
      toast.error("Failed to create client")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2 mt-40"
          asChild

        >
          <span>
            <UserPen className="w-4 h-4" />
            Add Client
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a new client</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the info below to create a new client.
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
            <AlertDialogAction type="submit">Add Client</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddClient