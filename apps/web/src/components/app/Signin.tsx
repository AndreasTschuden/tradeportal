"use client";

import { signInAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinUser } from "@/lib/zod";
import { SignInFormData } from "@/lib/zod";
import { useState } from "react";
import { inputClass, buttonClass } from "@/components/ui/FormControls";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (formData: SignInFormData) => {
    setLoading(true);
    setError("");

    if (!executeRecaptcha) {
      // setError("ReCAPTCHA not yet available");
      return;
    }

    const token = await executeRecaptcha("signin");
    // console.log("ReCAPTCHA token:", token);

    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (!result.success) {
      // setError("ReCAPTCHA verification failed. Please try again.");
      return;
    } else {
      console.log("ReCAPTCHA verification successful with score:", result);
    }

    try {
      await signInAction(formData);
    } catch (err: unknown) {
      const maybeError = err as { message?: string };
      if (maybeError?.message !== "NEXT_REDIRECT") {
        setError(maybeError?.message || "Sign in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(signinUser) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-md">
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
        {...register("password")}
        type="password"
        placeholder="Password"
        className={`${errors.password ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className={buttonClass}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
