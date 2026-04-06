"use client"

import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "@/actions/cart";
import { toast } from "sonner";

const ProductCard = ({prod} : { prod : productWithStatsType}) => {

    const router = useRouter();

    const handleAddToCart = async () => {
      try {
        await addToCart(prod.id, 0, 1);
        toast.success("Product added to cart!");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error adding to cart:", error.message);
          toast.error("Failed to add product to cart.");
        }
      }
    };
      
  return (

          <div key={prod.id} className="">
            <div className="relative group w-full aspect-square rounded-md overflow-hidden">
              <Image
                src={`https://minio.tschudea.de/images/products/${Object.values(prod.specifications.attributes[0].images)[0]}`}
                fill
                alt={prod.name}
                className="w-full h-full object-cover"
                onClick={() => router.push(`/home/products/product/${prod.id}`)}
              />
              <button
                className="absolute bottom-0 left-0 w-full h-13 bg-red-700 
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                rounded-b-md"
                onClick={handleAddToCart}
              >
                <p className="text-white font-medium flex gap-3">
                  <ShoppingCart />
                  Add to Cart
                </p>
              </button>
            </div>
            <h2 className="font-bold mt-1">{prod.name}</h2>
            <p className="text-red-700 font-bold">
              {prod.currency === "EUR" ? "€" : "$"} {prod.base_price}
            </p>
            {prod._count.reviews !== 0 ? (
              <p className="flex gap-1 items-center">
                {[1, 2, 3, 4, 5].map(
                  (i) =>
                    prod.avgStars && (
                      <Star
                        key={i}
                        fill={i <= prod.avgStars ? "orange" : "lightgray"}
                        stroke="0"
                        size={15}
                      />
                    ),
                )}
                <span className="text-gray-500 text-sm">({prod._count.reviews})</span>
              </p>
            ) : (
              <span className="text-gray-500 text-sm">No Reviews yet</span>
            )}
          </div>  
  )
}

export { ProductCard }