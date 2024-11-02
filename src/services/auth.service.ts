import { baseApi } from "@/services/baseApi"
import type { CustomError } from "@/types.type"

// Define types for response and request
type LoginResponse = { token: string }
type LoginRequest = { username: string; password: string }

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data
      }),
      transformErrorResponse: (response: {
        data: CustomError
        status: number
      }) => response
    })
  })
})

export const { useLoginMutation } = authService
