"use client"
import { Book } from './books';
import useBooks from '@/hooks/useBooks';
import LoadingSpinner from '../LoadingSpinner/Loading';

const BookList = () => {
  const { books, loading } = useBooks();

  return (
    <div className='w-full'>
      {loading ? <LoadingSpinner /> : <Book book={books} />}
    </div>
  );
};

export default BookList;