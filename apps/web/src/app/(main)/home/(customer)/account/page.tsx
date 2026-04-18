import { LogOut } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/actions/auth";
import { getCustomerInformation } from "@/actions/customer-account";
import { ChangePasswordForm } from "@/components/app/company/ChangePasswordForm";
import RemoveAccount from "@/components/app/company/RemoveAccount";
import { BillingAddressForm } from "@/components/app/customer/BillingAddressForm";
import { PersonalInformationForm } from "@/components/app/customer/PersonalInformationForm";

const page = async () => {
	const infos = await getCustomerInformation();

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
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
					<div>
						<h2 className="text-3xl font-bold">Profile</h2>
						<p className="text-gray-400">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr
						</p>
					</div>
					<div className="mt-1 flex flex-wrap gap-3 md:mt-5">
						<Link
							href="/home/orders"
							className="rounded-xl px-5 py-2 font-medium text-red-700 ring-1 ring-red-700 sm:px-7"
						>
							View your Orders
						</Link>
					</div>
				</div>
				<div className="flex h-full min-h-35 w-full flex-col justify-between gap-4 rounded-2xl border-2 border-gray-200 px-4 py-4 sm:px-6 md:flex-row md:items-center md:px-10 lg:px-20">
					<div className="flex items-center justify-center gap-3">
						<div className="aspect-square bg-gray-100 h-20 rounded-full"></div>
						<div className="flex flex-col">
							<h3 className="font-bold text-md">{infos.name}</h3>
							<p className="text-gray-400">Customer</p>
						</div>
					</div>
					<div className="flex flex-wrap items-center justify-start gap-3 md:justify-center">
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
						Personal Information
					</span>
					<p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
						Update your personal information
					</p>
					<div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
						<PersonalInformationForm information={infos} />
					</div>
				</div>

				<div className="relative h-full w-full rounded-2xl border-2 border-gray-200">
					<span className="absolute -top-4 left-4 bg-white px-2 text-lg font-medium sm:left-10 sm:text-2xl">
						Billing Address
					</span>
					<p className="absolute top-5 left-4 pr-4 text-sm font-light text-gray-400 sm:left-12 sm:text-base">
						Update your billing addres
					</p>
					<div className="mb-6 mt-24 px-4 sm:mb-10 sm:mt-20 sm:px-12">
						<BillingAddressForm information={infos} />
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
