import React from 'react'
import { NewArrivalList } from "@/components/app/NewArrivalList"
import { ProductsList } from "@/components/app/ProductsList"
import { getNewestProducts } from "@/app/actions/products"
import { getProducts } from "@/app/actions/products"

const HomePage = async () => {
  
    const newestProducts : newestProductsType[] = await getNewestProducts()
    const products : productWithStatsType[] = await getProducts();
 
  return (
    <div className='flex justify-between my-5 flex-col'>
   <div className="bg-gray-300 w-full aspect-video rounded-md">
    </div>

    <div className='mt-5'>
        <div className='flex items-center my-5 gap-5' id="explore-products-section">
            <div className='w-5 h-10 bg-red-700 rounded-md'>
            </div>
            <p className='text-red-700 font-bold xl:text-2xl text-md' >Product's</p>
        </div>
        <div className='xl:text-4xl text-xl font-bold mb-10'>
            Explore Products
        </div>
        <ProductsList products={products}/>
        <div className='flex items-center my-5 gap-5' id="new-arrival-section">
            <div className='w-5 h-10 bg-red-700 rounded-md'>
            </div>
            <p className='text-red-700 font-bold xl:text-2xl text-md'>Featured</p>
        </div>
        <div className='xl:text-4xl text-xl font-bold mb-10'>
            New Arrival
        </div>
        <NewArrivalList newestProducts={newestProducts}/>
    </div>
    </div>
  )
}

export default HomePage