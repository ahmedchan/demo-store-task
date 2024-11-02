export type CategoryItem = string

export type ProductItem = {
  id: number
  title: string
  price: number
  description: string
  category: CategoryItem
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type ProductWithQuantity = ProductItem & {
  quantity: number
}

export type CustomError = {
  data: string
  originalStatus: number
  status: string
}
