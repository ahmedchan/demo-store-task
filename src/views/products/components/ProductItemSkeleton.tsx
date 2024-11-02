import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const ProductItemSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      <div className="h-[500px] w-full rounded-lg">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      <div className="px-6">
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-4 w-[20%] mt-2" />

        <Separator className="my-4" />

        <div className="flex gap-4 justify-between items-center mt-4">
          <Skeleton className="h-5 w-[25%]" />
          <div className="rating flex gap-1 items-center w-[30%]">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="mt-5">
          <Skeleton className="h-5 w-[80%] mt-3" />
          <Skeleton className="h-5 w-[70%] mt-3" />
          <Skeleton className="h-5 w-[60%] mt-3" />
        </div>

        <div className="mt-5 flex gap-4">
          <Skeleton className="h-5 w-[80%] mt-3" />
          <Skeleton className="h-5 w-[70%] mt-3" />
          <Skeleton className="h-5 w-[60%] mt-3" />
        </div>

        <div className="flex gap-2 pb-4 mt-8">
          <Skeleton className="h-12 w-[20%] " />
          <Skeleton className="h-12 w-[20%] " />
        </div>
      </div>
    </div>
  )
}

export default ProductItemSkeleton
