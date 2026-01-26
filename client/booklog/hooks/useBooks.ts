import axios from "axios";
import { useEffect, useState } from "react";

const useBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`).then((res: any) => {
      setBooks(res.data.books);
    }).catch((err: any) => {
      console.log(err);
    });
  }, []);

  return books;
};

export default useBooks;