"use client";

import React from "react";
import Link from "next/link";
import { Lock, User, Building2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface AuthNavigationTabsProps {
  activeTab: "login" | "register" | "host-register";
  className?: string;
}

export default function AuthNavigationTabs({
  activeTab,
  className,
}: AuthNavigationTabsProps) {
  const tabs = [
    {
      id: "login" as const,
      label: "Sign In",
      mobileLabel: "Sign In",
      href: "/login",
      icon: <Lock className="w-4 h-4 shrink-0" />,
    },
    {
      id: "register" as const,
      label: "User Register",
      mobileLabel: "User",
      href: "/register",
      icon: <User className="w-4 h-4 shrink-0" />,
    },
    {
      id: "host-register" as const,
      label: "Host Register",
      mobileLabel: "Host",
      href: "/host/register",
      icon: <Building2 className="w-4 h-4 shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "w-full bg-[#12141C] border border-white/10 p-1.5 rounded-2xl flex items-center shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex-1 py-3 text-center rounded-xl font-heading font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none",
              isActive
                ? "btn-racing-red text-white shadow-[0_0_20px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white hover:bg-white/5"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="inline sm:hidden">{tab.mobileLabel}</span>
          </Link>
        );
      })}
    </div>
  );
}
