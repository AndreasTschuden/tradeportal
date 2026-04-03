"use client";

import Image from "next/image";
import { useState } from "react";
import { deleteCartItem } from "@/actions/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductCard = ({ prod }: { prod: cartItemsWithAvgStars }) => {
    const router = useRouter();
  const [currentQuantity, setCurrentQuantity] = useState(prod.quantity);

  const attrName =
    prod.products.specifications.variants[prod.product_variant][
      prod.products.specifications.attributes[0].name
    ];
  const imgName = prod.products.specifications.attributes[0].images[attrName];

  return (
    <div className="w-full py-3 grid grid-cols-[2fr_1fr_1fr_1fr_80px] items-center">
      {/* PRODUCT */}
      <div className="flex gap-6 items-center">
        <div className="relative w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={`https://minio.tschudea.de/images/products/${imgName}`}
            alt={prod.products.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-bold text-xl">{prod.products.name}</p>

          <div className="mt-2 space-y-1 text-sm text-gray-500">
            {prod.products.specifications.attributes.map(
              (attr: Record<string, string>) => (
                <p key={attr.name}>
                  {attr.name}:{" "}
                  <span className="text-black">
                    {
                      prod.products.specifications.variants[
                        prod.product_variant
                      ][attr.name]
                    }
                  </span>
                </p>
              ),
            )}
          </div>
        </div>
      </div>

      <p className="text-center  font-medium text-lg">
        {prod.products.currency === "EUR" ? "€" : "$"}{" "}
        {prod.products.base_price}
      </p>

      <div className="flex justify-center">
        <div className="flex items-center border rounded-md overflow-hidden">
          {/* MINUS */}
          <button
            className="px-3 py-1 text-lg border-r hover:bg-gray-100"
            onClick={() => setCurrentQuantity((prev) => Math.max(1, prev - 1))}
          >
            −
          </button>

          <input
            type="number"
            min={1}
            value={currentQuantity}
            onChange={(e) => {
              const val = e.target.value;

              if (val === "") {
                setCurrentQuantity(1);
                return;
              }

              const num = Number(val);

              if (!isNaN(num) && num >= 1) {
                setCurrentQuantity(num);
              }
            }}
            className="w-12 text-center outline-none"
          />

          <button
            className="px-3 py-1 text-lg border-l hover:bg-gray-100"
            onClick={() => setCurrentQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      <p className="text-center font-semibold text-lg">
        {prod.products.currency === "EUR" ? "€" : "$"}{" "}
        {currentQuantity * prod.products.base_price}
      </p>

      <div className="flex justify-center">
        <button
          className="border w-8 h-8 flex items-center justify-center text-red-500"
          onClick={async () => {
            try {
              await deleteCartItem({
                customerId: prod.customers_id,
                productId: prod.products_id,
                variant: prod.product_variant
              });
              toast.success("Item removed from cart!");
              router.refresh();
            } catch (error) {
              if (error instanceof Error) {
                console.error("Error removing item from cart:", error.message);
                toast.error("Failed to remove item from cart.");
                
              }
            }
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export { ProductCard };
