"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Book } from '@/components/card/books';
import Comments from '@/components/comments/comments';
import axios from 'axios';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BookCard from '@/components/card/bookCard';
import { Review } from '@/types/review';
import { Book as BookType } from '@/types/book';
const Home = () => {

  const router = useRouter();
  const [sortedBooks, setSortedBooks] = useState([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books/sorted`).then((res) => {
      setSortedBooks(res.data.books);
      setReviews(res.data.reviews);
    }).catch((err: any) => {
      console.log(err);
    });
  }, []);


  return (
    <div className='w-full'>

      <section className=' h-[600px] relative flex flex-col items-center justify-center'>
        <div className='absolute inset-0 bg-[url(/library.jpeg)] bg-cover bg-center'></div>
        <h1 className='relative z-10 text-white text-4xl font-bold'>BookLog</h1>
        <h4 className='relative z-10 text-white text-lg italic'>Your quiet place to track, reflect, and remember books.</h4>
        <Button className='relative z-10 text-white bg-miamivice hover:bg-miamivice/80 text-sm font-bold py-2 px-4 rounded-md' asChild><Link href="/books">See All Books</Link></Button>
      </section>

      {/* Last Added Books Section */}

      <div className='container mx-auto min-h-[500px] mt-2 mb-8 px-4'>
        <h3 className='block text-center text-3xl mb-4 mt-4 font-bold italic text-[#121B28]'>Last Added Books</h3>
        <Book book={sortedBooks.slice(0, 3)} />
      </div>

      {/* Banner */}
      <div className="bg-[#121B28] h-32 mb-3 text-white flex flex-col items-center justify-center text-center font-serif text-xl italic ">
        <div className="mx-auto h-2/3 w-2/3">
          <p >
            <span className="text-blue-300">BookLog</span> , kitapların sadece okunmadığı,
            düşünülüp paylaşıldığı bir alan.
          </p>
          <br></br>
          <p>
            Okuduklarını kaydet, yorumlarını bırak
            ve başkalarının satır aralarına göz at.
          </p>
        </div>
      </div>
      {/* Comment Section */}

      <div className='container mx-auto min-h-[500px] w-full lg:w-3/4 mb-6 bg-zinc-50 flex flex-col items-center justify-center rounded-md shadow-xl shadow-gray-500 px-4 py-6'>

        <div className='flex items-center justify-center mb-4'>
          <h3 className='block text-center text-3xl font-bold italic text-[#121B28]'>Comments on Books</h3>
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center gap-4 w-full'>
          <div className='w-full lg:w-1/2'>
            {sortedBooks.slice(0, 1).map((book: BookType, index: number) =>
              <BookCard key={index} book={book} index={index} />)}
          </div>
          <div className='w-full lg:w-1/2'>
            {
              Array.from({ length: 3 }, (_: any, i: number) => (
                <Card className="mx-auto w-full h-[150px] mb-4">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      John Doe
                      <span className="text-xs text-gray-500 text-right">17/10/2024</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Dystopian novel Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;