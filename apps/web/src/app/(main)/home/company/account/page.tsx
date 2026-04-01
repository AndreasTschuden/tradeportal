import Link from "next/link";
import { BasicInfoForm } from "@/components/app/company/BasicInfoForm";
import { CompanyProfileButtons } from "@/components/app/company/CompanyProfileButtons";
import { AdditionalInfoForm } from "@/components/app/company/AdditionalInfoForm";
import { getBasicInformation } from "@/actions/company-account";
import { ChangePasswordForm } from "@/components/app/company/ChangePasswordForm";
import RemoveAccount from "@/components/app/company/RemoveAccount";
import { signOutAction } from "@/actions/auth";
import { LogOut } from "lucide-react";

const page = async () => {
  const Information = await getBasicInformation();

  return (
    <div>
      <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/company/account" className="text-red-700 font-bold">
          Company - Account
        </Link>
      </nav>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-3xl font-bold">Company Profile</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p>
          </div>
          <CompanyProfileButtons />
        </div>
        <div className="w-full min-h-35 h-full border-2 border-gray-200 rounded-2xl flex justify-between px-20">
          <div className="flex gap-3 justify-center items-center">
            <div className="aspect-square bg-gray-100 h-20 rounded-full"></div>
            <div className="flex flex-col">
              <h3 className="font-bold text-md">{Information.company_name}</h3>
              <p className="text-gray-400">Company</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button className="ring-1 ring-black py-2 px-7 rounded-xl font-medium">
              Upload new Picture
            </button>

            <RemoveAccount />
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Basic Information
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            Update the companys basic information
          </p>
          <div className="mt-20 ml-12 mb-10">
            <BasicInfoForm Information={Information} />
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium flex gap-2 justify-center items-center">
            Verification
            <div className="bg-[#00800030] text-sm text-[#008000] justify-center items-center flex gap-2 px-3 py-0.5 rounded-full">
              <div className="bg-[#008000] rounded-full aspect-square h-3 font-light"></div>
              Verified
            </div>
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            The certificate was real and the company is now verified.
          </p>
          <div className="mt-20 ml-12 mb-10">
            <p className="text-gray-400">Approved by</p>
            <p className="">Andreas Tschuden</p>
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Additional Information
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            Add or Update Additional Information
          </p>
          <div className="mt-20 ml-12 mb-10">
            <AdditionalInfoForm Information={Information} />
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Change Password
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            Update your Password
          </p>
          <div className="mt-20 ml-12 mb-10">
            <ChangePasswordForm />
          </div>
        </div>
        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Logout
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            Logout of your account
          </p>
          <div className="mt-20 ml-12 mb-10">
            <form action={signOutAction}>
              <button
                type="submit"
                className="bg-[#FF000020] py-2 px-7 rounded-xl font-medium text-[#FF0000] flex gap-1"
              >
                <LogOut /> Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
