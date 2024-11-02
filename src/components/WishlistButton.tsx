import React, { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  addToWishlist,
  removeFromWishlist
} from "@/store/reducers/wishlist.reducer"
import { selectCurrenToken } from "@/store/reducers/auth.reducer"
import { ProductItem } from "@/types.type"
import { selectIsProductInWishlist } from "@/store/reducers/wishlist.reducer"
import { useLocation, useNavigate } from "react-router-dom"
// icons
import { Heart, HeartOff } from "lucide-react"

type Props = {
  item: ProductItem
  showText?: boolean
  className?: string
  variant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined
}

const WishlistButton: React.FC<Props> = ({
  item,
  className,
  showText = false,
  variant = "outline"
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  // selectors
  const token = useAppSelector(selectCurrenToken)
  const isInWishlist = useAppSelector(selectIsProductInWishlist(item.id))

  const handleToggleItemCart = useCallback(() => {
    if (!token) {
      navigate("/auth/login", { replace: true, state: { from: location } })
      return
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id))
    } else {
      dispatch(addToWishlist(item))
    }
  }, [dispatch, isInWishlist, location, item, navigate, token])

  return isInWishlist && token ? (
    <Button
      variant={variant}
      className={className}
      onClick={handleToggleItemCart}
    >
      <HeartOff size={12} className="text-red-700" />
      {showText ? "Remove from wishlist" : null}
    </Button>
  ) : (
    <Button
      className={className}
      variant={variant}
      onClick={handleToggleItemCart}
    >
      <Heart size={12} />
      {showText ? "Add to wishlist" : null}
    </Button>
  )
}

export default WishlistButton
