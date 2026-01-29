"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Book as BookType } from '@/types/book';
import { LuBookmark } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'react-toastify';
import { cn } from "@/lib/utils";
import { useLibrary } from '@/context/LibraryContext';


const BookCard = ({ book, index }: { book: BookType, index: number }) => {  

  const { addBookToLibrary, library, removeBookFromLibrary }:any = useLibrary();

  // Book'un library'de olup olmadığını kontrol et
  const isBookmarked = library?.some((item:any) => item._id === book._id) || false;
  
  const handleBookmark = async (id:string) => {
    try {
      if (isBookmarked) {
        const response = await removeBookFromLibrary(id);
        if (response) {
          toast.success(response.message);
        }
      } else {
        const response = await addBookToLibrary(id);
        if (response) {
          toast.success(response.message);
        }
      }
    } catch (error:any) {
      if(error.response?.status === 409) {
        toast.info("Book already exists in library");
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    }
  }

  return (
  <Card key={index} className="relative mx-auto w-full max-w-sm pt-0 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 ">
    <div className="absolute inset-0 z-30 aspect-video " />
    <img
      src={book.image}
      alt="Event cover"
      className="relative z-20 aspect-video w-full object-contain mt-1"
    />
    <CardHeader>
      <CardAction>
      <Tooltip>
      <TooltipTrigger asChild>
      <LuBookmark className={cn("w-6 h-6 cursor-pointer",
         isBookmarked ? "text-amber-500 fill-amber-500" : "text-black")} onClick={()=>handleBookmark(book._id)} />
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
       
      </CardAction>
      <CardTitle>{book.title}</CardTitle>
      <CardDescription className="flex flex-wrap min-h-[150px] ">
        {book.description.slice(0, 300)}...
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button className="w-1/2 mx-auto bg-miamivice hover:bg-miamivice/80 text-white">
      <Link href={`/books/${book._id}`}>View Book</Link></Button>
    </CardFooter>
  </Card>
  )
}

export default BookCard