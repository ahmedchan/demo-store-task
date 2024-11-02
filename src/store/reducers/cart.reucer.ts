import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { ProductWithQuantity } from "@/types.type"
import { RootState } from "../store"

type CartState = {
  items: ProductWithQuantity[]
  totalItems: number
  totalPrice: number
}

// Load initial state from localStorage if it exists, otherwise use default
export const initialCardState: CartState = JSON.parse(
  localStorage.getItem("cart") ||
    JSON.stringify({
      items: [],
      totalItems: 0,
      totalPrice: 0
    })
)

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCardState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductWithQuantity>) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += existingItem.quantity
      } else {
        state.items.push(product)
        state.totalItems += 1
      }
      // Update totalItems and totalPrice
      state.totalPrice += product.price * product.quantity
      // persist localStorage
      localStorage.setItem("cart", JSON.stringify(state)) // Persist updated state
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      const existingProduct = state.items.find((item) => item.id === productId)

      if (existingProduct) {
        state.totalItems -= 1
        state.totalPrice -= existingProduct.price * existingProduct.quantity
        state.items = state.items.filter((item) => item.id !== productId)
        localStorage.setItem("cart", JSON.stringify(state)) // Persist updated state
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload
      const existingProduct = state.items.find((item) => item.id === productId)

      if (existingProduct) {
        state.totalPrice +=
          (quantity - existingProduct.quantity) * existingProduct.price
        existingProduct.quantity = quantity
        localStorage.setItem("cart", JSON.stringify(state)) // Persist updated state
      }
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export const selectAllCartItems = (state: RootState) => state.cart.items
export const selectTotalCartItems = (state: RootState) => state.cart.totalItems
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice

// Cached selector to check if a product is in the cart
export const selectIsProductInCart = (productId: number) =>
  createSelector(
    [selectAllCartItems],
    (items) => items.some((item) => item.id === productId)
  )

export default cartSlice.reducer
