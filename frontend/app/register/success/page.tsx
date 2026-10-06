import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import UserAuthLayout from "../../../components/user-auth/UserAuthLayout";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Registration Successful | Tuned Draws",
  description: "Your Tuned Draws account has been created successfully.",
};

export default function RegisterSuccessPage() {
  return (
    <UserAuthLayout mode="register">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-2xl border border-white/10 bg-[#12141C] p-8 sm:p-12 text-center shadow-2xl text-white max-w-md mx-auto">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.25)]">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Account Created!
          </h2>
          <p className="text-xs sm:text-sm text-[#8A92A0] leading-relaxed max-w-sm">
            Welcome to <strong className="text-white">Tuned Draws</strong>. Your player session is configured and ready. You can now enter live competitions and unlock instant-win allocations.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3 pt-2">
          <Link
            href="/login"
            className="btn-racing-red w-full py-3.5 rounded-xl text-white font-heading font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,30,39,0.35)]"
          >
            <span>Proceed to Login</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/live-raffles"
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-[#D1D5DB] hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all"
          >
            Explore Competitions
          </Link>
        </div>
      </div>
    </UserAuthLayout>
  );
}
