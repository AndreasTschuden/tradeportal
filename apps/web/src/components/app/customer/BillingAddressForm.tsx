"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { updateBillingAddress } from "@/actions/customer-account";
import { billingAddressSchema, billingAddressType } from "@/lib/zod";
import { toast } from "sonner";

const BillingAddressForm = ({
  information,
}: {
  information: PersonalInformation;
}) => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<billingAddressType>({
    resolver: zodResolver(billingAddressSchema),
    defaultValues: {
     city : information.city || "",
     postal_code : information.postal_code || "",
     region : information.region || "",
     country : information.country || ""
    },
  });

  const onSubmit = async (data: billingAddressType) => {
    try {
      await updateBillingAddress(data)
      console.log(data);
      setConfirm(false);
      toast.success("You have sucessfully updated your personal informations");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-10 gap-y-4 w-[50vw]"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">City</label>
        <input
          {...register("city")}
          placeholder="Enter your city"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.city && "outline-red-500"
          }`}
        />
        {errors.city && (
          <span className="text-red-500 text-sm mt-1">
            {errors.city.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Postal Code</label>
        <input
          {...register("postal_code")}
          placeholder="Enter your postal code"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.postal_code && "outline-red-500"
          }`}
        />
        {errors.postal_code && (
          <span className="text-red-500 text-sm mt-1">
            {errors.postal_code.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Region</label>
        <input
          {...register("region")}
          placeholder="Enter your Region"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.region && "outline-red-500"
          }`}
        />
        {errors.region && (
          <span className="text-red-500 text-sm mt-1">
            {errors.region.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Country</label>
        <input
          {...register("country")}
          placeholder="Enter your country"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.country && "outline-red-500"
          }`}
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </span>
        )}
      </div>

      <div className="col-span-2 mt-4 flex gap-3 items-center">
        {!confirm && (
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="bg-red-700 font-light text-white px-10 py-2 rounded-xl flex gap-1"
          >
            <Save strokeWidth={1} /> Save
          </button>
        )}

        {confirm && (
          <>
            <button
              type="button"
              onClick={() => setConfirm(false)}
              className="bg-gray-400 font-light text-white px-6 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-700 font-light text-white px-10 py-2 rounded-xl flex gap-1"
            >
              <Save strokeWidth={1} /> Confirm save
            </button>
          </>
        )}
      </div>

      {error && <div className="col-span-2 text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export { BillingAddressForm };
