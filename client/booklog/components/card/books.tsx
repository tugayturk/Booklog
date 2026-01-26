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
export function Book({ book }: { book: any }) {


  return (
    <div className="flex flex-wrap gap-4">
     {book.map((book: any, index: number) => (
       <Card key={index} className="relative mx-auto w-full max-w-sm pt-0">
       <div className="absolute inset-0 z-30 aspect-video " />
       <img
         src={book.image}
         alt="Event cover"
         className="relative z-20 aspect-video w-full object-contain "
       />
       <CardHeader>
         <CardAction>
         </CardAction>
         <CardTitle>{book.title}</CardTitle>
         <CardDescription>
           {book.description}
         </CardDescription>
       </CardHeader>
       <CardFooter>
         <Button className="w-1/2 mx-auto">
         <Link href={`/books/${book._id}`}>View Book</Link></Button>
       </CardFooter>
     </Card>
     ))}
    </div>
   
  )
}
