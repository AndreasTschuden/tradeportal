"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Heart, ShoppingCart } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantOptionSchema, variantOptionType } from "@/lib/zod";

const ProductOptionForm = ({ product }: { product: detailedProductType }) => {
  const [cartCounter, setCartCounter] = useState<number>(1);
  const [toggleFavourite, setToggleFavourite] = useState<boolean>(false);
  const [variantAvailable, setVariantAvailable] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<variantOptionType>({
    resolver: zodResolver(variantOptionSchema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "options",
    },
  );

  const initialObj = product.specifications.attributes.reduce(
    (acc: Record<string, string>, attr: any) => {
      acc[attr.name] = attr.values[0];
      return acc;
    },
    {},
  );

  const [selectedAttributes, setSelectedAttributes] =
    useState<Record<string, string>>(initialObj);

  const handleSelectChange = (name: string, value: string) => {
    const newAttributes = {
      ...selectedAttributes,
      [name]: value,
    };

    setSelectedAttributes(newAttributes);

    const variant = product.specifications.variants.find(
      (v: any) =>
        Object.entries(newAttributes).every(([key, val]) => v[key] === val) &&
        v.available === true,
    );

    setVariantAvailable(!!variant);
  };

  const onSubmit = (data: any) => {
    console.log("Selected Attributes:", data);
  };

  return (
    <div className="flex flex-col gap-3 justify-between h-full mt-10 mb-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex flex-col gap-5">
          {product.specifications.attributes.map((attr: any, index: number) => (
            <div key={attr.name}>
              <div className="flex justify-between mb-1">
                <p>{attr.name}</p>

                <select
                  key={attr.name}
                  {...register(`options.${index}.value`, {
                    onChange: (e) =>
                      handleSelectChange(attr.name, e.target.value),
                  })}
                  defaultValue={attr.values[0]}
                >
                  {attr.values.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="border border-gray-300"></div>
            </div>
          ))}
          {!variantAvailable && (
            <div className="text-red-500">
              Diese Variante ist nicht mehr verfügbar
            </div>
          )}
          {errors.options && (
            <div className="text-red-500">
              {errors.options.message || "Please select valid options."}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl">
            {product.currency === "EUR" ? "€" : "$"} {product.base_price}
          </p>
          <div className="flex gap-7 h-15">
            <button
              className="w-full bg-red-700 rounded-xl text-white font-medium flex items-center justify-center gap-2"
              type="submit"
            >
              <ShoppingCart />
              <p>Add to cart</p>
            </button>
            <div className="flex w-2/4 justify-between items-center">
              <button
                type="button"
                className="bg-gray-200 h-full w-full rounded-l-xl text-3xl"
                onClick={() => setCartCounter((prev) => prev + 1)}
              >
                +
              </button>
              <p className="border-2 border-gray-200 h-full w-full flex items-center justify-center text-3xl">
                {cartCounter}
              </p>
              <button
                type="button"
                className="bg-gray-200 h-full w-full rounded-r-xl text-3xl"
                onClick={() =>
                  setCartCounter((prev) => (prev >= 2 ? prev - 1 : prev))
                }
              >
                -
              </button>
            </div>
            <button
              type="button"
              className="bg-gray-200 aspect-square rounded-xl flex justify-center items-center"
              onClick={() => setToggleFavourite((prev) => !prev)}
            >
              {toggleFavourite ? <Heart stroke="0" fill="red" /> : <Heart />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { ProductOptionForm };
