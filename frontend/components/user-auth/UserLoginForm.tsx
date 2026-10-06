"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UserLoginFormValues, UserAuthFormState } from "../../types/user-auth.types";
import { validateLoginForm } from "../../lib/validations/user-auth.validation";
import AuthSuccessState from "./AuthSuccessState";
import AuthNavigationTabs from "../shared/AuthNavigationTabs";
import { cn, extractApiError } from "../../lib/utils";
import { useLoginMutation } from "../../hooks/useAuthHooks";
import {
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function UserLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  // Controlled form values state - exact Fairway Draws schema
  const [formData, setFormData] = useState<UserLoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Overall form visual state
  const [formState, setFormState] = useState<UserAuthFormState<UserLoginFormValues>>({
    values: formData,
    isSubmitting: false,
    submitStatus: "idle",
  });

  // Client-side validation errors state
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof typeof errors];
        return copy;
      });
    }
  };

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Perform validation checks
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const authRes = await loginMutation.mutateAsync({
        email: formData.email.trim(),
        password: formData.password,
      });

      showToast("Signed in successfully! Redirecting...");
      setTimeout(() => {
        if (redirectUrl && redirectUrl !== "/") {
          router.push(redirectUrl);
        } else if (authRes?.user?.role?.toUpperCase() === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (authRes?.user?.role?.toUpperCase() === "HOST") {
          router.push("/dashboard/host");
        } else {
          router.push(redirectUrl);
        }
      }, 1000);
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));

      if (
        error.response?.data?.message ===
        "Please verify your email address before logging in"
      ) {
        showToast("Please verify your email address before logging in. Redirecting...");
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        }, 1500);
      } else {
        showToast(extractApiError(error, "Login failed. Please check your credentials."));
      }
    }
  };

  if (formState.submitStatus === "success") {
    return (
      <AuthSuccessState
        title="Welcome Back!"
        description="Your Player session has been successfully authenticated. Directing you to the dashboard..."
        buttonText="Explore Competitions"
        buttonHref="/"
      />
    );
  }

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col gap-5 animate-fadeIn text-white">
      {/* Toast Alert popup */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#12141C]/95 border border-[#FF1E27] text-white px-5 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(255,30,39,0.35)] text-xs sm:text-sm animate-fadeIn flex items-center gap-2.5 backdrop-blur-md">
          <AlertCircle className="w-4 h-4 text-[#FF1E27] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Unified Master Tabs: Sign In | User Register | Host Register */}
      <AuthNavigationTabs activeTab="login" />

      {/* Main Login Card - Carbon Glass Surface */}
      <div className="carbon-glass border border-[#FF1E27]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full relative overflow-hidden backdrop-blur-xl">
        {/* Subtle top crimson glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF1E27] opacity-[0.06] blur-[90px] rounded-full" />

        {/* Header section */}
        <div className="flex flex-col gap-1.5 mb-8">
          <h2 className="font-heading font-black text-3xl sm:text-4xl metallic-text tracking-wide uppercase">
            Sign In
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
            Enter your credentials to access your player or verified host account.
          </p>
        </div>

        {/* Semantic Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Address or Username input field */}
          <div className="flex flex-col w-full gap-1.5">
            <label
              htmlFor="email"
              className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
            >
              Email Address or Username
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="username"
                placeholder="you@example.com or username"
                value={formData.email}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className={cn(
                  "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none",
                  errors.email
                    ? "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    : "hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                  formState.isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
            {errors.email && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          {/* Password input field */}
          <div className="flex flex-col w-full gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#8A92A0] hover:text-[#FF1E27] transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className={cn(
                  "w-full bg-[#1A1D27] border border-white/10 rounded-xl pl-4 pr-11 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none",
                  errors.password
                    ? "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    : "hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                  formState.isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A92A0] hover:text-[#FF1E27] p-1 cursor-pointer select-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.password}</span>
              </span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className="w-4.5 h-4.5 rounded border border-white/20 bg-[#1A1D27] text-[#FF1E27] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#FF1E27] transition-all duration-200 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="font-sans text-xs sm:text-sm text-[#D1D5DB] select-none cursor-pointer"
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]"
            >
              <span>{formState.isSubmitting ? "Authenticating..." : "Sign In to Account"}</span>
              {!formState.isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
