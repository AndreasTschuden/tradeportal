"use client";

import { useState } from "react";
import { LongDescription } from "@/components/app/LongDescription";
import { Reviews } from "@/components/app/Reviews";

type DescriptionReviewsSwitchProps = {
	reviewCount: number;
	longDescription: string;
	reviews: ReviewType[];
	productId: string;
};

const DescriptionReviewsSwitch = ({
	reviewCount,
	longDescription,
	reviews,
	productId,
}: DescriptionReviewsSwitchProps) => {
	const [showReviews, setShowReviews] = useState(false);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-wrap gap-4 sm:gap-10">
				<button
					type="button"
					className={`text-2xl font-bold sm:text-3xl ${
						!showReviews ? "underline text-black" : "text-gray-500"
					}`}
					onClick={() => setShowReviews(false)}
				>
					Description
				</button>
				<button
					type="button"
					className={`text-2xl font-bold sm:text-3xl ${
						showReviews ? "underline text-black" : "text-gray-500"
					}`}
					onClick={() => setShowReviews(true)}
				>
					Reviews ({reviewCount})
				</button>
			</div>

			{!showReviews && <LongDescription longDescription={longDescription} />}

			{showReviews && <Reviews reviews={reviews} productId={productId} />}
		</div>
	);
};

export { DescriptionReviewsSwitch };
