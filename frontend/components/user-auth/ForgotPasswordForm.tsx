"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ForgotPasswordFormValues, UserAuthFormState } from "../../types/user-auth.types";
import { validateForgotPasswordForm } from "../../lib/validations/user-auth.validation";
import { cn } from "../../lib/utils";
import { useForgotPasswordMutation } from "../../hooks/useUserHooks";
import { Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordFormValues>({
    email: "",
  });

  const [formState, setFormState] = useState<UserAuthFormState<ForgotPasswordFormValues>>({
    values: formData,
    isSubmitting: false,
    submitStatus: "idle",
  });

  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    if (errors.email) setErrors({});
  };

  const mutation = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForgotPasswordForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    try {
      await mutation.mutateAsync(formData.email);
      setFormState({
        values: formData,
        isSubmitting: false,
        submitStatus: "success",
      });
    } catch (err: any) {
      setErrors({ email: err.response?.data?.message || "Failed to send reset link" });
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };

  if (formState.submitStatus === "success") {
    return (
      <div className="carbon-glass border border-[#FF1E27]/25 p-8 sm:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn select-none backdrop-blur-xl relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />

        <div className="w-16 h-16 rounded-2xl bg-[#12141C] border border-[#FF1E27]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,30,39,0.3)]">
          <Mail className="w-8 h-8 text-[#FF1E27] animate-scaleIn" />
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide mb-3">
          Check Your Email
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-sm">
          We&apos;ve sent a password recovery link to{" "}
          <span className="text-white font-bold">{formState.values.email}</span>. Follow the link to securely reset your credentials.
        </p>

        <Link
          href="/login"
          className="btn-racing-red py-3.5 px-8 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="carbon-glass border border-[#FF1E27]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col gap-6 animate-fadeIn backdrop-blur-xl relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF1E27] opacity-[0.06] blur-[90px] rounded-full" />

      {/* Header section */}
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="font-heading font-black text-3xl sm:text-4xl metallic-text tracking-wide uppercase">
          Forgot Password
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
          Enter your registered email address below and we&apos;ll send you a secure link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col w-full gap-1.5">
          <label
            htmlFor="email"
            className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={formState.isSubmitting}
            className={cn(
              "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
              errors.email && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
            )}
          />
          {errors.email && (
            <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] mt-2"
        >
          <span>{formState.isSubmitting ? "Sending Link..." : "Send Reset Link"}</span>
          {!formState.isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>

        <div className="text-center mt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-[#8A92A0] hover:text-[#FF1E27] uppercase tracking-wider transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
