"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { changePasswordSchema, type changePasswordType } from "@/lib/zod";

const ChangePasswordForm = () => {
	const [confirm, setConfirm] = useState(false);
	const [error, setError] = useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<changePasswordType>({
		resolver: zodResolver(changePasswordSchema),
	});

	const onSubmit = async (formData: changePasswordType) => {
		try {
			const { data, error } = await authClient.changePassword({
				newPassword: formData.new_password,
				currentPassword: formData.current_password,
				revokeOtherSessions: true,
			});

			if (error) {
				setError(String(error));
			}

			console.log(data);
			setConfirm(false);
			toast.success("You have sucessfully updated your password");
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
			<div className="flex flex-col col-span-2">
				<label className="text-sm text-gray-500 mb-1">Current Password</label>
				<input
					type="password"
					{...register("current_password")}
					placeholder="Enter your current password"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.current_password && "outline-red-500"
					}`}
				/>
				{errors.current_password && (
					<span className="text-red-500 text-sm mt-1">
						{errors.current_password.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1">New Password</label>
				<input
					type="password"
					{...register("new_password")}
					placeholder="Enter the companys website url"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.new_password && "outline-red-500"
					}`}
				/>
				{errors.new_password && (
					<span className="text-red-500 text-sm mt-1">
						{errors.new_password.message}
					</span>
				)}
			</div>

			<div className="flex flex-col">
				<label className="text-sm text-gray-500 mb-1 flex gap-1 items-center">
					Confirm Password
				</label>
				<input
					type="password"
					{...register("confirm_password")}
					placeholder="Enter the companys linked in url"
					className={`bg-[#F5F7FA] rounded-sm px-4 py-3 outline placeholder:text-gray-400 ${
						errors.confirm_password && "outline-red-500"
					}`}
				/>
				{errors.confirm_password && (
					<span className="text-red-500 text-sm mt-1">
						{errors.confirm_password.message}
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

export { ChangePasswordForm };
