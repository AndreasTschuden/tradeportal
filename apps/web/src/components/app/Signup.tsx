"use client";

import { signUpAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData } from "@/lib/zod";
import { signupUser } from "@/lib/zod";
import { useState } from "react";
import { inputClass, buttonClass } from "@/components/ui/FormControls";
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-lg">
      {/* Address */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <input
            {...register("firstname")}
            type="text"
            placeholder="First Name"
            className={`${errors.firstname ? "border-red-500" : "border-slate-300"} ${inputClass}`}
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
            className={`${errors.lastname ? "border-red-500" : "border-slate-300"} ${inputClass}`}
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

      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm Password"
        className={`${errors.confirmPassword ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}
      <input
        {...register("address", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="Address (optional)"
        className={`${errors.address ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.address && (
        <p className="text-red-500 text-sm">{errors.address.message}</p>
      )}

      {/* Phone */}
      <input
        {...register("phone", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="Phone (optional)"
        className={`${errors.phone ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      {/* Gender */}
      <select
        {...register("gender", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        className={`${errors.gender ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      >
        <option value="">Select Gender (optional)</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="diverse">Diverse</option>
      </select>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      {/* City */}
      <input
        {...register("city", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="City (optional)"
        className={`${errors.city ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.city && (
        <p className="text-red-500 text-sm">{errors.city.message}</p>
      )}

      {/* Region */}
      <input
        {...register("region", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="Region (optional)"
        className={`${errors.region ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.region && (
        <p className="text-red-500 text-sm">{errors.region.message}</p>
      )}

      {/* Postal Code */}
      <input
        {...register("postal_code", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="Postal Code (optional)"
        className={`${errors.postal_code ? "border-red-500" : "border-slate-300"} ${inputClass}`}
      />
      {errors.postal_code && (
        <p className="text-red-500 text-sm">{errors.postal_code.message}</p>
      )}

      {/* Country */}
      <input
        {...register("country", {
          setValueAs: (value) => (value === "" ? undefined : value),
        })}
        type="text"
        placeholder="Country (optional)"
        className={`${errors.country ? "border-red-500" : "border-slate-300"} ${inputClass}`}
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
      <button type="submit" disabled={loading} className={buttonClass}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
