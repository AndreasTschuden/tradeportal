"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updatePersonalInformation } from "@/actions/customer-account";
import {
	personalInformationSchema,
	type personalInformationType,
} from "@/lib/zod";

const PersonalInformationForm = ({
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
	} = useForm<personalInformationType>({
		resolver: zodResolver(personalInformationSchema),
		defaultValues: {
			firstname: information.name.split(" ")[0],
			lastname: information.name.split(" ")[1],
			email: information.email,
			gender: information.gender,
			phone: information.phone || "",
		},
	});

	const onSubmit = async (data: personalInformationType) => {
		try {
			await updatePersonalInformation(data);
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
			className="grid grid-cols-2 gap-x-10 gap-y-4 w-[50vw]"
		>
			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1">First Name</label>
				<input
					{...register("firstname")}
					placeholder="Enter your first name"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.firstname && "outline-red-500"
					}`}
				/>
				{errors.firstname && (
					<span className="text-red-500 text-sm mt-1">
						{errors.firstname.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1">Last Name</label>
				<input
					{...register("lastname")}
					placeholder="Enter your last name"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.lastname && "outline-red-500"
					}`}
				/>
				{errors.lastname && (
					<span className="text-red-500 text-sm mt-1">
						{errors.lastname.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1 flex gap-1 items-center">
					Email Address
					<strong className="text-red-700 text-xs">(not editable)</strong>
				</label>
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
				<label className="text-sm text-gray-500 mb-1">Gender</label>
				<input
					{...register("gender")}
					placeholder="Enter your gender"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.gender && "outline-red-500"
					}`}
				/>
				{errors.gender && (
					<span className="text-red-500 text-sm mt-1">
						{errors.gender.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1">Phone Number</label>
				<input
					{...register("phone", {
						setValueAs: (value) => (value === "" ? undefined : value),
					})}
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

export { PersonalInformationForm };
