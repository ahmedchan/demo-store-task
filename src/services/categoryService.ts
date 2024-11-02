import { baseApi } from "@/services/baseApi"
import type { CategoryItem } from "@/types.type"

// Define types for response and request
export type LoginError = {
  data: string
  originalStatus: number
  status: string
}

export const categoryService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], undefined>({
      query: () => "/products/categories",
      transformResponse: (res: CategoryItem[]) => res,
      transformErrorResponse: (res: { data: LoginError; status: number }) => res
    })
  })
})

export const { useGetAllCategoriesQuery } = categoryService
