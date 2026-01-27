import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Review } from "@/types/review"
import moment from "moment"
import { Badge } from "@/components/ui/badge"

const Comments = ({ reviews }: { reviews: Review[] }) => {

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500"
    if (rating >= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    reviews?.length > 0 && reviews?.map((review) => (
      <div key={review.id}>
        <Card className="mx-auto w-full h-[150px] mb-4">
          <CardHeader>
            <CardTitle className="flex justify-between">
             <div>{review.user.name} - <Badge className={getRatingColor(review.rating)} rounded-xs> {review.rating}</Badge> </div> 
              <span className="text-xs text-gray-500 text-right">{moment(review.createdAt).format("DD/MM/YYYY")}</span>
            </CardTitle>
            <CardDescription className="text-xs">
              {review.review}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    ))
  )
}

export default Comments