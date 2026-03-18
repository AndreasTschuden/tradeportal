"use client";

import { MapPinHouse } from "lucide-react";
import { useRouter } from "next/navigation";

const CompanyCard = ({
  id,
  company_name,
  address,
}: {
  id: string;
  company_name: string;
  address: string;
}) => {
  const router = useRouter();

  return (
    <div className="h-30 w-full rounded-2xl border-2 border-gray-300 p-5 flex items-center gap-3">
      <div className="rounded-full bg-gray-200 w-20 aspect-square"></div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">{company_name}</h2>
          <div className="flex items-center gap-2">
            <button
              className="border-2 border-black py-1 px-3 rounded-lg font-bold"
              onClick={() => router.push(`/companies/${id}`)}
            >
              View Company
            </button>
            <button className="border-2 border-red-700 py-1 px-6 rounded-lg font-bold text-red-700">
              View Our Products
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="text-gray-500 flex gap-1">
            <MapPinHouse />
            <p>Location: </p>
          </div>
          <p>{address ? address : "The company has no address stored"}</p>
        </div>
      </div>
    </div>
  );
};

export { CompanyCard };
