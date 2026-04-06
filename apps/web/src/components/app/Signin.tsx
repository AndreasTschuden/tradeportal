"use client";

import { signInAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinUser, SignInFormData } from "@/lib/zod";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Link from "next/link";

export function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({ resolver: zodResolver(signinUser) });

  const onSubmit = async (formData: SignInFormData) => {
    setLoading(true);
    setError("");

    if (!executeRecaptcha) return;

    const token = await executeRecaptcha("signin");

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
      await signInAction(formData);
    } catch (err: any) {
      if (err?.message !== "NEXT_REDIRECT") {
        setError(err?.message || "Sign in failed");
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

      <h1 className="text-3xl font-bold mb-2">Log in to your Account</h1>
      <p className="text-gray-400 mb-6">
        Welcome back! Select method to log in:
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
          className="bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-800 transition mt-2"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>

        {/* reCAPTCHA Hinweis */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          This site is protected by reCAPTCHA and the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </form>

      {/* Bottom Links */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-red-600 hover:underline cursor-pointer">
          Create an account
        </Link>
      </p>

      {/* Company CTA */}
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-xs text-gray-400">for Companies only</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <Link
        href="/signup/company"
        className="w-full border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 flex justify-center"
      >
        Create an Account as a Company
      </Link>
    </div>
  );
}