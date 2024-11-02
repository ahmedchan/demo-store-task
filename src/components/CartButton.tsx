import React, { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { addToCart, removeFromCart } from "@/store/reducers/cart.reucer"
import { ProductItem } from "@/types.type"
import { selectIsProductInCart } from "@/store/reducers/cart.reucer"
import { selectCurrenToken } from "@/store/reducers/auth.reducer"
// icons
import { ShoppingCart } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
  item: ProductItem
  quantity: number
  className?: string
}

const CartButton: React.FC<Props> = ({ item, quantity, className }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  // selectors
  const token = useAppSelector(selectCurrenToken)
  const isInCart = useAppSelector(selectIsProductInCart(item.id))

  const handleToggleItemCart = useCallback(() => {
    if (!token) {
      navigate("/auth/login", { replace: true, state: { from: location } })
      return
    }

    if (isInCart) {
      dispatch(removeFromCart(item.id))
    } else {
      dispatch(addToCart({ ...item, quantity }))
    }
  }, [token, isInCart, dispatch, navigate, item, quantity, location])

  return isInCart && token ? (
    <Button
      variant="destructive"
      className={className}
      onClick={handleToggleItemCart}
    >
      <ShoppingCart size={12} />
      Remove from Card
    </Button>
  ) : (
    <Button className={className} onClick={handleToggleItemCart}>
      <ShoppingCart size={12} />
      Add to Card
    </Button>
  )
}

export default CartButton
