"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResetPasswordFormValues, UserAuthFormState } from "../../types/user-auth.types";
import { validateResetPasswordForm } from "../../lib/validations/user-auth.validation";
import { cn, extractApiError } from "../../lib/utils";
import { useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "../../hooks/useUserHooks";
import { Eye, EyeOff, Lock, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState<ResetPasswordFormValues>({
    password: "",
    confirmPassword: "",
  });

  const [formState, setFormState] = useState<UserAuthFormState<ResetPasswordFormValues>>({
    values: formData,
    isSubmitting: false,
    submitStatus: "idle",
  });

  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; form?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors] || errors.form) {
      setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
    }
  };

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const mutation = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateResetPasswordForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!token) {
      setErrors({ form: "Reset token is missing from the URL. Please use the link sent to your email." });
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    try {
      await mutation.mutateAsync({
        token,
        newPassword: formData.password,
      });

      setFormState({
        values: formData,
        isSubmitting: false,
        submitStatus: "success",
      });
    } catch (err: any) {
      setErrors({
        form: extractApiError(err, "Failed to reset password. The link might be expired or invalid."),
      });
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };

  if (formState.submitStatus === "success") {
    return (
      <div className="carbon-glass border border-[#D4A863]/25 p-8 sm:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn select-none backdrop-blur-xl relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A863] to-transparent opacity-80" />

        <div className="w-16 h-16 rounded-2xl bg-[#211C18] border border-emerald-500/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-scaleIn" />
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide mb-3">
          Password Reset Successful
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-sm">
          Your credentials have been securely updated. You can now sign in to your Wedding Draws account.
        </p>

        <Link
          href="/login"
          className="btn-racing-red py-3.5 px-8 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,168,99,0.35)] hover:shadow-[0_0_30px_rgba(212,168,99,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="carbon-glass border border-[#D4A863]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col gap-6 animate-fadeIn backdrop-blur-xl relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A863] to-transparent opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#94632F] opacity-[0.06] blur-[90px] rounded-full" />

      {/* Header section */}
      <div className="flex flex-col gap-2 mb-2">
        <h2 className="font-heading font-black text-3xl sm:text-4xl metallic-text tracking-wide uppercase">
          Reset Password
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
          Create a new secure password for your account below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {errors.form && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl text-center animate-fadeIn flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#D4A863]" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* New Password */}
        <div className="flex flex-col w-full gap-1.5">
          <label htmlFor="password" className="font-sans font-bold text-xs uppercase tracking-wider text-[#E5DCCD]">
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className={cn(
                "w-full bg-[#302820] border border-white/10 rounded-xl pl-4 pr-11 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#B6AA9C]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#D4A863] focus:ring-2 focus:ring-[#D4A863]/30",
                errors.password && "border-red-400 ring-1 ring-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B6AA9C] hover:text-[#D4A863] p-1 cursor-pointer select-none transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <span className="font-sans text-[11px] text-[#D4A863] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col w-full gap-1.5">
          <label htmlFor="confirmPassword" className="font-sans font-bold text-xs uppercase tracking-wider text-[#E5DCCD]">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className={cn(
                "w-full bg-[#302820] border border-white/10 rounded-xl pl-4 pr-11 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#B6AA9C]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#D4A863] focus:ring-2 focus:ring-[#D4A863]/30",
                errors.confirmPassword && "border-red-400 ring-1 ring-red-400"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B6AA9C] hover:text-[#D4A863] p-1 cursor-pointer select-none transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="font-sans text-[11px] text-[#D4A863] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.confirmPassword}</span>
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(212,168,99,0.35)] hover:shadow-[0_0_30px_rgba(212,168,99,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] mt-2"
        >
          <span>{formState.isSubmitting ? "Updating Password..." : "Update Password"}</span>
          {!formState.isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>

        <div className="text-center mt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-[#B6AA9C] hover:text-[#D4A863] uppercase tracking-wider transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
