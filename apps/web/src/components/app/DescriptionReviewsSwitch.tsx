"use client";

import { Reviews } from "@/components/app/Reviews";
import { LongDescription } from "@/components/app/LongDescription";
import { useState } from "react";

const DescriptionReviewsSwitch = ({
  reviewCount,
  longDescription,
  reviews,
  productId,
}: {
  reviewCount: number;
  longDescription: string;
  reviews: ReviewType[];
  productId: string;
}) => {
  const [toggleView, setToggleView] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-10">
        <button
          className={`text-3xl font-bold ${!toggleView ? "underline text-black" : "text-gray-500"}`}
          onClick={() =>
            setToggleView((prev) => (prev === true ? false : false))
          }
        >
          Description
        </button>
        <button
          className={`text-3xl font-bold ${toggleView ? "underline text-black" : "text-gray-500"}`}
          onClick={() =>
            setToggleView((prev) => (prev === false ? true : true))
          }
        >
          Reviews ({reviewCount})
        </button>
      </div>
      <div className={`${!toggleView ? "block" : "hidden"}`}>
        <LongDescription longDescription={longDescription} />
      </div>

      <div className={`${toggleView ? "block" : "hidden"}`}>
        <Reviews reviews={reviews} productId={productId} />
      </div>
    </div>
  );
};

export { DescriptionReviewsSwitch };
