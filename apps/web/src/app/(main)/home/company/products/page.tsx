import React from 'react'
import { getProductsByCompany } from "@/actions/products"
import { ProductCard } from "@/components/app/company/ProductCard"
import Link from 'next/link'

const CompanyProductsPage = async () => {

    const products = await getProductsByCompany()

  return (
    <div>
       <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/company/products" className="text-red-700 font-bold">
          Company - Products
        </Link>
      </nav>
      <div>
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-3xl font-bold">Your Products</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p>
          </div>
          <div>
            Filter funktionen
          </div>
        </div>
        <div className='mt-10'>
          {products.map(prod => (
          <ProductCard product={prod} key={prod.id}/>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default CompanyProductsPage