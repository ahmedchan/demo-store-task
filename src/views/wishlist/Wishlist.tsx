import { selectAllWishlistItems } from "@/store/reducers/wishlist.reducer"
import { useAppSelector } from "@/store/store"
import ProductItem from "@/views/products/ProductItem"
import PageTitle from "@/components/PageTitle"

const Wishlist = () => {
  const wishlistItems = useAppSelector(selectAllWishlistItems)

  const renderContent = wishlistItems?.map((item) => <ProductItem key={item.id} item={item} />)

  return (
    <div className="container">
      <PageTitle title="Wishlist" />
      {wishlistItems.length === 0 ? (
        <div className="text-gray-500 italic">
          <small>No products found!</small>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {renderContent}
        </div>
      )}
    </div>
  )
}

export default Wishlist
