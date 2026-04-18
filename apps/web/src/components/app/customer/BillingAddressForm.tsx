"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateBillingAddress } from "@/actions/customer-account";
import { billingAddressSchema, type billingAddressType } from "@/lib/zod";

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
			city: information.city || "",
			postal_code: information.postal_code || "",
			region: information.region || "",
			country: information.country || "",
		},
	});

	const onSubmit = async (data: billingAddressType) => {
		try {
			await updateBillingAddress(data);
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
			className="grid w-full max-w-4xl grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2"
		>
			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1" htmlFor="city">
					City
				</label>
				<input
					id="city"
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
				<label className="text-sm text-gray-500 mb-1" htmlFor="postal_code">
					Postal Code
				</label>
				<input
					id="postal_code"
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
				<label className="text-sm text-gray-500 mb-1" htmlFor="region">
					Region
				</label>
				<input
					id="region"
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
				<label className="text-sm text-gray-500 mb-1" htmlFor="country">
					Country
				</label>
				<input
					id="country"
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

			<div className="col-span-1 mt-4 flex flex-wrap items-center gap-3 md:col-span-2">
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
				<div className="col-span-1 text-red-500 text-sm md:col-span-2">
					{error}
				</div>
			)}
		</form>
	);
};

export { BillingAddressForm };
