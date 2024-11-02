// ** React Imports
import { lazy } from "react"
// constants
import { LAYOUTS } from "@/constants"
// products list
const ProductsList = lazy(() => import("@/views/products/ProductsList"))
// categry products
const CategoryProducts = lazy(() => import("@/views/products/CategoryProduct"))
// detail
const ProductDetail = lazy(() => import("@/views/products/detail/ProductDetail"))
// cart
const Cart = lazy(() => import("@/views/cart/Cart"))
// wishlist
const Wishlist = lazy(() => import("@/views/wishlist/Wishlist"))

// list of all routes related to products store
const StoreRoutes = [
  {
    path: "/products",
    index: true,
    element: <ProductsList />,
    meta: {
      layout: LAYOUTS.MAIN,
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: "/categories/:categorySlug/products",
    element: <CategoryProducts />,
    meta: {
      layout: LAYOUTS.MAIN,
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
    meta: {
      layout: LAYOUTS.MAIN,
      publicRoute: true,
      restricted: false
    }
  },
  {
    path: "/cart",
    element: <Cart />,
    meta: {
      layout: LAYOUTS.MAIN,
      publicRoute: false,
      restricted: false
    }
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    meta: {
      layout: LAYOUTS.MAIN,
      publicRoute: false,
      restricted: false
    }
  }
]

export default StoreRoutes
