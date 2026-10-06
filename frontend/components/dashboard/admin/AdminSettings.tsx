"use client";

import React from "react";

export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[800px] animate-fadeIn text-white">
      
      {/* Profile Settings */}
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">Profile Details</h2>
          <p className="font-sans text-xs text-[#8A92A0] mt-1">Update your administrative credentials and profile details.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#D1D5DB] uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              defaultValue="Admin Manager" 
              className="w-full h-11 bg-[#1A1D27] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#D1D5DB] uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              defaultValue="admin@tuneddraws.com" 
              className="w-full h-11 bg-[#1A1D27] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="h-10 px-6 rounded-xl bg-[#FF1E27] hover:bg-[#B3000C] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">Change Password</h2>
          <p className="font-sans text-xs text-[#8A92A0] mt-1">Ensure your account is using a long, random password to stay secure.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#D1D5DB] uppercase tracking-wider">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#1A1D27] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#D1D5DB] uppercase tracking-wider">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#1A1D27] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#D1D5DB] uppercase tracking-wider">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#1A1D27] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#FF1E27]/50 focus:ring-1 focus:ring-[#FF1E27] transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="h-10 px-6 rounded-xl bg-transparent border border-white/20 hover:border-[#FF1E27] hover:text-[#FF1E27] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
            Update Password
          </button>
        </div>
      </div>
      
    </div>
  );
}
