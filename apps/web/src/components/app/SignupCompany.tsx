"use client";

import { signUpCompanyAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpCompanyFormData } from "@/lib/zod";
import { signupCompany } from "@/lib/zod";
import { useState } from "react";
import { inputClass, buttonClass } from "@/components/ui/FormControls";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function SignupCompany() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    if (!result.success) return;

    try {
      await signUpCompanyAction(formData);
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-lg">
      {/* Address */}

      <input
        {...register("company_name")}
        type="text"
        placeholder="Company Name"
        className={`${errors.company_name ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.company_name && (
        <p className="text-red-500 text-sm mt-1">
          {errors.company_name.message}
        </p>
      )}
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className={`${errors.email ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("phone")}
        type="text"
        placeholder="Phone"
        className={`${errors.phone ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className={`${errors.password ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className={`${errors.confirmPassword ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}

      {/* Button */}
      <button type="submit" disabled={loading} className={buttonClass}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
