"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { signUpCompanyAction } from "@/actions/auth";
import { type SignUpCompanyFormData, signupCompany } from "@/lib/zod";

export function SignupCompany() {
	const [loading, setLoading] = useState(false);
	const [_error, setError] = useState<string | null>(null);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpCompanyFormData>({ resolver: zodResolver(signupCompany) });

	const onSubmit = async (formData: SignUpCompanyFormData) => {
		setLoading(true);
		setError("");

		if (!executeRecaptcha) return;

		const token = await executeRecaptcha("signup");

		const response = await fetch("/api/verify-recaptcha", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});

		const result = await response.json();
		if (!result.success) {
			setError("reCAPTCHA verification failed");
			setLoading(false);
			return;
		}

		try {
			await signUpCompanyAction(formData);
		} catch (err: unknown) {
			if (err instanceof Error) {
				if (err.message !== "NEXT_REDIRECT") {
					setError(err.message || "Signup failed");
				}
			} else {
				setError("Signup failed");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md">
			{/* Logo / Title */}
			<h2 className="text-xl font-semibold mb-2">
				TradePortal<span className="text-red-600">.</span>
			</h2>

			<h1 className="text-3xl font-bold mb-2 flex flex-col">
				Create new Account{" "}
				<strong className="text-red-700 font-bold text-2xl">
					as a Company
				</strong>
			</h1>
			<p className="text-gray-400 mb-6">
				Create an account as a company to publish and sell your products
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<input
					{...register("company_name")}
					placeholder="Company Name"
					className={`border rounded-lg px-4 py-2 outline-none ${
						errors.company_name ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.company_name && (
					<p className="text-red-500 text-sm">{errors.company_name.message}</p>
				)}

				<input
					{...register("email")}
					type="email"
					placeholder="Email"
					className={`border rounded-lg px-4 py-2 outline-none ${
						errors.email ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}

				<input
					{...register("phone")}
					placeholder="Phone"
					className={`border rounded-lg px-4 py-2 outline-none ${
						errors.phone ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.phone && (
					<p className="text-red-500 text-sm">{errors.phone.message}</p>
				)}

				<input
					{...register("password")}
					type="password"
					placeholder="Password"
					className={`border rounded-lg px-4 py-2 outline-none ${
						errors.password ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}

				<input
					{...register("confirmPassword")}
					type="password"
					placeholder="Confirm Password"
					className={`border rounded-lg px-4 py-2 outline-none ${
						errors.confirmPassword ? "border-red-500" : "border-gray-300"
					}`}
				/>
				{errors.confirmPassword && (
					<p className="text-red-500 text-sm">
						{errors.confirmPassword.message}
					</p>
				)}

				<button
					type="submit"
					disabled={loading}
					className="bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition"
				>
					{loading ? "Signing up..." : "Create Company Account"}
				</button>
			</form>
			<p className="text-sm text-gray-500 text-center mt-5">
				Swithc back to:{" "}
				<Link
					href="/signin"
					className="text-red-700 hover:underline cursor-pointer"
				>
					Log in
				</Link>
			</p>
		</div>
	);
}
