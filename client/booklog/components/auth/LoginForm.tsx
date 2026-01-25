"use client"
import {
  Card,
} from "@/components/ui/card"
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
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const LoginForm = ({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void }) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, values);
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  }


  return (
      <Card className="w-2/5 h-[49vh] px-2 border-none">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="w-1/2 mx-auto" type="submit">Login</Button>
          </form>
        </Form>

        <span onClick={() => setIsLogin(false)}>Sign up</span>
      </Card>
  )
}

export default LoginForm