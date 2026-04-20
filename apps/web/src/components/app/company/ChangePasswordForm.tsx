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
			className="grid w-full max-w-4xl grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2"
		>
			<div className="col-span-1 flex flex-col md:col-span-2">
				<label
					className="text-sm text-gray-500 mb-1"
					htmlFor="current_password"
				>
					Current Password
				</label>
				<input
					id="current_password"
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
				<label className="text-sm text-gray-500 mb-1" htmlFor="new_password">
					New Password
				</label>
				<input
					id="new_password"
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
				<label
					className="text-sm text-gray-500 mb-1 flex gap-1 items-center"
					htmlFor="confirm_password"
				>
					Confirm Password
				</label>
				<input
					id="confirm_password"
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

export { ChangePasswordForm };
