import React from 'react'
import { getAllProducts } from "@/actions/products"

const ProductsPage = async () => {

    await getAllProducts()
  return (
    <div>

    </div>
  )
}

export default ProductsPage