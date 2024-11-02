import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "@/services/productService"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
// icons
import { Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ProductItemSkeleton from "@/views/products/components/ProductItemSkeleton"
import CartButton from "@/components/CartButton"
import {
  selectAllCartItems,
  updateQuantity,
  selectIsProductInCart
} from "@/store/reducers/cart.reucer"
import { useAppDispatch, useAppSelector } from "@/store/store"
import WishlistButton from "@/components/WishlistButton"

const ProductDetail = () => {
  const dispatch = useAppDispatch()
  const { productId } = useParams()
  const cartItems = useAppSelector(selectAllCartItems)
  const isInCart = useAppSelector(selectIsProductInCart(parseInt(productId!)))
  // states
  const [qty, setQty] = useState(
    cartItems?.find((i) => i.id === parseInt(productId as string))?.quantity ||
      1
  )
  // api
  const { data, isLoading, isError } = useGetProductByIdQuery(
    { productId },
    { skip: !productId, refetchOnMountOrArgChange: true }
  )

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setQty(value)
    if (isInCart) {
      dispatch(
        updateQuantity({ productId: data?.id as number, quantity: value })
      )
    }
  }

  if (isLoading) {
    return <ProductItemSkeleton />
  }

  if (isError) {
    return <div>Error</div>
  }

  return data ? (
    <div className="container max-width mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* image */}
        <div className="max-h-[550px] border rounded">
          <img
            src={data?.image}
            alt={data?.title}
            className="h-full w-auto object-cover object-center lg:h-full lg:w-auto m-auto"
          />
        </div>

        {/* details */}
        <div className="px-6">
          <h4 className="font-semibold text-xl">{data?.title}</h4>
          <small>{data?.category}</small>

          <Separator className="my-4" />

          <div className="flex gap-4 justify-between items-center mt-4">
            <h4 className="font-bold text-2xl text-primary underline">
              ${data?.price}
            </h4>
            <div className="rating flex gap-1 items-center">
              <Star size={12} className="text-yellow-600" />{" "}
              <strong>{data?.rating?.rate}</strong> of total voting{" "}
              <span className="underline">{data?.rating?.count}</span>
            </div>
          </div>

          <div className="mt-4">{data?.description}</div>

          <div className="mt-5 flex flex-col md:flex-row gap-2 md:gap-4">
            <div className="flex-1">
              <Label>Product Size</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select size ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sizes</SelectLabel>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">X Large</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label>Product Color</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select color---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="bu">Blue</SelectItem>
                    <SelectItem value="ye">Yellow</SelectItem>
                    <SelectItem value="bl">Black</SelectItem>
                    <SelectItem value="br">Brown</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={qty}
                min={1}
                max={100}
                onChange={handleQtyChange}
              />
            </div>
          </div>

          <div className="mt-5 md:mt-8 flex gap-4">
            <CartButton item={data} quantity={qty} />
            <WishlistButton item={data} showText={true} variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default ProductDetail
