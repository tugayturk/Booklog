import { LoaderIcon } from "lucide-react"
import { Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils"

export function Loading({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}   

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin" />
  </div>
  )
}

export default LoadingSpinner