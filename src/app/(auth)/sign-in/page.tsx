"use client";


import { signIn } from "@/lib/auth-client";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";


const SignIn = () => {

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    const email = String(formData.get('email'));
    if (!email) return toast.error("Please enter your email");

    const password = String(formData.get('password'));
    if (!password) return toast.error("Please enter your password");


    await signIn.email(
      {
      email,
      password,
    }, {

      onRequest: () => {},
      onResponse: () => {},
      onError: (ctx) => {
        toast.error(ctx.error.message)
      },
      onSuccess: () => {
        router.push("/dashboard")
      }
    })
  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="justify-center items-center w-3xs h-3xs mt-50">
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
        <Button type='submit' className="cursor-pointer">Sign In</Button>
        <br />
        <p>Go to the <Link className="text-blue-600" href="/sign-up">sign up</Link> page.</p>
      </form>
    </div>
  )
}

export default SignIn