"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Book } from '@/components/card/books';
import Comments from '@/components/comments/comments';
import axios from 'axios';
import BookList from '@/components/card/bookList';

const Home = () => {

  const router = useRouter();
  const [sortedBooks, setSortedBooks] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books/sorted`).then((res) => {
      setSortedBooks(res.data.books);
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
        <Book book={sortedBooks} />
      </div>

      {/* Comment Section */}

      <div className='container mx-auto min-h-[500px] w-full lg:w-3/4 mb-6 bg-zinc-50 flex flex-col items-center justify-center rounded-md shadow-xl shadow-gray-500 px-4 py-6'>

        <div className='flex items-center justify-center mb-4'>
          <h3 className='block text-center text-3xl font-bold italic text-[#121B28]'>Comments on Books</h3>
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center gap-4 w-full'>
          <div className='w-full lg:w-1/2'>
            <Book book={sortedBooks.slice(0, 1)} />
          </div>
       
          <div className='w-full lg:w-1/2'>
            {Array.from({ length: 2 }).map((_, index) => (
              <Comments key={index} />
            ))}
          </div>
        </div>

      </div>
    </div>

  )


}

export default Home