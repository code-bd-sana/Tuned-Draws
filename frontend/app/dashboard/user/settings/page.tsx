import React from "react";

export default function UserSettingsPage() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 lg:p-8 max-w-[840px] mx-auto w-full animate-fadeIn">
      {/* Privacy Card */}
      <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl backdrop-blur-md">
        <h2 className="font-heading font-black text-lg text-white uppercase tracking-tight">
          Privacy Settings
        </h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-sm text-white">Show my name on public Winners page</span>
              <span className="font-sans text-xs text-[#8A92A0]">Your display name will be visible in the Tuned Draws Winners gallery</span>
            </div>
            {/* Active Toggle */}
            <div className="w-11 h-6 bg-[#FF1E27] rounded-full relative cursor-pointer shrink-0 transition-colors shadow-[0_0_10px_rgba(255,30,39,0.4)]">
              <div className="absolute top-[3px] right-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-md transition-transform" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-sans font-bold text-sm text-white">Allow verified garage/host messages</span>
              <span className="font-sans text-xs text-[#8A92A0]">Verified performance garages can contact you about your draw entries</span>
            </div>
            {/* Inactive Toggle */}
            <div className="w-11 h-6 bg-[#0B0C0E] border border-white/20 rounded-full relative cursor-pointer shrink-0 transition-colors">
              <div className="absolute top-[2px] left-[3px] w-[18px] h-[18px] bg-[#8A92A0] rounded-full shadow-md transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl backdrop-blur-md">
        <h2 className="font-heading font-black text-lg text-white uppercase tracking-tight">
          Security &amp; Sessions
        </h2>
        
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <span className="font-sans font-bold text-sm text-white">Two-Factor Authentication</span>
            <span className="font-sans text-xs text-[#8A92A0]">Add an extra verification layer to secure your tickets and wallet</span>
          </div>
          {/* Inactive Toggle */}
          <div className="w-11 h-6 bg-[#0B0C0E] border border-white/20 rounded-full relative cursor-pointer shrink-0 transition-colors">
            <div className="absolute top-[2px] left-[3px] w-[18px] h-[18px] bg-[#8A92A0] rounded-full shadow-md transition-transform" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase tracking-wider">
            Active Sessions
          </span>
          
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-bold text-sm text-white">MacBook Pro — Chrome</span>
              <span className="font-sans text-xs text-emerald-400">London, UK • Current active session</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
              Online
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="font-sans font-bold text-sm text-white">iPhone 15 — Safari Mobile</span>
              <span className="font-sans text-xs text-[#8A92A0]">London, UK • Last active 2 hours ago</span>
            </div>
            <button className="font-sans font-bold text-xs text-[#FF1E27] hover:underline cursor-pointer">
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Card */}
      <div className="w-full bg-[#12141C] border border-[#FF1E27]/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col gap-1">
          <span className="font-heading font-black text-base text-[#FF1E27] uppercase tracking-tight">Delete Account</span>
          <span className="font-sans text-xs text-[#8A92A0]">This action permanently revokes all entries, prize history, and data.</span>
        </div>
        
        <button className="px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-heading font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer">
          Delete Account
        </button>
      </div>

    </div>
  );
}
