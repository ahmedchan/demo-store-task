import { useAppSelector } from "@/store/store"
import { formatCurrency } from "@/lib/utils"
import PageTitle from "@/components/PageTitle"
import { Button } from "@/components/ui/button"
import {
  selectAllCartItems,
  selectTotalCartItems,
  selectTotalPrice
} from "@/store/reducers/cart.reucer"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import CartItem from "./CartItem"

const Cart = () => {
  const cartItems = useAppSelector(selectAllCartItems)
  const totalItems = useAppSelector(selectTotalCartItems)
  const totalPrice = useAppSelector(selectTotalPrice)

  if (cartItems.length === 0) {
    return <div className="p-2 italic">No products in Cart.</div>
  }

  return (
    <div className="container max-width">
      <PageTitle title="Shoping Cart" />

      <Card>
        <CardHeader className="flex justify-between flex-row border-b border-gray-200">
          <CardTitle>Products</CardTitle>
          <CardDescription>
            <strong>{totalItems}</strong> <i>products</i>
          </CardDescription>
        </CardHeader>

        <CardContent className="py-4">
          <div className="flex flex-col ">
            {cartItems.map((item, index) => (
              <CartItem key={item.id} index={index} item={item} />
            ))}
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-200 pt-4 ">
          <div className="flex w-full gap-2 justify-end items-center">
            <h4 className="text-gray-500 font-normal">Total Price:</h4>
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl">
                {totalPrice ? formatCurrency(totalPrice) : 0}
              </h3>
              <Button>Checkout</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Cart
