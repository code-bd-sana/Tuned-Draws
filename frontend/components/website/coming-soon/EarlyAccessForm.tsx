"use client";

import React, { useState } from "react";
import InputField from "../shared/InputField";
import { cn } from "../../../lib/utils";
import { CheckCircle2, ShieldCheck, Zap, Flame } from "lucide-react";

/**
 * Premium Early Access Lead Form — Tuned Draws.
 * Dark carbon card with Electric Racing Red CTA, role toggle, and VIP success state.
 */
export default function EarlyAccessForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "HOST">("CUSTOMER");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    let ok = true;
    setNameError(""); setEmailError(""); setGeneralError("");
    if (!fullName.trim()) { setNameError("Full name is required."); ok = false; }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) { setEmailError("Email address is required."); ok = false; }
    else if (!re.test(email)) { setEmailError("Please enter a valid email."); ok = false; }
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), email: email.trim(), role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setIsSuccess(true);
      setFullName(""); setEmail(""); setRole("CUSTOMER");
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-10 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#16A34A]/20 border border-[#16A34A]/40 flex items-center justify-center mx-auto mb-6 text-[#22C55E]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-black text-2xl text-white uppercase mb-2">You&apos;re on the VIP Grid!</h3>
          <p className="font-sans text-sm text-[#8A92A0] leading-relaxed max-w-sm mx-auto mb-6">
            Your early-access pass is locked. Check your inbox for exclusive launch day ticket drops and founding member perks.
          </p>
          <div className="h-px bg-white/10 mb-6" />
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs font-heading font-bold text-[#8A92A0] hover:text-[#FF1E27] transition-colors uppercase tracking-wider cursor-pointer"
          >
            ← Register Another Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-[#FF1E27] text-[10px] font-heading font-black uppercase tracking-widest mb-3">
            Founding Members Only
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Secure Early Access
          </h3>
          <p className="font-sans text-sm text-[#8A92A0] mt-2">
            Join <strong className="text-white">1,200+ car enthusiasts</strong> on the official roster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* General Error */}
          {generalError && (
            <div className="bg-red-950/80 border border-red-700/60 text-red-400 text-xs rounded-xl p-3.5 text-center font-semibold">
              ⚠️ {generalError}
            </div>
          )}

          {/* Inputs */}
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="e.g. Marcus Vance"
            value={fullName}
            onChange={(e) => { setFullName(e.target.value); if (nameError) setNameError(""); }}
            error={nameError}
            disabled={isSubmitting}
            required
          />
          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="marcus@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
            error={emailError}
            disabled={isSubmitting}
            required
          />

          {/* Role Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-heading text-xs font-bold text-[#8A92A0] uppercase tracking-wider">
              I want to:
            </label>
            <div className="grid grid-cols-2 gap-2.5 p-1.5 bg-[#1A1D27] rounded-xl border border-white/5">
              {(["CUSTOMER", "HOST"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  disabled={isSubmitting}
                  className={cn(
                    "py-3 px-3 rounded-lg text-xs font-heading font-black tracking-wider uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2",
                    role === r
                      ? "bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                      : "text-[#8A92A0] hover:text-white"
                  )}
                >
                  {r === "CUSTOMER" ? (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Enter Draws</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-3.5 h-3.5" />
                      <span>Host Draws</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-racing-red w-full py-4 mt-2 text-white font-heading text-xs font-black tracking-[0.14em] uppercase rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(255,30,39,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registering…
              </>
            ) : (
              <>
                Lock In VIP Spot
                <span className="text-white text-base">→</span>
              </>
            )}
          </button>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-4 pt-1">
            {[
              { icon: <ShieldCheck className="w-3 h-3 text-[#16A34A]" />, text: "100% Secure" },
              { icon: <Zap className="w-3 h-3 text-[#FF1E27]" />, text: "Zero Spam" },
              { icon: <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />, text: "Instant Entry" },
            ].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#8A92A0]">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
