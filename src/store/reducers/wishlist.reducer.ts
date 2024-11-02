import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { ProductItem } from "@/types.type"
import { RootState } from "../store"

type WishlistState = {
  items: ProductItem[]
}

export const initialWishlistState: WishlistState = JSON.parse(
  localStorage.getItem("wishlist") || JSON.stringify({items: []})
)

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductItem>) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)
      if (!existingItem) {
        state.items.push(product)
        localStorage.setItem("wishlist", JSON.stringify(state)) // Persist updated state
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      localStorage.setItem("wishlist", JSON.stringify(state)) // Persist updated state
    }
  }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

// Selector to get all wishlist items
export const selectAllWishlistItems = (state: RootState) => state.wishlist.items

// Cached selector to check if a product is in the wishlist
export const selectIsProductInWishlist = (productId: number) =>
  createSelector([selectAllWishlistItems], (items) =>
    items.some((item) => item.id === productId)
  )

export default wishlistSlice.reducer
