"use client"
import { Book } from './books';
import useBooks from '@/hooks/useBooks';

const BookList = () => {
  const books = useBooks();


  return (
    <div>
      <Book book={books} />
    </div>
  );
};

export default BookList;