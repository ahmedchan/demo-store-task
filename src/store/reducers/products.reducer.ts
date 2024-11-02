import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { ProductItem } from "@/types.type"
import { RootState } from "../store"

type initialStateProps = {
  isLoading: boolean
  isFetching: boolean 
  isError: boolean
}

export const productsAdapter = createEntityAdapter({
  selectId: (product: ProductItem) => product.id
})

const initialState = productsAdapter.getInitialState<initialStateProps>({
  isLoading: false,
  isFetching: false,
  isError: false
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: productsAdapter.setAll
  }
})

export const { setProducts } = productsSlice.actions

export const {
  selectAll: selectAllProducts,
  selectEntities: selectProductsEntities,
  selectById: selectProductById,
  selectIds: selectProductsIds,
  selectTotal: selectTotalProducts
} = productsAdapter.getSelectors<RootState>((state) => state.products)

export default productsSlice.reducer
