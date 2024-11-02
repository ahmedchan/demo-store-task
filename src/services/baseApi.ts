import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import appConfig from "@/configs/appConfig"
import type { RootState } from "@/store/store"
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query"
import { logout } from "@/store/reducers/auth.reducer"

const baseQuery = fetchBaseQuery({
  baseUrl: appConfig.app.apiUrl,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const state = getState() as RootState
    const token = state.auth.accessToken
    // const currentLocale = state.layout.locale?.split("-")[0]

    if (token) {
      headers.set("Authorization", `Basic ${token}`)
    }

    headers.set("Accept", "application/json")
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    api.dispatch(logout())
    return result
  }

  return result
}

//* apiSlice
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  // cache , The default time is seconds , Default duration 60 second
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: 0, //30 * 60,
  tagTypes: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endpoints: () => ({} as { [key: string]: any })
})
