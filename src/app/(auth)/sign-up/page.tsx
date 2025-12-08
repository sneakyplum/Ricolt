"use client";

import { signUp } from "@/lib/auth-client";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";


const SignUp = () => {

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    const name = String(formData.get('name'));
    if (!name) return toast.error("Please enter your name");

    const email = String(formData.get('email'));
    if (!email) return toast.error("Please enter your email");

    const password = String(formData.get('password'));
    if (!password) return toast.error("Please enter your password");

    const username = String(formData.get('username'));
    if (!username) return toast.error("Please enter your username");

    await signUp.email(
      {
      name,
      email,
      password,
    }, {

      onRequest: () => {},
      onResponse: () => {},
      onError: (ctx) => {
        toast.error(ctx.error.message)
      },
      onSuccess: () => {
        router.push("/sign-in")
      }
    })
  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="justify-center items-center w-3xs h-3xs mt-50">
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input id="name" name='name' />
        </div>
        <br />
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input id="email" type='email' name='email' />
        </div>
        <br />
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input id="password" type="password" name='password' />
        </div>
        <br />
        <Button type='submit' className="cursor-pointer">Sign Up</Button>
        <br />
        <p>Go to the <Link href="/sign-in" className="text-blue-600">Sign In</Link> page.</p>
      </form>
    </div>
  )
}

export default SignUp