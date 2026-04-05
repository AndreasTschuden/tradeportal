"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { startCheckoutSession } from "@/actions/stripe";

const shippingSchema = z.object({
  street: z.string().min(2, "Street is required"),
  postal: z.string().min(4, "Postal code is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

export type ShippingForm = z.infer<typeof shippingSchema>;

const ShippingForm = ({
  products,
  order_id,
}: {
  order_id: string;
  products: {
    product_name: string;
    sellerId: string;
    quantity: number;
    unit_amount: number;
  }[]
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const handleFormSubmit = async (data: ShippingForm) => {
    const fullAddress = `${data.street}, ${data.postal} ${data.city}, ${data.country}`;
    console.log(fullAddress);

    try {
      await startCheckoutSession(fullAddress, order_id, products);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        console.error(e);
      }
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-red-700 focus:bg-white";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Street Address</label>
        <input
          {...register("street")}
          placeholder="Enter street address"
          className={`${inputClass} ${errors.street ? "border-red-500" : ""}`}
          autoComplete="street-address"
        />
        {errors.street && (
          <span className="text-red-500 text-sm mt-1">
            {errors.street.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Postal Code</label>
          <input
            {...register("postal")}
            placeholder="Enter ZIP code"
            className={`${inputClass} ${errors.postal ? "border-red-500" : ""}`}
            autoComplete="postal-code"
          />
          {errors.postal && (
            <span className="text-red-500 text-sm mt-1">
              {errors.postal.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">City</label>
          <input
            {...register("city")}
            placeholder="Enter city"
            className={`${inputClass} ${errors.city ? "border-red-500" : ""}`}
            autoComplete="address-level2"
          />
          {errors.city && (
            <span className="text-red-500 text-sm mt-1">
              {errors.city.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Country</label>
        <input
          {...register("country")}
          placeholder="Enter country"
          className={`${inputClass} ${errors.country ? "border-red-500" : ""}`}
          autoComplete="country-name"
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="inline-block border bg-red-700 text-white px-10 py-3 font-light rounded-sm"
      >
        Checkout
      </button>
    </form>
  );
};

export { ShippingForm };
