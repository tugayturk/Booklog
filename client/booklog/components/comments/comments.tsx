import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Comments = () => {
  return (
    <div >
        <Card className="mx-auto w-full mb-4">
            <CardHeader>
              <CardTitle className="flex justify-between">Tugay Türk
                <span className="text-sm text-gray-500 text-right">1 day ago</span>
                </CardTitle> 
              <CardDescription className="text-sm">
               Amazing book!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The card component supports a size prop that can be set to
                &quot;sm&quot; for a more compact appearance.
              </p>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
    </div>
  )
}

export default Comments