import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOutAction } from "@/actions/auth";
import { getBasicInformation } from "@/actions/company-account";
import { AdditionalInfoForm } from "@/components/app/company/AdditionalInfoForm";
import { BasicInfoForm } from "@/components/app/company/BasicInfoForm";
import { ChangePasswordForm } from "@/components/app/company/ChangePasswordForm";
import { CompanyProfileButtons } from "@/components/app/company/CompanyProfileButtons";
import RemoveAccount from "@/components/app/company/RemoveAccount";
import { StripeRegister } from "@/components/app/company/StripeRegister";

const page = async () => {
  const Information = await getBasicInformation();

  const stripe = !!Information.stripe_account_id;

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
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h2 className="text-3xl font-bold">Company Profile</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p>
          </div>
          <CompanyProfileButtons />
        </div>
        <div className="flex h-full min-h-35 w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-gray-200 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-20">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-center md:justify-start">
            <div className="aspect-square bg-gray-100 h-20 rounded-full"></div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="font-bold text-md">{Information.company_name}</h3>
              <p className="text-gray-400">Company</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-center">
            <button
              type="button"
              className="rounded-xl px-5 py-2 font-medium ring-1 ring-black sm:px-7"
            >
              Upload new Picture
            </button>

            <RemoveAccount />
          </div>
        </div>

        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            Basic Information
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            Update the companys basic information
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            <BasicInfoForm Information={Information} />
          </div>
        </div>

        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 flex items-center justify-center gap-2 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            Verification
            <div
              className={`flex items-center justify-center gap-2 rounded-full px-3 py-0.5 text-xs sm:text-sm ${
                Information.is_verified
                  ? "bg-[#00800030] text-[#008000]"
                  : "bg-[#FF000030] text-[#FF0000]"
              }`}
            >
              <div
                className={`rounded-full aspect-square h-3 font-light ${
                  Information.is_verified ? "bg-[#008000]" : "bg-[#FF0000]"
                }`}
              ></div>
              {Information.is_verified ? "Verified" : "Not Verified"}
            </div>
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            {Information.is_verified
              ? "The certificate was real and the company is now verified."
              : "Your company is not verified yet."}
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            <p className="text-gray-400">Approved by</p>
            <p className="">
              {Information.is_verified
                ? Information.approved_by || "Approver not found"
                : "-"}
            </p>
          </div>
        </div>

        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 flex items-center justify-center gap-2 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            <Image
              src="/stripe-logo.png"
              alt="Stripe"
              width={128}
              height={32}
              className="h-8 w-auto"
              priority
              unoptimized
            />
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            Link your Account with stripe
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            {stripe ? (
              <>
                <p className="text-[#635BFF] text-xl">
                  Your account is linked with Stripe.
                </p>
                <p className="text-gray-400">
                  Account ID:{" "}
                  <strong className="text-black">
                    {Information.stripe_account_id}
                  </strong>
                </p>
              </>
            ) : (
              <StripeRegister
                email={Information.email}
                companyId={Information.id}
              />
            )}
          </div>
        </div>

        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            Additional Information
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            Add or Update Additional Information
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            <AdditionalInfoForm Information={Information} />
          </div>
        </div>

        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            Change Password
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            Update your Password
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            <ChangePasswordForm />
          </div>
        </div>
        <div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
          <span className="absolute -top-4 left-4 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
            Logout
          </span>
          <p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
            Logout of your account
          </p>
          <div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex gap-1 rounded-xl bg-[#FF000020] px-5 py-2 font-medium text-[#FF0000] sm:px-7"
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
