"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { createReview } from "@/app/actions/reviews";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ReviewFormType = z.infer<typeof reviewSchema>;

type ReviewsProps = {
  reviews: ReviewType[];
  productId: string;
};

const Reviews = ({ reviews, productId }: ReviewsProps) => {
  const [hover, setHover] = useState(0);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const rating = watch("rating");

  async function onSubmit(data: ReviewFormType) {
    console.log(data);

    const json = {
      stars: data.rating,
      comment: data.description,
    };
    try {
      await createReview(productId, json);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log("Unbekannter Fehler", e);
      }
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-2xl p-5 shadow-sm bg-white space-y-4 max-w-xl"
      >
        <h3 className="font-medium text-lg">Write a Review</h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-2xl"
            >
              <span
                className={
                  (hover || rating) >= star
                    ? "text-orange-400"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500">{errors.rating.message}</p>
        )}

        {/* Textarea */}
        <textarea
          {...register("description")}
          placeholder="Share your experience..."
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black h-32 resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}

        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          Submit Review
        </button>
      </form>

      {/* List of Reviews */}
      {reviews.map((rev) => (
        <div
          className="border rounded-2xl p-5 shadow-sm bg-white space-y-2"
          key={rev.id}
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {rev.customers.name || "Anonymous"}
            </div>
            <div className="flex gap-1 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  fill={i <= rev.stars ? "orange" : "lightgray"}
                  stroke="0"
                  size={15}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-sm">{rev.comment}</p>
          <div className="text-xs text-gray-400 mt-1">
            {rev.created_at ? rev.created_at.toDateString() : ""}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Reviews };
