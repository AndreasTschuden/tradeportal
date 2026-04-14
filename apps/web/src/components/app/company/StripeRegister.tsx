"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { startOnboarding } from "@/actions/stripe";
import { Spinner } from "@/components/ui/spinner";
import { stripeSchema, type stripeType } from "@/lib/zod";

const StripeRegister = ({
	email,
	companyId,
}: {
	email: string;
	companyId: string;
}) => {
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<stripeType>({
		resolver: zodResolver(stripeSchema),
		defaultValues: {
			email: email,
			countryCode: "AT",
		},
	});

	const onSubmit = async (data: stripeType) => {
		try {
			setLoading(true);
			await startOnboarding(data.email, data.countryCode, companyId);
		} catch (e) {
			setLoading(false);
			if (e instanceof Error) {
				if (e.message === "NEXT_REDIRECT") {
					// Redirects are expected, so we can ignore this error
					return;
				}
				setError(e.message);
			} else {
				console.log(e);
			}
		}
		setLoading(false);
	};

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-2 gap-x-10 gap-y-4 w-[50vw]"
		>
			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1 flex gap-1 items-center">
					Email Address
				</label>
				<input
					{...register("email")}
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.email && "outline-red-500"
					}`}
				/>
				<span className="font-light text-sm text-[#635BFF] mt-1">
					You can choose a different email address
				</span>
				{errors.email && (
					<span className="text-red-500 text-sm mt-1">
						{errors.email.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1 flex gap-1 items-center">
					Country Code
				</label>
				<input
					{...register("countryCode")}
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.countryCode && "outline-red-500"
					}`}
				/>
				<span className="font-light text-sm text-[#635BFF] mt-1">
					Choose an apporpriate country code (e.g. AT, DE, US)
				</span>
				{errors.countryCode && (
					<span className="text-red-500 text-sm mt-1">
						{errors.countryCode.message}
					</span>
				)}
			</div>

			<div className="col-span-2 mt-4 flex gap-3 items-center">
				<button
					type="submit"
					className="bg-[#635BFF] font-light text-white px-10 py-2 rounded-xl flex gap-1"
				>
					{loading ? <Spinner /> : "Start Process"}
				</button>
			</div>

			{error && <div className="col-span-2 text-red-500 text-sm">{error}</div>}
		</form>
	);
};

export { StripeRegister };
