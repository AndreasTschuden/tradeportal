"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { updateInformation } from "@/actions/company-account";
import { companySchema, CompanyForm } from "@/lib/zod";
import { toast } from "sonner"

const AdditionalInfoForm = ({ Information }: { Information: Companyinfos }) => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: Information.company_name,
      email: Information.email,
      phone: Information.phone_number,
      address: Information.address || "",
      head: Information.head_of_company || "",
      employees:
        Information.employee_count === null
          ? ""
          : String(Information.employee_count),
      founded: Information.founded_at
        ? Information.founded_at.toISOString().split("T")[0]
        : undefined,
    },
  });

  const onSubmit = async (data: CompanyForm) => {
    try {
      await updateInformation(data);
      console.log(data);
      setConfirm(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log(e);
      }
    }

    toast.success("You have sucessfully updated your basic informations")
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-10 gap-y-4 w-[50vw]"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Company Name</label>
        <input
          {...register("name")}
          placeholder="Enter your company name"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.name && "outline-red-500"
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1 flex gap-1 items-center">Email Address<strong className="text-red-700 text-xs">(not editable)</strong></label>
        <input
          {...register("email")}
          disabled
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.email && "outline-red-500"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Phone Number</label>
        <input
          {...register("phone")}
          placeholder="Enter your phone number"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
            errors.phone && "outline-red-500"
          }`}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm mt-1">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Address</label>
        <input
          {...register("address")}
          placeholder="Enter your address"
          className="bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Head of Company</label>
        <input
          {...register("head")}
          placeholder="Enter the head of the company"
          className="bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Employee Count</label>
        <input
          {...register("employees")}
          placeholder="Enter employee count"
          className="bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col col-span-1">
        <label className="text-sm text-gray-500 mb-1">Founded At</label>
        <input
          type="date"
          {...register("founded")}
          className="bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400"
        />
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

      {error && (
        <div className="col-span-2 text-red-500 text-sm">{error}</div>
      )}
    </form>
  );
};

export { AdditionalInfoForm };