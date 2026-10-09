"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRegistrationFormValues, UserAuthFormState } from "../../types/user-auth.types";
import {
  validateRegisterForm,
  getPasswordStrength,
} from "../../lib/validations/user-auth.validation";
import AuthSuccessState from "./AuthSuccessState";
import AuthNavigationTabs from "../shared/AuthNavigationTabs";
import { cn, extractApiError } from "../../lib/utils";
import { useRegisterMutation } from "../../hooks/useAuthHooks";
import {
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function UserRegistrationForm() {
  const router = useRouter();

  // Controlled form values state - exact Fairway Draws schema
  const [formData, setFormData] = useState<UserRegistrationFormValues>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    acceptedMarketing: false,
  });

  // Overall form visual state
  const [formState, setFormState] = useState<UserAuthFormState<UserRegistrationFormValues>>({
    values: formData,
    isSubmitting: false,
    submitStatus: "idle",
  });

  // Client-side validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const registerMutation = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Perform validation checks
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    // 2. Submit form
    try {
      await registerMutation.mutateAsync({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.fullName.trim().split(" ")[0] || "",
        lastName: formData.fullName.trim().split(" ").slice(1).join(" ") || "",
        phone: formData.phone?.trim() || undefined,
        role: "CLIENT",
      });

      showToast("Registration successful! Check your email to verify.");
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 1500);
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));

      const responseData = error.response?.data;
      const validationErrors = responseData?.errors || responseData?.error;

      if (Array.isArray(validationErrors)) {
        const mappedErrors: Record<string, string> = {};
        validationErrors.forEach((err: any) => {
          if (err.field) {
            mappedErrors[err.field] = Array.isArray(err.errors) ? err.errors[0] : err.errors;
          }
        });
        setErrors((prev) => ({ ...prev, ...mappedErrors }));
        showToast("Please fix the validation errors.");
      } else {
        showToast(extractApiError(error, "Registration failed. Please try again."));
      }
    }
  };

  // Calculate password strength rating
  const passwordStrength = getPasswordStrength(formData.password);

  if (formState.submitStatus === "success") {
    return (
      <AuthSuccessState
        title="Account Created!"
        description="Your registration has been processed successfully. Please verify your email to begin entering live automotive competitions."
        buttonText="Return to Homepage"
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
      <AuthNavigationTabs activeTab="register" />

      {/* Main Registration Card - Carbon Glass Surface */}
      <div className="carbon-glass border border-[#FF1E27]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full relative overflow-hidden backdrop-blur-xl">
        {/* Subtle top crimson glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF1E27] opacity-[0.06] blur-[90px] rounded-full" />

        {/* Header section */}
        <div className="flex flex-col gap-1.5 mb-8">
          <h2 className="font-heading font-black text-3xl sm:text-4xl metallic-text tracking-wide uppercase">
            User Registration
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
            Create your player account to enter live competitions and win built performance cars.
          </p>
        </div>

        {/* Semantic Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name input field */}
          <div className="flex flex-col w-full gap-1.5">
            <label
              htmlFor="fullName"
              className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              autoComplete="name"
              placeholder="Marcus Vance"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className={cn(
                "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                errors.fullName && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
              )}
            />
            {errors.fullName && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.fullName}</span>
              </span>
            )}
          </div>

          {/* Email Address input field */}
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

          {/* Phone Number input field */}
          <div className="flex flex-col w-full gap-1.5">
            <label
              htmlFor="phone"
              className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              placeholder="+44 7700 900000"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className={cn(
                "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                errors.phone && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
              )}
            />
            {errors.phone && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.phone}</span>
              </span>
            )}
          </div>

          {/* Password input field */}
          <div className="flex flex-col w-full gap-1.5">
            <label
              htmlFor="password"
              className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className={cn(
                  "w-full bg-[#1A1D27] border border-white/10 rounded-xl pl-4 pr-11 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                  errors.password && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
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

            {/* Password Strength Meter */}
            <div className="flex gap-1.5 mt-2 h-[4px] w-full">
              {[1, 2, 3, 4].map((barIndex) => (
                <div
                  key={barIndex}
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    formData.password.length > 0 && barIndex <= passwordStrength
                      ? passwordStrength <= 1
                        ? "bg-[#FF1E27]"
                        : passwordStrength === 2
                        ? "bg-amber-500"
                        : passwordStrength === 3
                        ? "bg-yellow-400"
                        : "bg-emerald-500"
                      : "bg-white/10"
                  )}
                />
              ))}
            </div>
            {formData.password.length > 0 && (
              <div className="flex justify-between items-center text-[10px] text-[#8A92A0] mt-0.5 font-medium">
                <span>Password strength</span>
                <span
                  className={cn(
                    "font-bold uppercase tracking-wider",
                    passwordStrength <= 1
                      ? "text-[#FF1E27]"
                      : passwordStrength === 2
                      ? "text-amber-500"
                      : passwordStrength === 3
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  )}
                >
                  {passwordStrength <= 1
                    ? "Weak"
                    : passwordStrength === 2
                    ? "Fair"
                    : passwordStrength === 3
                    ? "Good"
                    : "Strong"}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password input field */}
          <div className="flex flex-col w-full gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className={cn(
                  "w-full bg-[#1A1D27] border border-white/10 rounded-xl pl-4 pr-11 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                  errors.confirmPassword && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A92A0] hover:text-[#FF1E27] p-1 cursor-pointer select-none transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.confirmPassword}</span>
              </span>
            )}
          </div>

          {/* Terms & Conditions Acceptance Checkbox */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleInputChange}
                disabled={formState.isSubmitting}
                className="w-4.5 h-4.5 mt-0.5 rounded border border-white/20 bg-[#1A1D27] text-[#FF1E27] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#FF1E27] transition-all duration-200 cursor-pointer shrink-0"
              />
              <label
                htmlFor="acceptedTerms"
                className="font-sans text-xs sm:text-sm text-[#D1D5DB] select-none cursor-pointer leading-relaxed"
              >
                I confirm I am 18+ and agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#FF1E27] hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#FF1E27] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.acceptedTerms && (
              <span className="font-sans text-[11px] text-[#FF1E27] font-medium self-start flex items-center gap-1.5 animate-fadeIn ml-7.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.acceptedTerms}</span>
              </span>
            )}
          </div>

          {/* Marketing Acceptance Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptedMarketing"
              name="acceptedMarketing"
              checked={formData.acceptedMarketing}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
              className="w-4.5 h-4.5 mt-0.5 rounded border border-white/20 bg-[#1A1D27] text-[#FF1E27] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#FF1E27] transition-all duration-200 cursor-pointer shrink-0"
            />
            <label
              htmlFor="acceptedMarketing"
              className="font-sans text-xs text-[#8A92A0] select-none cursor-pointer leading-relaxed"
            >
              Send me alerts for early-bird tickets, exclusive track weapon drops, and discount promotions.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]"
            >
              <span>{formState.isSubmitting ? "Creating Account..." : "Create Account"}</span>
              {!formState.isSubmitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
