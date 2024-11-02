import { Link } from "react-router-dom"
import type { ProductItem } from "@/types.type"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent
} from "@/components/ui/card"
// utils
import { maxLength, toDashCase, formatCurrency } from "@/lib/utils"
import CartButton from "@/components/CartButton"
import WishlistButton from "@/components/WishlistButton"
// icons
import { Star } from "lucide-react"

const ProductItem = ({ item }: { item: ProductItem }) => {
  return (
    <Card key={item.id} className="group">
      <Link
        className="md:aspect-h-1 p-2 md:aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-100 lg:aspect-none group-hover:opacity-75 h-32 md:h-28 lg:h-36 relative block"
        to={`/products/${item.id}?cat=${toDashCase(item.category)}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="absolute top-0 left-0 bottom-0 right-0 h-full w-auto object-cover object-center lg:h-full lg:w-auto m-auto"
        />
      </Link>
      <CardHeader className="px-4">
        <div className="flex items-center justify-between md:justify-between sm:flex-row md:flex-col lg:flex-row">
          <CardDescription>{item.category}</CardDescription>
          <div className="flex gap-4 items-center">
            <h4 className="font-bold text-primary underline">
              {formatCurrency(item.price)}
            </h4>
            <div className="rating flex gap-1 items-center">
              <Star size={12} className="text-yellow-600" /> {item.rating?.rate}
            </div>
          </div>
        </div>

        <h4 className="font-semibold min-h-[60px] ">
          <Link
            to={`/products/${item.id}?cat=${toDashCase(item.category)}`}
            className="hover:opacity-60 transition-all duration-150"
          >
            {maxLength(item.title, 50)}
          </Link>
        </h4>
      </CardHeader>
      <CardContent className="px-4">
        {maxLength(item.description, 50)}
      </CardContent>
      <div className="flex gap-2 px-4 pb-3 flex-wrap">
        <CartButton className="flex-1" item={item} quantity={1} />
        <WishlistButton item={item} />
      </div>
    </Card>
  )
}

export default ProductItem
