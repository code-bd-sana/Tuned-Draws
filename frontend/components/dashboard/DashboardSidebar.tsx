"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DashboardAccount } from "../../types/dashboard.types";
import { dashboardNavigation } from "../../config/dashboard-navigation.config";
import { cn } from "../../lib/utils";
import Image from "next/image";
import FairwayDrawsLogo from "../website/shared/FairwayDrawsLogo";
import { useLogout } from "../../hooks/useAuthHooks";
import { useAdminOverviewStats } from "../../hooks/useAdminHooks";

interface DashboardSidebarProps {
  account: DashboardAccount;
}

export default function DashboardSidebar({ account }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Filter nav items by role
  const navItems = dashboardNavigation.filter(item => item.roles.includes(account.role));

  const { data: overviewStats } = useAdminOverviewStats({
    enabled: account.role === "admin",
  });

  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen bg-[#12141C] border-r border-white/10 fixed left-0 top-0 z-40 shadow-2xl backdrop-blur-md">

      {/* Brand / Logo Area */}
      <div className="h-[88px] flex items-center justify-center border-b border-white/10 shrink-0 w-full px-5 bg-[#0B0C0E]/50">
        <FairwayDrawsLogo variant="light" size="md" href="/dashboard" priority />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide flex flex-col gap-1 w-full">
        {navItems.map((item) => {
          const isDashboardRoot = item.href === "/dashboard" || item.href === "/dashboard/admin" || item.href === "/dashboard/host" || item.href === "/dashboard/user";
          const isActive = isDashboardRoot
            ? pathname === item.href
            : pathname.startsWith(item.href);

          let displayBadge = item.badge;
          if (item.href === "/dashboard/admin/approvals" && overviewStats?.awaitingReview.count !== undefined) {
            displayBadge = overviewStats.awaitingReview.count > 0 ? overviewStats.awaitingReview.count : undefined;
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-[12px] h-[42px] pl-[16px] pr-[16px] rounded-xl transition-all duration-200 group font-sans w-full",
                isActive
                  ? "bg-[#FF1E27]/15 border-l-4 border-[#FF1E27] text-white font-bold shadow-[0_0_15px_rgba(255,30,39,0.2)]"
                  : "bg-transparent border-l-4 border-transparent text-[#8A92A0] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-[#FF1E27]" : "text-[#8A92A0] group-hover:text-white")} />
              <span className={cn(
                "text-[14px] font-medium leading-[normal] truncate",
                isActive ? "text-white font-bold" : "text-[#8A92A0] group-hover:text-white"
              )}>
                {item.label}
              </span>

              {displayBadge !== undefined && (
                displayBadge === true ? (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#FF1E27] shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
                ) : (
                  <span className={cn(
                    "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center",
                    isActive ? "bg-[#FF1E27] text-white" : "bg-white/10 text-white border border-white/10"
                  )}>
                    {displayBadge}
                  </span>
                )
              )}
            </Link>
          );
        })}

        {/* Divider & Log out block */}
        <div className="w-full px-2 pt-2">
          <div className="h-px bg-white/10 w-full" />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-[12px] h-[40px] px-[16px] rounded-xl transition-colors duration-200 w-full text-red-400 hover:text-white hover:bg-red-500/20 group font-medium cursor-pointer"
        >
          <svg className="w-5 h-5 shrink-0 text-red-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          <span className="text-[14px] font-bold ml-1">Log Out</span>
        </button>
      </nav>

      {/* Profile Section (Bottom) */}
      <div className="border-t border-white/10 w-full shrink-0 bg-[#0B0C0E]/70">
        <div className="flex items-center gap-[12px] pb-[17px] pt-[16px] px-[20px] w-full cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-[42px] h-[42px] shrink-0 rounded-full border border-white/15 bg-[#181B26] flex items-center justify-center relative overflow-hidden shadow-md">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
               src={account.avatar}
               alt="Profile"
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.currentTarget as HTMLElement).style.display = 'none';
               }}
             />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-heading font-black text-[14px] text-white truncate leading-tight uppercase">
              {account.name}
            </span>
            <div className="mt-1">
              <span className="inline-flex items-center justify-center px-[8px] h-[18px] rounded-full border border-[#FF1E27]/40 bg-[#FF1E27]/10 text-[#FF1E27] text-[10px] font-black font-heading uppercase tracking-wide">
                {account.role === "host" ? "Verified Host" : `${account.role} Account`}
              </span>
            </div>
          </div>
          <svg className="w-4 h-4 shrink-0 text-[#8A92A0]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
