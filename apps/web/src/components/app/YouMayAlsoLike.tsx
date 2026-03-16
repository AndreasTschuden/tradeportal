import { ProductCard } from "@/components/app/ProductCard";


const YouMayAlsoLike = ({products} : {products : productWithStatsType[]}) => {

  return (
    <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">You may also like</h2>
        <div className="grid xl:grid-cols-4 grid-cols-2 gap-4">
        {products.map((prod) => (
          <ProductCard prod={prod} key={prod.id}/>
        ))}
      </div>
    </div>
  )
}

export { YouMayAlsoLike }