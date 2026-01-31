"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputGroupTextarea } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import {createBook} from "@/lib/api"
import { toast } from 'react-toastify'

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Please text a long title",
  }),
  author: z.string().min(3, {
    message: "Please text a long author",
  }),
  description: z.string().min(10, {
    message: "Please text a long description",
  }),
  image: z.string().min(10, {
    message: "Please upload an image",
  }),
})

const AddBook = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: "data:image/jpeg;base64,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",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createBook(values)
      toast.success("Book added successfully")
      form.reset()
    } catch (error) {
      toast.error("Failed to add book")
    }
  }


  return (
    <div className="flex flex-col items-center justify-center p-4 w-full ">
      <div className="w-3/4 items-center justify-center flex flex-col rounded-xl p-2 shadow-2xl bg-blue-300">
      <h1 className="text-2xl font-bold mb-6 font-serif italic">Add Your Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <InputGroupTextarea
                    {...field}
                    id="block-start-textarea"
                    placeholder="Text a Your Author"
                    className="font-mono text-sm border-2 border-gray-200 w-full"
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <InputGroupTextarea
                    {...field}
                    id="block-start-textarea"
                    placeholder="Text a Your Name"
                    className="font-mono text-sm border-2 border-gray-200 w-full"
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <InputGroupTextarea
                    {...field}
                    id="block-start-textarea"
                    placeholder="Text a Your Description"
                    className="font-mono text-sm border-2 border-gray-200 w-full"
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <InputGroupTextarea
                    {...field}
                    id="block-start-textarea"
                    placeholder="Upload a Your Image"
                    className="font-mono text-sm border-2 border-gray-200 w-full max-h-[200px]"
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button className="bg-miamivice ">Add Your Book</Button>
          </div>
        </form>
      </Form>
    </div>
    </div>
  )
}

export default AddBook