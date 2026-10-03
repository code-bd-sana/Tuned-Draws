"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HostRegistrationFormValues,
  HostRegistrationStep,
  HostAuthFormState,
} from "../../types/host-auth.types";
import {
  validateRegisterStep1,
  validateRegisterStep2,
  validateRegisterStep3,
  validateRegisterStep4,
  getPasswordStrength,
} from "../../lib/validations/host-auth.validation";
import AuthSuccessState from "./AuthSuccessState";
import AuthNavigationTabs from "../shared/AuthNavigationTabs";
import { cn } from "../../lib/utils";
import { useRegisterMutation } from "../../hooks/useAuthHooks";
import { extractApiError } from "../../lib/utils";
import { authService } from "../../services/auth.service";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Building2,
  User,
  Star,
  MapPin,
  Sparkles,
} from "lucide-react";

interface HostRegistrationFormProps {
  step: HostRegistrationStep;
  onChangeStep: (step: HostRegistrationStep) => void;
}

export default function HostRegistrationForm({
  step,
  onChangeStep,
}: HostRegistrationFormProps) {
  const router = useRouter();
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);
  const businessLogoInputRef = useRef<HTMLInputElement>(null);

  // Controlled Registration Data - Exact same schema and inputs
  const [formData, setFormData] = useState<HostRegistrationFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    hostType: "individual",
    profilePhoto: null,
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "United Kingdom",
    bio: "",
    businessName: "",
    contactFullName: "",
    businessRole: "",
    businessEmail: "",
    businessPhone: "",
    vatNumber: "",
    businessLogo: null,
    businessBio: "",
    bankAccountName: "",
    sortCode: "",
    accountNumber: "",
    acceptedTerms: false,
  });

  // Overall form submitting state
  const [formState, setFormState] = useState<HostAuthFormState<HostRegistrationFormValues>>({
    values: formData,
    isSubmitting: false,
    submitStatus: "idle",
  });

  // Step validation errors
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Profile photo & business logo file selection with server uploader and local preview fallback
  const handlePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profilePhoto" | "businessLogo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: previewUrl,
      }));

      if (field === "businessLogo") {
        setIsUploadingLogo(true);
        try {
          const res = await authService.uploadLogo(file);
          if (res?.url) {
            setFormData((prev) => ({
              ...prev,
              businessLogo: res.url,
            }));
          }
        } catch (err) {
          console.error("Failed to upload logo to server, falling back to base64", err);
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prev) => ({
              ...prev,
              businessLogo: reader.result as string,
            }));
          };
          reader.readAsDataURL(file);
        } finally {
          setIsUploadingLogo(false);
        }
      }
    }
  };

  // Navigating back
  const handleBack = () => {
    if (step === 2) onChangeStep(1);
    else if (step === 3) onChangeStep(2);
    else if (step === 4) onChangeStep(3);
    else if (step === 8) onChangeStep(4);
  };

  // Advancing steps with validation gates
  const registerMutation = useRegisterMutation();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      const stepErrors = validateRegisterStep1(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      onChangeStep(2);
    } else if (step === 2) {
      const stepErrors = validateRegisterStep2(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      onChangeStep(3);
    } else if (step === 3) {
      const stepErrors = validateRegisterStep3(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      onChangeStep(4);
    } else if (step === 4) {
      const stepErrors = validateRegisterStep4(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      onChangeStep(8);
    } else if (step === 8) {
      if (!formData.acceptedTerms) {
        showToast("Please agree to the Host Guidelines and Platform Rules.");
        return;
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: true,
      }));

      try {
        await registerMutation.mutateAsync({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.city ? `${formData.city}, ${formData.country}` : formData.country,
          phone: formData.phone || undefined,
          role: "HOST",
          businessName: formData.businessName || `${formData.firstName} ${formData.lastName}`,
          bio: formData.businessBio || formData.bio || undefined,
          avatarUrl: formData.businessLogo || formData.profilePhoto || undefined,
        });

        showToast("Host application submitted! Check your email to verify.");
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        }, 1500);
      } catch (error: any) {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
        }));
        const errorMsg = extractApiError(error, "Registration failed");
        showToast(errorMsg);
      }
    }
  };

  if (formState.submitStatus === "success") {
    return (
      <AuthSuccessState
        title="Application Submitted!"
        description="Your details have been recorded. Our automotive verification team will review your application and activate your host portal within 24 hours."
        buttonText="Return to Homepage"
        buttonHref="/"
      />
    );
  }

  // Calculate password strength rating
  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-6 animate-fadeIn text-white">
      {/* Action Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#12141C]/95 border border-[#FF1E27] text-white px-5 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(255,30,39,0.35)] text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn backdrop-blur-md">
          <AlertCircle className="w-4 h-4 text-[#FF1E27] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Unified Master Tabs: Sign In | User Register | Host Register */}
      <AuthNavigationTabs activeTab="host-register" />

      {/* Main Form container card */}
      <div className="carbon-glass border border-[#FF1E27]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full backdrop-blur-xl relative overflow-hidden">
        {/* Subtle top crimson glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />

        {/* Subtle Ambient Red Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF1E27] opacity-[0.06] blur-[90px] rounded-full" />

        <form onSubmit={handleContinue}>
          {/* STEP 1: Account Credentials */}
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Step Title Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
                    Step 1 of 5
                  </span>
                  <span className="text-[11px] bg-[#1A1D27] border border-[#FF1E27]/30 px-2.5 py-0.5 rounded-full text-[#FF1E27] font-bold uppercase tracking-wider">
                    Account Credentials
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide">
                  Create Your Host Account
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
                  Set up your login credentials. You can manage and update these anytime in your host dashboard.
                </p>
              </div>

              {/* Email Address */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Encryption Banner */}
              <div className="bg-[#12141C] border border-white/10 p-3.5 rounded-xl flex items-center gap-3 select-none">
                <ShieldCheck className="w-5 h-5 text-[#FF1E27] shrink-0" />
                <p className="font-sans text-xs text-[#9CA3AF] leading-normal">
                  Your credentials and host data are secured with enterprise-grade encryption.
                </p>
              </div>

              {/* Bottom Nav Actions */}
              <div className="flex items-center justify-between mt-4 pt-2">
                <span className="text-xs text-[#8A92A0]">
                  Already have a Host account?{" "}
                  <Link href="/login" className="font-bold text-[#FF1E27] hover:underline">
                    Sign in
                  </Link>
                </span>
                <button
                  type="submit"
                  className="btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Host Profile */}
          {step === 2 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Step Title Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
                    Step 2 of 5
                  </span>
                  <span className="text-[11px] bg-[#1A1D27] border border-[#FF1E27]/30 px-2.5 py-0.5 rounded-full text-[#FF1E27] font-bold uppercase tracking-wider">
                    Host Profile
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide">
                  Set Up Your Host Profile
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
                  This is how you appear to entrants and in our Verified Hosts directory.
                </p>
              </div>

              {/* Host Type Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]">
                  Host Type
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, hostType: "individual" }))}
                    className={cn(
                      "flex-1 font-sans text-xs sm:text-sm font-bold py-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider select-none",
                      formData.hostType === "individual"
                        ? "btn-racing-red border-[#FF1E27] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)]"
                        : "bg-[#1A1D27] border-white/10 text-[#8A92A0] hover:text-white hover:border-white/20"
                    )}
                  >
                    <User className="w-4 h-4" />
                    <span>Individual</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, hostType: "business" }))}
                    className={cn(
                      "flex-1 font-sans text-xs sm:text-sm font-bold py-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider select-none",
                      formData.hostType === "business"
                        ? "btn-racing-red border-[#FF1E27] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)]"
                        : "bg-[#1A1D27] border-white/10 text-[#8A92A0] hover:text-white hover:border-white/20"
                    )}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Business / Workshop</span>
                  </button>
                </div>
                <span className="font-sans text-[11px] text-[#8A92A0]">
                  {formData.hostType === "individual"
                    ? "You are hosting draws as an individual automotive enthusiast."
                    : "You are hosting draws as a registered tuning workshop or business entity."}
                </span>
              </div>

              {/* First Name & Last Name (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="firstName"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Marcus"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.firstName && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.firstName && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.firstName}</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="lastName"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Vance"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.lastName && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.lastName && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.lastName}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number */}
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
                <span className="font-sans text-[11px] text-[#8A92A0]">
                  Used for verified draw notifications and host support only.
                </span>
              </div>

              {/* City & Country (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="city"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="London"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.city && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.city && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.city}</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="country"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Country
                  </label>
                  <div className="relative w-full">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Ireland">Ireland</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8A92A0]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-[#8A92A0] hover:text-white cursor-pointer select-none transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Business Information */}
          {step === 3 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Step Title Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
                    Step 3 of 5
                  </span>
                  <span className="text-[11px] bg-[#1A1D27] border border-[#FF1E27]/30 px-2.5 py-0.5 rounded-full text-[#FF1E27] font-bold uppercase tracking-wider">
                    Business Info
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide">
                  Tell Us About Your Business
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
                  This information helps us verify your garage or brand and process payouts securely.
                </p>
              </div>

              {/* Business Name */}
              <div className="flex flex-col w-full gap-1.5">
                <label
                  htmlFor="businessName"
                  className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                >
                  Business / Workshop Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  autoComplete="organization"
                  placeholder="e.g. Apex Performance Tuning"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                    errors.businessName && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                  )}
                />
                {errors.businessName && (
                  <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.businessName}</span>
                  </span>
                )}
              </div>

              {/* Contact Full Name & Job Role (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="contactFullName"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Contact Full Name
                  </label>
                  <input
                    type="text"
                    id="contactFullName"
                    name="contactFullName"
                    autoComplete="name"
                    placeholder="Marcus Vance"
                    value={formData.contactFullName}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.contactFullName && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.contactFullName && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.contactFullName}</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="businessRole"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    id="businessRole"
                    name="businessRole"
                    placeholder="Lead Builder / Owner"
                    value={formData.businessRole}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.businessRole && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.businessRole && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.businessRole}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Business Email & Business Phone (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="businessEmail"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    placeholder="contact@apexperformance.co.uk"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.businessEmail && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.businessEmail && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.businessEmail}</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-1.5">
                  <label
                    htmlFor="businessPhone"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    Business Phone Number
                  </label>
                  <input
                    type="tel"
                    id="businessPhone"
                    name="businessPhone"
                    placeholder="+44 20 7946 0123"
                    value={formData.businessPhone}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30",
                      errors.businessPhone && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  {errors.businessPhone && (
                    <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.businessPhone}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* VAT Number */}
              <div className="flex flex-col w-full gap-1.5">
                <div className="flex items-center gap-2 select-none">
                  <label
                    htmlFor="vatNumber"
                    className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                  >
                    VAT Number
                  </label>
                  <span className="text-[10px] md:text-xs bg-[#1A1D27] border border-white/10 px-2.5 py-0.5 rounded-full text-[#8A92A0] uppercase font-semibold">
                    optional / if VAT registered
                  </span>
                </div>
                <input
                  type="text"
                  id="vatNumber"
                  name="vatNumber"
                  placeholder="GB123456789"
                  value={formData.vatNumber}
                  onChange={handleInputChange}
                  className="w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30"
                />
                <span className="font-sans text-[11px] text-[#8A92A0]">
                  Leave blank if your business is not VAT registered.
                </span>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-[#8A92A0] hover:text-white cursor-pointer select-none transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
                >
                  <span>Save & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Logo & Branding */}
          {step === 4 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Step Title Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
                    Step 4 of 5
                  </span>
                  <span className="text-[11px] bg-[#1A1D27] border border-[#FF1E27]/30 px-2.5 py-0.5 rounded-full text-[#FF1E27] font-bold uppercase tracking-wider">
                    Logo & Workshop Bio
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide">
                  Upload Logo &amp; Workshop Bio
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
                  Configure visual branding features for entrants to see on your page.
                </p>
              </div>

              {/* Logo Upload Box */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]">
                  Business Logo
                </label>
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div
                    onClick={() => businessLogoInputRef.current?.click()}
                    className="relative w-36 h-36 bg-[#1A1D27] border-2 border-dashed border-white/15 hover:border-[#FF1E27] rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden text-center transition-all duration-200 group shrink-0 shadow-lg"
                  >
                    {isUploadingLogo ? (
                      <div className="flex flex-col items-center gap-2 p-2">
                        <div className="w-7 h-7 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[10px] text-[#8A92A0]">Uploading...</span>
                      </div>
                    ) : formData.businessLogo ? (
                      <img
                        alt="Business Logo preview"
                        src={formData.businessLogo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-4 flex flex-col items-center gap-2 select-none text-[#8A92A0] group-hover:text-white transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#12141C] border border-white/10 flex items-center justify-center group-hover:border-[#FF1E27]/50 transition-colors">
                          <Upload className="w-5 h-5 text-[#FF1E27]" />
                        </div>
                        <span className="text-[11px] font-medium">Click to upload</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={businessLogoInputRef}
                    onChange={(e) => handlePhotoUpload(e, "businessLogo")}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                  <div className="flex flex-col gap-1.5 pt-1">
                    <p className="font-sans text-xs md:text-sm text-[#D1D5DB] leading-relaxed">
                      Recommended: High resolution PNG or JPG, at least 400×400px.
                    </p>
                    <p className="font-sans text-xs text-[#8A92A0] leading-relaxed">
                      This appears on your verified host cards, live draw listings, and official certificate of winner releases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Short Business Bio */}
              <div className="flex flex-col w-full gap-1.5">
                <label
                  htmlFor="businessBio"
                  className="font-sans font-bold text-xs uppercase tracking-wider text-[#D1D5DB]"
                >
                  Short Host / Workshop Bio
                </label>
                <div className="relative w-full">
                  <textarea
                    id="businessBio"
                    name="businessBio"
                    maxLength={300}
                    placeholder="Tell entrants about your tuning builds, heritage, or performance projects..."
                    value={formData.businessBio}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full bg-[#1A1D27] border border-white/10 rounded-xl px-4 py-3 h-28 font-sans text-xs sm:text-sm text-white placeholder:text-[#8A92A0]/50 transition-all duration-200 outline-none hover:border-white/20 focus:border-[#FF1E27] focus:ring-2 focus:ring-[#FF1E27]/30 resize-none",
                      errors.businessBio && "border-[#FF1E27] ring-1 ring-[#FF1E27]"
                    )}
                  />
                  <span className="absolute bottom-2.5 right-3 font-sans text-[10px] text-[#8A92A0] select-none">
                    {formData.businessBio.length} / 300
                  </span>
                </div>
                {errors.businessBio && (
                  <span className="font-sans text-[11px] text-[#FF1E27] font-medium mt-1 self-start flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.businessBio}</span>
                  </span>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-[#8A92A0] hover:text-white cursor-pointer select-none transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: Ready to Go Live? (Step 5 of 5) */}
          {step === 8 && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              {/* Step Title Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
                    Step 5 of 5
                  </span>
                  <span className="text-[11px] bg-[#1A1D27] border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-emerald-400 font-bold uppercase tracking-wider">
                    Ready For Review
                  </span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide">
                  Ready to Go Live?
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#9CA3AF]">
                  Review your setup and launch your host profile on the platform.
                </p>
              </div>

              {/* Onboarding Checklist Summary Box */}
              <div className="bg-[#12141C] border border-[#FF1E27]/25 p-5 rounded-xl flex flex-col gap-3 select-none">
                <p className="font-heading font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF1E27]" />
                  <span>Onboarding Summary</span>
                </p>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-[#D1D5DB] font-medium">Account created</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-[#D1D5DB] font-medium">Host profile set up</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-[#D1D5DB] font-medium">Business details submitted</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      !
                    </span>
                    <span className="text-[#D1D5DB] font-medium">Automotive verification pending</span>
                  </div>
                </div>
              </div>

              {/* Public Profile Preview Card */}
              <div className="bg-[#12141C] border border-white/10 p-5 rounded-xl flex flex-col gap-3">
                <p className="font-heading font-bold text-xs sm:text-sm text-white select-none">
                  Your Public Profile Preview
                </p>
                <div className="flex items-center gap-4 bg-[#1A1D27] p-4 rounded-xl border border-white/5">
                  {/* Logo Avatar */}
                  <div className="w-14 h-14 rounded-full bg-[#12141C] border border-[#FF1E27]/30 overflow-hidden flex items-center justify-center select-none shrink-0 shadow-[0_0_12px_rgba(255,30,39,0.2)]">
                    {formData.businessLogo ? (
                      <img
                        src={formData.businessLogo}
                        alt="Business logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : formData.profilePhoto ? (
                      <img
                        src={formData.profilePhoto}
                        alt="Profile photo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-[#8A92A0]" />
                    )}
                  </div>
                  {/* Name and Meta */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-heading font-bold text-sm md:text-base text-white truncate">
                      {formData.businessName ||
                        `${formData.firstName} ${formData.lastName}` ||
                        "Your Business Name"}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] md:text-xs text-[#8A92A0] select-none">
                      <span className="inline-flex items-center gap-1 text-[#FF1E27] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>New Host</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#9CA3AF]">
                        <MapPin className="w-3.5 h-3.5 text-[#8A92A0]" />
                        <span>{formData.country}</span>
                      </span>
                    </div>
                  </div>
                  {/* Verified badge */}
                  <div className="ml-auto select-none bg-[#12141C] border border-[#FF1E27]/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,30,39,0.2)] shrink-0">
                    <span className="font-sans font-bold text-[9px] md:text-[10px] text-[#FF1E27] uppercase tracking-wider whitespace-nowrap">
                      Verified Host
                    </span>
                  </div>
                </div>
              </div>

              {/* Guidelines Agreement Alert */}
              <div className="bg-[#12141C] border border-white/10 p-4.5 rounded-xl flex gap-3.5 items-start">
                <div className="pt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    id="acceptedTerms"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onChange={handleInputChange}
                    disabled={formState.isSubmitting}
                    className="w-4.5 h-4.5 rounded border border-white/20 bg-[#1A1D27] text-[#FF1E27] focus:ring-0 focus:ring-offset-0 focus:outline-none accent-[#FF1E27] transition-all duration-200 cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="acceptedTerms"
                  className="font-sans text-xs md:text-sm text-[#D1D5DB] leading-relaxed select-none cursor-pointer"
                >
                  By going live, you confirm that all information is accurate and agree to our{" "}
                  <button
                    type="button"
                    onClick={() => showToast("Host Guidelines document will open shortly.")}
                    className="text-[#FF1E27] hover:underline font-bold"
                  >
                    Host Guidelines
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => showToast("Platform Rules document will open shortly.")}
                    className="text-[#FF1E27] hover:underline font-bold"
                  >
                    Platform Rules
                  </button>
                  .
                </label>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={formState.isSubmitting}
                  className={cn(
                    "inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-[#8A92A0] hover:text-white cursor-pointer select-none transition-colors px-3 py-2 rounded-lg hover:bg-white/5",
                    formState.isSubmitting && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="btn-racing-red py-3.5 px-8 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{formState.isSubmitting ? "Submitting..." : "🚀 Launch Host Profile"}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
