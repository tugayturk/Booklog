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

const BookCard = ({ book, index }: { book: BookType, index: number }) => {
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