"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PricingPlan, BillingCycle } from "../../../types/pricing.types";
import PrimaryButton from "../shared/PrimaryButton";
import SecondaryButton from "../shared/SecondaryButton";
import { cn } from "../../../lib/utils";
import { useAuthUser } from "../../../hooks/useAuthHooks";
import { useCreateCheckoutSessionMutation } from "../../../hooks/useSubscriptionHooks";
import { SubscriptionPlan } from "../../../services/subscription.service";
import { toast } from "sonner";

interface PricingPlanCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  dbPlan?: SubscriptionPlan; // Passed from backend if available
}

/**
 * Pricing plan card component matching the Figma layouts.
 * Highlights the Premium plan. Handles pricing calculations.
 */
export default function PricingPlanCard({ plan, billingCycle, dbPlan }: PricingPlanCardProps) {
  const isYearly = billingCycle === "yearly";
  const price = isYearly && plan.yearlyPrice !== undefined ? plan.yearlyPrice : plan.monthlyPrice;
  const router = useRouter();
  const { data: user } = useAuthUser();
  const createCheckout = useCreateCheckoutSessionMutation();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubscribe = () => {
    if (!user) {
      router.push('/host/register');
      return;
    }
    if (user.role !== 'HOST') {
      toast.error('Only Host accounts can activate subscriptions. Please create a Host account.');
      return;
    }

    const targetPlanId = dbPlan?.id || plan.id;
    if (!targetPlanId) {
      toast.error('Subscription plan not found in database.');
      return;
    }

    setLoading(true);
    createCheckout.mutate(targetPlanId, {
      onSuccess: (data: any) => {
        if (data.isFree) {
          toast.success(data.message || 'Free subscription activated!');
          window.location.href = data.url || '/dashboard/host/billing?status=success';
        } else if (data.isTest) {
          setTimeout(() => {
            setLoading(false);
            setShowSuccessModal(true);
          }, 2500); // Simulate network loading
        } else if (data.url) {
          window.location.href = data.url;
        } else {
          setLoading(false);
          toast.error('No checkout URL returned.');
        }
      },
      onError: (err: any) => {
        setLoading(false);
        const msg = err?.response?.data?.message || 'Failed to process subscription.';
        toast.error(msg);
      }
    });
  };

  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-2xl p-7 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2",
        plan.isFeatured
          ? "border-2 border-[#FF1E27] bg-[#12141C] shadow-[0_0_35px_rgba(255,30,39,0.25)] ring-1 ring-[#FF1E27]/50"
          : "border border-white/10 bg-[#12141C]/80 hover:border-[#FF1E27]/40 hover:shadow-[0_10px_30px_rgba(255,30,39,0.15)]"
      )}
    >
      {/* Featured Ribbon Badge */}
      {plan.isFeatured && plan.badgeLabel && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF1E27] to-[#B3000C] text-white rounded-full px-4 py-1 shadow-[0_0_15px_rgba(255,30,39,0.5)] font-heading font-black text-[10px] tracking-widest uppercase flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>{plan.badgeLabel}</span>
        </div>
      )}

      {/* Plan Header */}
      <div className="flex flex-col items-start mb-6">
        <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider">
          {plan.name}
        </h3>
        
        {/* Price Tag */}
        <div className="flex items-baseline gap-1.5 mt-3">
          <span className="font-heading font-black text-4xl sm:text-5xl text-white select-none tracking-tight">
            £{price}
          </span>
          <span className="font-sans text-xs font-bold text-[#8A92A0] select-none">
            {price === 0 ? " forever" : "/month"}
          </span>
        </div>
        
        {isYearly && plan.monthlyPrice > 0 ? (
          <span className="font-heading font-bold text-[10px] uppercase tracking-wider text-[#FF1E27] mt-2 select-none bg-[#FF1E27]/10 border border-[#FF1E27]/30 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,30,39,0.15)]">
            £{price * 12}/yr billed annually (Save 20%)
          </span>
        ) : !isYearly && plan.monthlyPrice > 0 ? (
          <span className="font-sans text-xs text-[#8A92A0] mt-2 select-none">
            Billed monthly
          </span>
        ) : null}
      </div>

      {/* Commission Level Label */}
      <div className="inline-flex items-center bg-[#FF1E27]/10 border border-[#FF1E27]/25 px-3.5 py-1.5 rounded-full text-xs font-heading font-black text-white select-none w-fit mb-6 uppercase tracking-wider">
        <span className="text-[#FF1E27] mr-1.5">●</span> {plan.commissionLabel}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 w-full mb-6" />

      {/* Feature List */}
      <ul className="flex-1 flex flex-col gap-3.5 mb-8">
        {plan.features.map((feature) => (
          <li
            key={feature.id}
            className={cn(
              "flex items-center gap-3 font-sans text-xs md:text-sm font-medium transition-all duration-200",
              feature.included ? "text-[#D1D5DB]" : "text-[#8A92A0]/40 line-through"
            )}
          >
            {/* Check or Dash SVG icon */}
            {feature.included ? (
              <div className="w-5 h-5 rounded-full bg-[#FF1E27]/15 border border-[#FF1E27]/30 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-[#FF1E27]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white/20"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </div>
            )}
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA Action Button */}
      <div className="mt-auto">
        {plan.isFeatured ? (
          <button 
            type="button"
            className="w-full py-3.5 rounded-xl font-heading text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#B3000C] shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,30,39,0.7)] hover:scale-[1.02] active:scale-98 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2" 
            onClick={handleSubscribe} 
            disabled={loading}
          >
            {loading ? 'Processing...' : plan.ctaLabel}
          </button>
        ) : (
          <button 
            type="button"
            className="w-full py-3.5 rounded-xl font-heading text-xs font-black uppercase tracking-wider text-white border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-[1.02] active:scale-98 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2" 
            onClick={handleSubscribe} 
            disabled={loading}
          >
            {loading ? 'Processing...' : plan.ctaLabel}
          </button>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#12141C] border border-white/10 p-8 rounded-2xl shadow-[0_0_50px_rgba(255,30,39,0.3)] w-[90%] max-w-md flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FF1E27]/20 border border-[#FF1E27]/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,30,39,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-[#FF1E27]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-heading font-black text-2xl text-white mb-3 uppercase tracking-wide">Payment Successful</h2>
            <p className="font-sans text-sm text-[#8A92A0] mb-8 leading-relaxed">Your hosting subscription has been activated successfully. You are now ready to launch performance draws.</p>
            <button 
              type="button"
              className="w-full py-3.5 rounded-xl font-heading text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#B3000C] shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,30,39,0.7)] cursor-pointer" 
              onClick={() => {
                window.location.href = '/dashboard/host/billing?status=success';
              }}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
