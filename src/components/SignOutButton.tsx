"use client";

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const SignOutButton = () => {

  const router = useRouter();

  const signUserOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); 
        },
      },
    });
  }

  return (
    <div>
      <Button onClick={signUserOut} className="cursor-pointer bg-destructive">Log Out</Button>
    </div>
  )
}

export default SignOutButton