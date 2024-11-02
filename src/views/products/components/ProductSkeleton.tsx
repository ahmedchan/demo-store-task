import { Skeleton } from "@/components/ui/skeleton"

const ProductSkeleton = () => (
  <div className="flex flex-col gap-3">
    <div className="aspect-h-1 p-2 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-100 lg:aspect-none group-hover:opacity-75 lg:h-32 relative">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-[25%]" />
      <Skeleton className="h-4 w-[50%]" />
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
    <div className="flex gap-2 pb-4">
      <Skeleton className="h-10 w-[47%] " />
      <Skeleton className="h-10 w-[47%] " />
    </div>
  </div>
)

export default ProductSkeleton
