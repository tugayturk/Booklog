"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { getBookDetails, createReview, searchBooks } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner/Loading';
import { Book as BookType, } from '@/types/book';
import { Review } from '@/types/review';
import {
  InputGroupTextarea,
} from "@/components/ui/input-group"
import BookCard from '@/components/card/bookCard';
import Comments from '@/components/comments/comments';
import {
  Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  review: z.string().min(5, {
    message: "PLease text a long comment",
  }),
  rating: z.number().lte(5, {
    message: "Select a Rating",
  }),
})

const BookDetails = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: "",
      rating: 2,
    },
  })

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const { booksId } = useParams();
  const [book, setBook] = useState<BookType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const response = await getBookDetails(booksId as string);
      setBook(response.book);
      setReviews(response.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchBooks = async (title: string) => {
    setLoading(true);
    try {
      const response = await searchBooks(title);
      setBook(response.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!booksId) return;

    if (title) {
      handleSearchBooks(title);
    }else{
      fetchBookDetails();
    }
  }, [booksId, title]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userString = window.localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) as { id: string } : null;
    const data = { ...values, user: user?.id };
    const response = await createReview(booksId as string, data);
    toast.success(response.message);
    form.reset();
    fetchBookDetails();
  }

  return (
    loading ? <LoadingSpinner /> :
      <div className='container mx-auto flex lg:flex-row flex-col mt-2'>
        <div className='w-full lg:w-2/5'>
          {book?.length > 0 && book.map((book: BookType, index: number) =>
            <BookCard key={index} book={book} index={index} />)}
        </div>

        <div className='w-full lg:w-3/5 flex flex-col'>

          <div className="w-full mb-2 mt-2 lg:mt-0">
            <Card className="py-4 px-4 border-none flex flex-col justify-center shadow-2xl bg-blue-300">

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                  <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                          <InputGroupTextarea
                            {...field}
                            id="block-start-textarea"
                            placeholder="Text a Your Review"
                            className="font-mono text-sm border-2 border-gray-200 w-full"
                          />
                        </FormControl>
                        <FormMessage className='text-xs text-red-500' />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="w-[30px]">
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Rating" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                Array.from({ length: 5 }, (_: any, i: number) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                                ))
                              }

                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className='text-xs text-red-500' />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button className="bg-miamivice ">Add Your Review</Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>

          <div>
            <Comments reviews={reviews} />
          </div>

        </div>

      </div>
  )
};

export default BookDetails;