
import { Book as BookType } from '@/types/book';
import BookCard from './bookCard';
export function Book({ book }: { book: BookType[] }) {


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {book.map((book: BookType, index: number) => (
        <BookCard key={index} book={book} index={index} />
      ))}
    </div>

  )
}
