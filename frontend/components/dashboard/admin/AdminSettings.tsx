"use client";

import React from "react";

export default function AdminSettings() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[800px] animate-fadeIn text-white">
      
      {/* Profile Settings */}
      <div className="bg-[#211C18] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">Profile Details</h2>
          <p className="font-sans text-xs text-[#B6AA9C] mt-1">Update your administrative credentials and profile details.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#E5DCCD] uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              defaultValue="Admin Manager" 
              className="w-full h-11 bg-[#302820] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#D4A863]/50 focus:ring-1 focus:ring-[#D4A863] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#E5DCCD] uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              defaultValue="info@tuneddraws.com" 
              className="w-full h-11 bg-[#302820] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#D4A863]/50 focus:ring-1 focus:ring-[#D4A863] transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="h-10 px-6 rounded-xl bg-[#94632F] hover:bg-[#9B6A2F] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-[#211C18] border border-white/10 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
        <div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">Change Password</h2>
          <p className="font-sans text-xs text-[#B6AA9C] mt-1">Ensure your account is using a long, random password to stay secure.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#E5DCCD] uppercase tracking-wider">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#302820] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#D4A863]/50 focus:ring-1 focus:ring-[#D4A863] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#E5DCCD] uppercase tracking-wider">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#302820] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#D4A863]/50 focus:ring-1 focus:ring-[#D4A863] transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-xs text-[#E5DCCD] uppercase tracking-wider">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-[#302820] border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-[#D4A863]/50 focus:ring-1 focus:ring-[#D4A863] transition-all"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <button className="h-10 px-6 rounded-xl bg-transparent border border-white/20 hover:border-[#D4A863] hover:text-[#D4A863] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
            Update Password
          </button>
        </div>
      </div>
      
    </div>
  );
}
