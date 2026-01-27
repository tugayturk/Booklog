import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Review } from "@/types/review"
import moment from "moment"

const Comments = ({ reviews }: { reviews: Review[] }) => {

  return (
    reviews?.length > 0 && reviews?.map((review) => (
      <div key={review.id}>
        <Card className="mx-auto w-full h-[150px] mb-4">
          <CardHeader>
            <CardTitle className="flex justify-between">
              {review.user.name} /   {review.rating}
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