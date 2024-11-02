import {Link} from "react-router-dom"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import type { ProductWithQuantity } from "@/types.type"
import classNames from "classnames"
import { Trash2, Plus, Minus } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { updateQuantity, removeFromCart } from "@/store/reducers/cart.reucer"
import { selectIsProductInWishlist } from "@/store/reducers/wishlist.reducer"
import WishlistButton from "@/components/WishlistButton"

const CartItem = ({
  item,
  index
}: {
  item: ProductWithQuantity
  index: number
}) => {
  const dispatch = useAppDispatch()
  // selectors
  const isInWishlist = useAppSelector(selectIsProductInWishlist(item.id))

  const updateProductQty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const actionType = (e.target as HTMLButtonElement).getAttribute(
      "data-action-type"
    )
    const updatedQty =
      actionType === "DECREASE" ? item.quantity - 1 : item.quantity + 1
    dispatch(updateQuantity({ productId: item.id, quantity: updatedQty }))
  }

  const handleRemoveFromCart = (id: number) => {
    if (!id) return
    dispatch(removeFromCart(id))
  }

  return (
    <div
      className={classNames("flex gap-4 py-2 items-center", {
        "border-t border-gray-200": index !== 0
      })}
    >
      <figure className="flex-none border card-img w-16 h-16 rounded overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-auto m-auto"
        />
      </figure>

      <div className="flex items-center flex-1 flex-grow-[2]">
        <h4>
          <Link className="hover:underline hover:opacity-60 duration-150 transition-colors" to={`/products/${item.id}`}>{item.title}</Link>
        </h4>
      </div>

      <div className="flex-1 flex justify-center">
        <h4 className="font-bold text-xl">{formatCurrency(item.price)}</h4>
      </div>

      <div className="flex-1 flex gap-1 items-center justify-center">
        <Button
          variant="outline"
          disabled={item.quantity === 1}
          data-action-type="DECREASE"
          onClick={updateProductQty}
        >
          <Minus />
        </Button>
        <h4 className="w-5 text-center font-semibold ">{item.quantity}</h4>
        <Button
          variant="outline"
          data-action-type="INCREASE"
          onClick={updateProductQty}
        >
          <Plus />
        </Button>
      </div>

      <div className="flex-1 flex justify-center">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <WishlistButton item={item} variant="secondary" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex-1 flex justify-end">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove from cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default CartItem
