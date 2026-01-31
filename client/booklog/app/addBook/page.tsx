import { Metadata } from "next";
import AddBook from "./addBook";

export const metadata: Metadata = {
  title: 'Add Book',
  description: 'Add Book',
}

const AddBookPage = () => {
  return (
    <AddBook />   
  )
}

export default AddBookPage;