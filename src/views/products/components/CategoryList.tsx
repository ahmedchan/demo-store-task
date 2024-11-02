import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { toDashCase } from "@/lib/utils"
// services
import { useGetAllCategoriesQuery } from "@/services/categoryService"
import type { CategoryItem, CustomError } from "@/types.type"

const CategorySkeleton = ({ count = 4 }: { count?: number }) =>
  [...Array(count).keys()].map((item) => (
    <Skeleton key={item} className="h-20 rounded-xl w-[100%]" />
  ))

const CategoryList = () => {
  // api
  const { data, isLoading, isError, error } =
    useGetAllCategoriesQuery(undefined)

  const renderContent = (items: CategoryItem[] | undefined) => {
    return items && items.length > 0 ? (
      <div className="grid  gap-4 grid-cols-2 lg:grid-cols-4 cursor-pointer">
        {items.map((item, index) => (
          <Link
            key={index}
            to={`/categories/${toDashCase(item)}/products`}
            className="hover:bg-gray-300 transition-colors duration-150 flex-1 p-6 bg-gray-200 border rounded-xl"
          >
            {item}
          </Link>
        ))}
      </div>
    ) : null
  }

  return (
    <nav className="flex flex-col gap-2 mb-6">
      {isLoading ? (
        <div className="flex gap-4 items-center">
          <CategorySkeleton />
        </div>
      ) : isError ? (
        <div className="text-red-700">
          {(error as CustomError)?.data || "Could'nt load product's categories"}
        </div>
      ) : (
        renderContent(data)
      )}
    </nav>
  )
}

export default CategoryList
