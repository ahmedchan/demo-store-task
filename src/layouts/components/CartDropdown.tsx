import { Fragment, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { formatCurrency } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  removeFromCart,
  selectAllCartItems,
  selectTotalCartItems
} from "@/store/reducers/cart.reucer"
// icons
import { ShoppingCart, X } from "lucide-react"
import { maxLength } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CartDropdown = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const total = useAppSelector(selectTotalCartItems)
  const cartItems = useAppSelector(selectAllCartItems)
  // if is in cart page disabled the cart dropdown for better ux
  const isCartDisabled = useMemo(
    () => location.pathname === "/cart",
    [location]
  )
  // states
  const [isOpen, setIsOpen] = useState(false)

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleGoToCart = () => {
    setIsOpen(false)
    navigate("/cart")
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger disabled={isCartDisabled} className="disabled:opacity-20">
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0 relative ">
          <ShoppingCart />
          {total > 0 && (
            <span className="w-5 h-5 text-sm flex justify-center items-center rounded-full bg-red-600 text-white absolute -top-1 -right-1 z-10">
              {total}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[380px] p-0">
        {cartItems.length > 0 ? (
          <Fragment>
            <div className="p-2 px-4 border-b border-gray-200">
              <h4 className="font-bold flex justify-between">
                <span>Products</span>
                <small>
                  {total} <span className="font-normal italic">products</span>
                </small>
              </h4>
            </div>

            <ScrollArea className="h-72 w-full">
              <div className="py-3 flex flex-col divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex gap-3 bg-white rounded-md p-1 px-4"
                  >
                    <figure className="card-img flex-none w-14 h-14 rounded overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute top-0 left-0 right-0 bottom-0 w-full h-auto m-auto"
                      />
                    </figure>
                    <div className="flex-auto">
                      <div className="">
                        <small>{maxLength(item.title, 55)}</small>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <strong>{formatCurrency(item.price)}</strong>
                        <span>
                          <small>
                            QTY: <strong>{item.quantity}</strong>
                          </small>
                        </span>
                      </div>
                    </div>
                    <div className="absolute hidden group-hover:flex top-0 right-0 h-full w-[50%] bg-gradient-to-l from-gray-200 justify-end items-center pr-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="my-2 mx-4 flex">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleGoToCart}
              >
                View Cart
              </Button>
            </div>
          </Fragment>
        ) : (
          <div className="p-4 text-sm text-gray-400">No porducts found!</div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default CartDropdown
