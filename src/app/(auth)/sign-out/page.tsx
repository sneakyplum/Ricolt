"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";



const SignUserOutButton = () => {

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

export default SignUserOutButton