"use client";

import React, { useState } from "react";
import {
  SearchedUser,
  useAdminUserSearch,
} from "@/hooks/useAdminTicketAssignment";

interface RecipientUserSearchProps {
  selectedUser: SearchedUser | null;
  onSelectUser: (user: SearchedUser | null) => void;
}

export default function RecipientUserSearch({
  selectedUser,
  onSelectUser,
}: RecipientUserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: users, isLoading } = useAdminUserSearch(searchTerm);

  return (
    <div className="flex flex-col gap-4 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] font-bold text-sm shadow-xs">
          3
        </div>
        <div>
          <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
            Recipient User
          </h3>
          <p className="font-sans text-xs text-[#8A92A0]">
            Search and select the user who will receive these manual tickets
          </p>
        </div>
      </div>

      {selectedUser ? (
        /* Selected User Card */
        <div className="bg-gradient-to-r from-[#181B26] to-[#0E1017] border-2 border-emerald-500/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#0B0C0E] border border-white/20 overflow-hidden shrink-0 flex items-center justify-center shadow-md">
              {selectedUser.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-heading font-black text-white text-base">
                  {selectedUser.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-sm sm:text-base text-white truncate">
                  {selectedUser.name}
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/10 text-white">
                  {selectedUser.role}
                </span>
              </div>
              <p className="font-sans text-xs text-[#8A92A0] truncate">
                {selectedUser.email}
              </p>
              <p className="font-mono text-[10px] text-[#8A92A0] mt-0.5">
                ID: {selectedUser.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectUser(null)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            Change Recipient
          </button>
        </div>
      ) : (
        /* Live Search Autocomplete */
        <div className="relative">
          <div className="relative">
            <svg
              className="w-5 h-5 text-[#8A92A0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search user by name, email, or User ID..."
              className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm font-sans text-white placeholder-[#8A92A0] focus:outline-none focus:border-[#FF1E27] shadow-inner"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && searchTerm.trim().length >= 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#12141C] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-30 max-h-64 overflow-y-auto animate-fadeIn">
              {isLoading ? (
                <div className="py-6 text-center text-[#8A92A0] font-sans text-xs flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
                  <span>Searching users...</span>
                </div>
              ) : !users || users.length === 0 ? (
                <div className="py-6 text-center text-[#8A92A0] font-sans text-xs">
                  No active users match &quot;{searchTerm}&quot;
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="p-3 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-[#0B0C0E] border border-white/15 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-white">
                          {user.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            user.name.slice(0, 2).toUpperCase()
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-heading font-bold text-xs text-white truncate">
                            {user.name}
                          </p>
                          <p className="font-sans text-[11px] text-[#8A92A0] truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/5 text-[#8A92A0]">
                          {user.role}
                        </span>
                        <span className="text-[#FF1E27] text-xs font-bold">Select →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
