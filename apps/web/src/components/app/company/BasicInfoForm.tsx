"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react"

const companySchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().optional(),
  head: z.string().optional(),
  employees: z.string().optional(),
  founded: z.string().optional(),
});

type CompanyForm = z.infer<typeof companySchema>;

const BasicInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyForm>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = (data: CompanyForm) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-10 gap-y-4 w-[50vw]"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Company Name</label>
        <input
          {...register("name")}
          placeholder="Enter your company name"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${errors.name && "outline-red-500"}`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Email Address</label>
        <input
          {...register("email")}
          placeholder="Enter your email address"
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${errors.email && "outline-red-500"}`}
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
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${errors.phone && "outline-red-500"}`}
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
          className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${errors.address && "outline-red-500"}`}
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
          {...register("founded")}
          placeholder="Enter founding date"
          className="bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400"
        />
      </div>

      <div className="col-span-2 mt-4">
        <button
          type="submit"
          className="bg-red-700 font-light text-white px-10 py-2 rounded-xl flex gap-1"
        >
          <Save strokeWidth={1} />Save
        </button>
      </div>
    </form>
  );
};

export { BasicInfoForm };