import axios from "axios";
import { useEffect, useState } from "react";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
      setBooks(response.data.books);
    } catch (error) {
      setLoading(false);  
      console.log(error);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return { books, loading };
};

export default useBooks;