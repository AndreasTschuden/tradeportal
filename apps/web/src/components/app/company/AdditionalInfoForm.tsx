"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateAdditionalInformation } from "@/actions/company-account";
import { additionalInfoSchema, type additionalInfoType } from "@/lib/zod";

const AdditionalInfoForm = ({ Information }: { Information: Companyinfos }) => {
	const [confirm, setConfirm] = useState(false);
	const [error, setError] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(additionalInfoSchema),
		defaultValues: {
			website: Information.website || "",
			linked_in: Information.linkedin_url || "",
		},
	});

	const onSubmit = async (data: additionalInfoType) => {
		try {
			await updateAdditionalInformation(data);
			console.log(data);
			setConfirm(false);
			toast.success(
				"You have sucessfully updated your additional informations",
			);
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
				<label className="text-sm text-gray-500 mb-1" htmlFor="website">
					Website
				</label>
				<input
					id="website"
					{...register("website")}
					placeholder="Enter the companys website url"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.website && "outline-red-500"
					}`}
				/>
				{errors.website && (
					<span className="text-red-500 text-sm mt-1">
						{errors.website.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label
					className="text-sm text-gray-500 mb-1 flex gap-1 items-center"
					htmlFor="linked_in"
				>
					Linked In
				</label>

				<input
					id="linked_in"
					{...register("linked_in")}
					placeholder="Enter the companys linked in url"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.linked_in && "outline-red-500"
					}`}
				/>
				{errors.linked_in && (
					<span className="text-red-500 text-sm mt-1">
						{errors.linked_in.message}
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

export { AdditionalInfoForm };
