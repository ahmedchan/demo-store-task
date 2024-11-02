import { configureStore } from "@reduxjs/toolkit"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
// rootReducers
import rootReducer from "@/store/reducers/root.reducer"
import { baseApi } from "@/services/baseApi"

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
