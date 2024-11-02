import React, { useState, useEffect, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { useGetProductsByCategoryQuery } from "@/services/productService"
import ProductItem from "@/views/products/ProductItem"
import ProductSkeleton from "@/views/products/components/ProductSkeleton"
import SearchProducts from "@/views/products/components/SearchProducts"
import { Spinner } from "@/components/ui/spinner"
import {
  selectAllProducts,
  setProducts
} from "@/store/reducers/products.reducer"
import { useAppDispatch, useAppSelector } from "@/store/store"
import LimitProducts from "@/views/products/components/LimitProducts"
import SortProducts from "@/views/products/components/SortProducts"
import debounce from "lodash.debounce"
import PageTitle from "@/components/PageTitle"
import { ArrowLeft } from "lucide-react"


const CategoryProduct = () => {
  const { categorySlug } = useParams()
  const dispatch = useAppDispatch()
  // selector
  const products = useAppSelector(selectAllProducts)
  // states
  const [searchTerm, setSearchTerm] = useState("")
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState("desc")
  // api
  const { data, isLoading, isFetching, isError } =
    useGetProductsByCategoryQuery(
      { categoryName: categorySlug, limit, sort },
      { skip: !categorySlug, refetchOnMountOrArgChange: true }
    )

  useEffect(() => {
    if (data && JSON.stringify(products) !== JSON.stringify(data)) {
      dispatch(setProducts(data))
    }
  }, [dispatch, data, products])

  const handleLimitChange = useCallback(
    debounce((newLimit: string) => {
      setLimit(parseInt(newLimit))
    }, 200),
    []
  )

  const onSortChange = useCallback(
    debounce((newSort: string) => {
      setSort(newSort)
    }, 200),
    []
  )

  const handleFilterProducts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderContent = useCallback((items: ProductItem[] | undefined) => {
    if (!items || items.length === 0)
      return (
        <div className="text-gray-500 italic">
          <small>No products found!</small>
        </div>
      )

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
        {items.map((item) => (
          <MemoizedProductItem key={item.id} item={item} />
        ))}
      </div>
    )
  }, [])

  return (
    <div className="relative w-full">
      <div className="flex gap-2 items-center">
        <Link
          to="/products"
          className="flex-none w-8 h-8 mb-4 bg-gray-100 hover:bg-gray-200 rounded-full flex justify-center items-center"
        >
          <ArrowLeft />
        </Link>
        <div className="flex-auto">
          <PageTitle title={`Products - ${categorySlug?.replace("-", " ")}`}>
            {isFetching && <Spinner size="small" />}
            <SearchProducts
              value={searchTerm}
              onSearch={handleFilterProducts}
              onClearSearch={() => setSearchTerm("")}
              disabled={isLoading}
            />
            <SortProducts
              value={sort}
              onSortChange={onSortChange}
              disabled={isLoading}
            />
            <LimitProducts
              value={limit.toString()}
              onLimitChange={handleLimitChange}
              disabled={isLoading}
            />
          </PageTitle>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-red-700">Could'nt load product's categories</div>
      ) : (
        <div className="flex flex-col gap-5">
          {renderContent(filteredProducts)}
        </div>
      )}
    </div>
  )
}

// Memoize ProductItem component to prevent unnecessary re-renders
const MemoizedProductItem = React.memo(ProductItem)

export default CategoryProduct
