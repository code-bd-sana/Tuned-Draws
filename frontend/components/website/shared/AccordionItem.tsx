"use client";

import React from "react";
import { cn } from "../../../lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Reusable Accordion Item for FAQs with smooth CSS transitions and dark automotive styling.
 */
export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-white/5 py-1 px-6 transition-all duration-200">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-heading font-black text-sm md:text-base text-white hover:text-[#FF1E27] transition-colors duration-200 cursor-pointer group py-4 select-none"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{question}</span>
        
        {/* Toggle Icon */}
        <span className="ml-auto flex-shrink-0 text-[#8A92A0] group-hover:text-[#FF1E27] transition-colors duration-200">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-[#FF1E27] transition-transform duration-200"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 transition-transform duration-200"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </span>
      </button>

      {/* Accordion Content with transition */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out text-xs sm:text-sm text-[#8A92A0] leading-relaxed",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0 pb-0"
        )}
      >
        <div className="overflow-hidden">
          {answer}
        </div>
      </div>
    </div>
  );
}
