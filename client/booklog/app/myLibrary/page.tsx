"use client"
import { getUserLibrary } from '@/lib/api';
import { useEffect, useState } from 'react'
import { Book as BookType } from '@/types/book';
import BookCard from '@/components/card/bookCard';

const MyLibrary = () => {

  const [books, setBooks] = useState<BookType[]>([]);
  const userId = JSON.parse(localStorage.getItem("user") as string).id;

  const getUserLibraryBooks = async () => {
    try {
      const response = await getUserLibrary(userId as string);
      setBooks(response.library);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserLibraryBooks();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 font-serif italic">My Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {books.map((book, index) => (
          <BookCard key={book._id} book={book} index={index} />
        ))}
      </div>
    </div>
  )
}

export default MyLibrary