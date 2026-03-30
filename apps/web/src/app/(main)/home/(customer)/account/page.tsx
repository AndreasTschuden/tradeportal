import React from 'react'
import Link from 'next/link'

import { ChangePasswordForm } from "@/components/app/company/ChangePasswordForm"
import { getCustomerInformation } from "@/actions/customer-account"
import { BillingAddressForm } from "@/components/app/customer/BillingAddressForm"
import { PersonalInformationForm } from "@/components/app/customer/PersonalInformationForm"
import RemoveAccount from "@/components/app/company/RemoveAccount"

const page = async () => {

  const infos = await getCustomerInformation()


  return (
    <div>
        <nav className="flex my-2 mb-6 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/account" className="text-red-700 font-bold">
          Account
        </Link>
      </nav>
            <div className="flex flex-col gap-8">
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-3xl font-bold">Profile</h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr
            </p>
          </div>
        </div>
        <div className="w-full min-h-35 h-full border-2 border-gray-200 rounded-2xl flex justify-between px-20">
          <div className="flex gap-3 justify-center items-center">
            <div className="aspect-square bg-gray-100 h-20 rounded-full"></div>
            <div className="flex flex-col">
              <h3 className="font-bold text-md">USERNAME</h3>
              <p className="text-gray-400">Customer</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button className="ring-1 ring-black py-2 px-7 rounded-xl font-medium">
              Upload new Picture
            </button>
              <RemoveAccount/>
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Personal Information
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
           Update your personal information
          </p>
          <div className="mt-20 ml-12 mb-10">
            <PersonalInformationForm information={infos}/>
          </div>
        </div>

        <div className="relative w-full h-full border-2 border-gray-200 rounded-2xl flex justify-between">
          <span className="absolute -top-4 left-10 bg-white px-2 text-2xl font-medium">
            Billing Address
          </span>
          <p className="absolute top-4 left-12 text-md text-gray-400 font-light">
            Update your billing address
          </p>
          <div className="mt-20 ml-12 mb-10">
            <BillingAddressForm information={infos}/>
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
            <ChangePasswordForm/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page