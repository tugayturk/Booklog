import React from 'react'
import { Card } from '../ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaArrowRight } from 'react-icons/fa'
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})
const SignupForm = ({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void }) => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, values);
      setIsLogin(true);
      toast.success("Kayıt başarılı");
    } catch (error) {
      console.log(error);
      toast.error( "Kayıt başarısız");
    }
  }

  return (
    <Card className="w-full h-[98%] max-w-sm px-2 bg-zinc-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription className='text-xs text-gray-500'>
                  This is your name.
                </FormDescription>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormDescription className='text-xs text-gray-500'>
                  This is your email address.
                </FormDescription>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription className='text-xs text-gray-500'>
                  This is your password.
                </FormDescription>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <Button className="w-1/2 mx-auto block items-center justify-center bg-miamivice text-white hover:bg-indigo-600 transition-all duration-300" type="submit">Sign up</Button>
        </form>
      </Form>
      <span className='text-xs text-blue-300 cursor-pointer hover:text-indigo-600
       transition-all duration-300 hover:text-sm flex flex-row items-center justify-center' onClick={() => setIsLogin(true)}>
        Already have an account? Login
         <FaArrowRight className='ml-2' /> 
        </span>
    </Card>
  )
}

export default SignupForm