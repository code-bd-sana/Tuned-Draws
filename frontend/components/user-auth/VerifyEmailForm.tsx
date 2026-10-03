"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmailMutation, useResendVerificationMutation } from "../../hooks/useAuthHooks";
import { extractApiError } from "../../lib/utils";
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const verifyMutation = useVerifyEmailMutation();
  const resendMutation = useResendVerificationMutation();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    if (token && verificationStatus === "idle") {
      setVerificationStatus("verifying");
      verifyMutation
        .mutateAsync(token)
        .then(() => {
          setVerificationStatus("success");
          showToast("Email verified successfully! Redirecting...");
          setTimeout(() => router.push("/login"), 2000);
        })
        .catch((error) => {
          setVerificationStatus("error");
          showToast(extractApiError(error, "Failed to verify email. The link might have expired."));
        });
    }
  }, [token, verifyMutation, router, verificationStatus]);

  const handleResend = async () => {
    if (!email) {
      showToast("Email address is missing. Please try logging in again.");
      return;
    }

    try {
      await resendMutation.mutateAsync(email);
      showToast("Verification link resent! Please check your inbox.");
    } catch (error: any) {
      showToast(extractApiError(error, "Failed to resend verification link."));
    }
  };

  if (verificationStatus === "verifying") {
    return (
      <div className="carbon-glass border border-[#FF1E27]/25 p-8 sm:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn select-none backdrop-blur-xl relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />
        <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide mb-4">
          Verifying Your Email...
        </h2>
        <div className="w-10 h-10 border-3 border-[#FF1E27] border-t-transparent rounded-full animate-spin my-4" />
        <p className="font-sans text-xs text-[#8A92A0]">
          Please wait while we validate your security token.
        </p>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="carbon-glass border border-[#FF1E27]/25 p-8 sm:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn select-none backdrop-blur-xl relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />

        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#12141C]/95 border border-[#FF1E27] text-white px-5 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(255,30,39,0.35)] text-xs sm:text-sm flex items-center gap-2.5 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        <div className="w-16 h-16 rounded-2xl bg-[#12141C] border border-emerald-500/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-scaleIn" />
        </div>

        <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide mb-3">
          Email Verified!
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-8 max-w-sm">
          Your email address has been successfully verified. You are now authorized to participate in live draws.
        </p>

        <Link
          href="/login"
          className="btn-racing-red py-3.5 px-8 rounded-xl text-white font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center gap-2 cursor-pointer select-none"
        >
          <span>Continue to Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="carbon-glass border border-[#FF1E27]/25 p-6 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-xl mx-auto flex flex-col items-center text-center animate-fadeIn select-none backdrop-blur-xl relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#FF1E27] opacity-[0.06] blur-[90px] rounded-full" />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#12141C]/95 border border-[#FF1E27] text-white px-5 py-3.5 rounded-xl shadow-[0_10px_35px_rgba(255,30,39,0.35)] text-xs sm:text-sm flex items-center gap-2.5 backdrop-blur-md">
          <AlertCircle className="w-4 h-4 text-[#FF1E27] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Envelope Icon */}
      <div className="w-16 h-16 rounded-2xl bg-[#12141C] border border-[#FF1E27]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,30,39,0.3)]">
        <Mail className="w-8 h-8 text-[#FF1E27] animate-scaleIn" />
      </div>

      {/* Header */}
      <h2 className="font-heading font-black text-2xl sm:text-3xl metallic-text uppercase tracking-wide mb-3">
        Verify Your Email
      </h2>

      {/* Explanation */}
      <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mb-6 max-w-sm">
        We&apos;ve sent a verification link to your email address{" "}
        {email ? <span className="text-white font-bold">({email})</span> : ""}. Please check your inbox and click the link to activate your account.
      </p>

      {/* Resend Button */}
      <div className="w-full mb-6">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendMutation.isPending}
          className="w-full btn-racing-red py-3.5 px-6 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]"
        >
          <span>{resendMutation.isPending ? "Resending Link..." : "Resend Verification Email"}</span>
          {!resendMutation.isPending && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Footer link */}
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-[#8A92A0] hover:text-[#FF1E27] uppercase tracking-wider transition-colors duration-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Sign In</span>
      </Link>
    </div>
  );
}
