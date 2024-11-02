import { baseApi } from "@/services/baseApi"
import authSlice from "./auth.reducer"
import productsSlice from "./products.reducer"
import cartSlice from "./cart.reucer"
import wishlistSlice from "./wishlist.reducer"

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
  products: productsSlice,
  cart: cartSlice,
  wishlist: wishlistSlice
}

export default rootReducer
