"use client"
import { getUserLibrary } from '@/lib/api';
import { useEffect, useState } from 'react'
import { Book as BookType } from '@/types/book';
import BookCard from '@/components/card/bookCard';
import LoadingSpinner from '@/components/LoadingSpinner/Loading';

const MyLibrary = () => {

  const [books, setBooks] = useState<BookType[]>([]);
  const userId = JSON.parse(localStorage.getItem("user") as string).id;
  const [isLoading, setIsLoading] = useState(true); 
  const getUserLibraryBooks = async () => {
    try {
      const response = await getUserLibrary(userId as string);
      setBooks(response.library);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserLibraryBooks();
  }, []);

  if(isLoading) {
      return <LoadingSpinner />
  }


  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
    {books.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold mb-2 font-serif italic">
          No books in your library
        </h2>
        <p className="text-gray-500">
          Add books to your library to get started
        </p>
      </div>
    ) : (
      <>
        <h1 className="text-2xl font-bold mb-6 font-serif italic">
          My Library
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {books.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} />
          ))}
        </div>
      </>
    )}
  </div>
  );
};

export default MyLibrary;