import { baseApi } from "@/services/baseApi"
import type { ProductItem, CustomError } from "@/types.type"

export const productService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductItem[],
      { limit: number; sort: string }
    >({
      query: (params) => {
        const { limit, sort } = params
        let req = `/products?`
        req += limit ? `limit=${limit}&` : ""
        req += sort ? `sort=${sort}&` : ""
        return req
      },
      transformResponse: (res: ProductItem[]) => res,
      transformErrorResponse: (response: {
        data: CustomError
        status: number
      }) => response
    }),
    getProductsByCategory: builder.query<
      ProductItem[],
      { categoryName?: string; limit?: number; sort?: string }
    >({
      query: ({categoryName, limit, sort}) => {
        let req = `/products/category/${categoryName?.replace("-"," ")}?`
        req += limit ? `limit=${limit}&` : ""
        req += sort ? `sort=${sort}&` : ""
        return req
      },
      transformResponse: (res: ProductItem[]) => res,
      transformErrorResponse: (response: {
        data: CustomError
        status: number
      }) => response
    }),
    getProductById: builder.query<
      ProductItem,
      { productId: string | undefined }
    >({
      query: ({ productId }) => `/products/${productId}`,
      transformResponse: (res: ProductItem) => res
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery
} = productService
