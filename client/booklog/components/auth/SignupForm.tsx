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

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-full h-[60vh] max-w-sm px-2">
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
                <FormDescription>
                  This is your name.
                </FormDescription>
                <FormMessage />
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
                <FormDescription>
                  This is your email address.
                </FormDescription>
                <FormMessage />
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
                <FormDescription>
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-1/2 mx-auto" type="submit">Sign up</Button>
        </form>
      </Form>
      <span onClick={() => setIsLogin(true)}>Already have an account? Login</span>
    </Card>
  )
}

export default SignupForm