"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { signUpAction } from "@/actions/auth";
import { type SignUpFormData, signupUser } from "@/lib/zod";
import Link from "next/link";

export function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signupUser) });

  const onSubmit = async (formData: SignUpFormData) => {
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
    if (!result.success) return;

    try {
      await signUpAction(formData);
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

      <h1 className="text-3xl font-bold mb-2">Create new Account</h1>
      <p className="text-gray-400 mb-6">Create a new Accout for shopping!</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Names */}
        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("firstname")}
            placeholder="First Name"
            className={`border rounded-lg px-4 py-2 outline-none ${
              errors.firstname ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register("lastname")}
            placeholder="Last Name"
            className={`border rounded-lg px-4 py-2 outline-none ${
              errors.lastname ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* Email */}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={`border rounded-lg px-4 py-2 outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Password */}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={`border rounded-lg px-4 py-2 outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className={`border rounded-lg px-4 py-2 outline-none ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-400">optional information</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Optional Fields */}
        <input
          {...register("address")}
          placeholder="Address"
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
        />

        <input
          {...register("phone")}
          placeholder="Phone"
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
        />

        <select
          {...register("gender")}
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="diverse">Diverse</option>
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("city")}
            placeholder="City"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
          <input
            {...register("region")}
            placeholder="Region"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("postal_code")}
            placeholder="Postal Code"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
          <input
            {...register("country")}
            placeholder="Country"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition"
        >
          {loading ? "Signing up..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-red-700 hover:underline cursor-pointer">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
