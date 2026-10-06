"use client";

import React, { useState } from "react";
import InputField from "../shared/InputField";
import TextareaField from "../shared/TextareaField";
import PrimaryButton from "../shared/PrimaryButton";
import { ContactFormValues } from "../../../types/contact.types";
import { cn } from "../../../lib/utils";
import { contactService } from "../../../services/contact.service";

const SUBJECT_OPTIONS = [
  { value: "", label: "Select a topic..." },
  { value: "draw-query", label: "Questions about a Draw" },
  { value: "hosting", label: "Hosting Competitions" },
  { value: "billing", label: "Payment & Subscription" },
  { value: "bug-report", label: "Technical Support" },
  { value: "other", label: "Other Inquiries" },
];

/**
 * Stateful Contact Form component with backend SMTP integration,
 * validation feedback, and accessible success/error alerts.
 */
export default function ContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    agreeToPolicy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear error message when user starts typing again
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormValues, string>> = {};

    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.subject) {
      newErrors.subject = "Please select an inquiry topic.";
    }

    if (!formValues.message.trim()) {
      newErrors.message = "Message content is required.";
    } else if (formValues.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    if (!formValues.agreeToPolicy) {
      newErrors.agreeToPolicy = "You must agree to the privacy policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await contactService.sendContactMessage({
        name: formValues.fullName,
        email: formValues.email,
        subject: formValues.subject,
        message: formValues.message,
      });

      setIsSuccess(true);
      setFormValues({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        agreeToPolicy: false,
      });
    } catch (err: any) {
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          "Failed to send message. Please try again or chat with us directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#12141C]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
        <span className="font-heading text-[10px] font-black uppercase tracking-[0.2em] text-[#FF1E27]">
          DIRECT TRANSMISSION
        </span>
      </div>
      <h2 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-6">
        SEND US A MESSAGE
      </h2>

      {/* Submit Error Notification */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-200 font-sans text-xs flex items-center justify-between shadow-[0_0_20px_rgba(255,0,0,0.2)]">
          <span>⚠️ {submitError}</span>
          <button
            onClick={() => setSubmitError(null)}
            className="text-red-400 hover:text-white font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Success Notification Alert */}
      {isSuccess ? (
        <div className="bg-[#12141C] border border-[#FF1E27]/50 text-white rounded-2xl p-8 flex flex-col items-center text-center animate-fadeIn shadow-[0_0_30px_rgba(255,30,39,0.25)]">
          <div className="w-16 h-16 rounded-full bg-[#FF1E27]/20 border border-[#FF1E27]/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,30,39,0.5)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8 text-[#FF1E27]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 className="font-heading font-black text-xl text-white uppercase mb-2">Message Dispatched!</h3>
          <p className="font-sans text-xs sm:text-sm text-[#8A92A0] leading-relaxed max-w-sm mb-6">
            Thank you for reaching out. Your transmission has been received by our support crew. We will respond via email within 24 hours.
          </p>
          <button 
            type="button"
            onClick={() => setIsSuccess(false)} 
            className="px-6 py-3 rounded-xl font-heading text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#B3000C] shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all hover:scale-105 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="fullName"
              className="font-heading text-xs font-black uppercase tracking-wider text-[#D1D5DB] mb-1.5 self-start select-none"
            >
              Full Name <span className="text-[#FF1E27]">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Dominic Toretto"
              value={formValues.fullName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
              className={cn(
                "w-full rounded-xl border border-white/10 bg-[#0B0C0E] px-4 py-3 font-sans text-xs md:text-sm text-white placeholder:text-[#8A92A0]/40 outline-none transition-all duration-200 focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]/30",
                errors.fullName && "border-red-500/80 focus:border-red-500",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            />
            {errors.fullName && (
              <span className="font-sans text-[11px] text-[#FF1E27] mt-1 self-start select-none">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="font-heading text-xs font-black uppercase tracking-wider text-[#D1D5DB] mb-1.5 self-start select-none"
            >
              Email Address <span className="text-[#FF1E27]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="dom@tuneddraws.com"
              value={formValues.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
              className={cn(
                "w-full rounded-xl border border-white/10 bg-[#0B0C0E] px-4 py-3 font-sans text-xs md:text-sm text-white placeholder:text-[#8A92A0]/40 outline-none transition-all duration-200 focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]/30",
                errors.email && "border-red-500/80 focus:border-red-500",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            />
            {errors.email && (
              <span className="font-sans text-[11px] text-[#FF1E27] mt-1 self-start select-none">
                {errors.email}
              </span>
            )}
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="subject"
              className="font-heading text-xs font-black uppercase tracking-wider text-[#D1D5DB] mb-1.5 self-start select-none"
            >
              Inquiry Subject <span className="text-[#FF1E27]">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              value={formValues.subject}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={cn(
                "w-full appearance-none rounded-xl border border-white/10 bg-[#0B0C0E] px-4 py-3 font-sans text-xs md:text-sm text-white outline-none transition-all duration-200 focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]/30 cursor-pointer",
                errors.subject && "border-red-500/80 focus:border-red-500",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#12141C] text-white py-2">
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.subject && (
              <span className="font-sans text-[11px] text-[#FF1E27] mt-1 self-start select-none">
                {errors.subject}
              </span>
            )}
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="message"
              className="font-heading text-xs font-black uppercase tracking-wider text-[#D1D5DB] mb-1.5 self-start select-none"
            >
              Message Content <span className="text-[#FF1E27]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell our pit crew how we can assist you..."
              value={formValues.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows={5}
              required
              className={cn(
                "w-full rounded-xl border border-white/10 bg-[#0B0C0E] px-4 py-3 font-sans text-xs md:text-sm text-white placeholder:text-[#8A92A0]/40 outline-none transition-all duration-200 resize-none focus:border-[#FF1E27] focus:ring-1 focus:ring-[#FF1E27]/30",
                errors.message && "border-red-500/80 focus:border-red-500",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            />
            {errors.message && (
              <span className="font-sans text-[11px] text-[#FF1E27] mt-1 self-start select-none">
                {errors.message}
              </span>
            )}
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="flex flex-col">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formValues.agreeToPolicy}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-white/20 text-[#FF1E27] bg-[#0B0C0E] focus:ring-[#FF1E27]/20 cursor-pointer mt-1 accent-[#FF1E27]"
              />
              <span className="font-sans font-medium text-xs md:text-sm text-[#8A92A0] group-hover:text-white transition-colors duration-200">
                I agree to the <span className="text-white underline">Privacy Policy</span> and data processing terms
              </span>
            </label>
            {errors.agreeToPolicy && (
              <span className="font-sans text-[11px] text-[#FF1E27] mt-1.5 self-start select-none">
                {errors.agreeToPolicy}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-2 rounded-xl font-heading text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#FF1E27] to-[#B3000C] shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,30,39,0.7)] hover:scale-[1.01] active:scale-98 disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Transmit Message</span>
                <span className="leading-none">&#8594;</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
