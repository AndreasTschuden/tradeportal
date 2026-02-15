"use client";

import { signUpAction } from "@/app//actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData } from "@/lib/zod";
import { signupUser } from "@/lib/zod";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

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
      const maybeError = err as { message?: string };
      if (maybeError?.message !== "NEXT_REDIRECT") {
        setError(maybeError?.message || "Sign in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-96"
    >
      {/* Address */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <input
            {...register("firstname")}
            type="text"
            placeholder="First Name"
            className={`${
              errors.firstname ? "border-red-500" : "border-slate-300"
            } w-full border-2 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("lastname")}
            type="text"
            placeholder="Last Name"
            className={`${
              errors.lastname ? "border-red-500" : "border-slate-300"
            } w-full border-2 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastname.message}
            </p>
          )}
        </div>
      </div>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="border rounded-md px-3 py-2 text-sm"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border rounded-md px-3 py-2 text-sm"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className="border rounded-md px-3 py-2 text-sm"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}
      <input
        {...register("address")}
        type="text"
        placeholder="Address"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.address ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}

      {/* Phone */}
      <input
        {...register("phone")}
        type="text"
        placeholder="Phone"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.phone ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      {/* Gender */}
      <select
        {...register("gender")}
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.gender ? "border-red-500" : "border-slate-300"
        }`}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="diverse">Diverse</option>
      </select>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      {/* City */}
      <input
        {...register("city")}
        type="text"
        placeholder="City"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.city ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.city && (
        <p className="text-red-500 text-sm">{errors.city.message}</p>
      )}

      {/* Region */}
      <input
        {...register("region")}
        type="text"
        placeholder="Region"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.region ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.region && (
        <p className="text-red-500 text-sm">{errors.region.message}</p>
      )}

      {/* Postal Code */}
      <input
        {...register("postal_code")}
        type="text"
        placeholder="Postal Code"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.postal_code ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.postal_code && (
        <p className="text-red-500 text-sm">{errors.postal_code.message}</p>
      )}

      {/* Country */}
      <input
        {...register("country")}
        type="text"
        placeholder="Country"
        className={`border-2 rounded-md px-3 py-2 text-sm ${
          errors.country ? "border-red-500" : "border-slate-300"
        }`}
      />
      {errors.country && (
        <p className="text-red-500 text-sm">{errors.country.message}</p>
      )}
      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
