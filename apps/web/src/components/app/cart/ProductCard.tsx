import Image from "next/image";

const ProductCard = ({ prod }: { prod: cartItemsWithAvgStars }) => {

  const attrName =  prod.products.specifications.variants[prod.product_variant][prod.products.specifications.attributes[0].name];
  const imgName = prod.products.specifications.attributes[0].images[attrName];

  return (
    <div className="w-full mb-5 mt-5">
      <div className="flex gap-3">
        <div className="relative aspect-square h-40">
          <Image
            src={`https://minio.tschudea.de/images/products/${imgName}`}
            alt={prod.products.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="my-5">
          <p className="font-bold text-2xl">{prod.products.name}</p>
          <div className="mt-2">
            {prod.products.specifications.attributes.map(
              (attr: Record<string, string>) => (
                <p key={attr.name} className="text-gray-400 text-md font-light">
                  {attr.name}:{" "}
                  <strong className="text-black font-normal">
                    {
                      prod.products.specifications.variants[
                        prod.product_variant
                      ][attr.name]
                    }
                  </strong>
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
