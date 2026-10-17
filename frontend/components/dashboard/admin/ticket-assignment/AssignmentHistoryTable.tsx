"use client";

import React, { useState } from "react";
import { useAdminAssignmentHistory } from "@/hooks/useAdminTicketAssignment";
import { format } from "date-fns";

export default function AssignmentHistoryTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data: response, isLoading, isError } = useAdminAssignmentHistory({
    page,
    limit,
    search: search.trim() || undefined,
  });

  const history = response?.history || [];
  const totalPages = response?.totalPages || 1;

  return (
    <div className="flex flex-col gap-5 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
            Manual Allocation History &amp; Audit Trail
          </h3>
          <p className="font-sans text-xs text-[#8A92A0]">
            Complete record of all ADMIN_MANUAL ticket distributions, timestamps, and accounting values
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg
            className="w-4 h-4 text-[#8A92A0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by order ID, user, or notes..."
            className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-white placeholder-[#8A92A0] focus:outline-none focus:border-[#FF1E27]"
          />
        </div>
      </div>

      {/* History Data Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 font-sans text-[10px] font-bold text-[#8A92A0] uppercase tracking-wider">
              <th className="py-3 px-4 w-[14%]">ORDER / REF ID</th>
              <th className="py-3 px-4 w-[14%]">DATE</th>
              <th className="py-3 px-4 w-[18%]">RECIPIENT</th>
              <th className="py-3 px-4 w-[18%]">COMPETITION</th>
              <th className="py-3 px-4 w-[14%]">ALLOCATED TICKETS</th>
              <th className="py-3 px-4 w-[10%] text-center">TOTAL VALUE</th>
              <th className="py-3 px-4 w-[12%] text-center">CHANNEL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#8A92A0]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
                    <span>Loading assignment records...</span>
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-rose-400">
                  Failed to load manual assignment history.
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#8A92A0]">
                  No manual ticket assignments found.
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  {/* Order / Ref ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-xs text-[#FF1E27] truncate block max-w-[130px]" title={item.gatewayTransactionId}>
                      {item.gatewayTransactionId}
                    </span>
                    {item.adminNotes && (
                      <span className="text-[10px] text-[#8A92A0] italic truncate block max-w-[140px]" title={item.adminNotes}>
                        &quot;{item.adminNotes}&quot;
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-[#8A92A0] font-semibold">
                    {format(new Date(item.date), "dd MMM yyyy, HH:mm")}
                  </td>

                  {/* Recipient */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#0B0C0E] border border-white/15 overflow-hidden flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {item.recipient.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.recipient.avatarUrl}
                            alt={item.recipient.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.recipient.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-heading font-bold text-white block truncate">
                          {item.recipient.name}
                        </span>
                        <span className="text-[11px] text-[#8A92A0] block truncate">
                          {item.recipient.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Competition */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {item.competition?.mainImage && (
                        <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.competition.mainImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <span className="font-heading font-bold text-white truncate max-w-[170px]" title={item.competition?.title}>
                        {item.competition?.title || "Unknown Competition"}
                      </span>
                    </div>
                  </td>

                  {/* Allocated Tickets */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-white/10 text-white">
                          {item.quantity} {item.quantity === 1 ? "Ticket" : "Tickets"}
                        </span>
                        {item.instantWinsCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            ⚡ {item.instantWinsCount} Win(s)
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[10px] text-[#8A92A0] truncate max-w-[150px]">
                        {item.assignedNumbers.map((n) => `#${n}`).join(", ")}
                      </span>
                    </div>
                  </td>

                  {/* Total Value */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-heading font-black text-sm text-emerald-400">
                      £{item.totalValue.toFixed(2)}
                    </span>
                  </td>

                  {/* Channel Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-bold text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.15)] whitespace-nowrap">
                      <span>🛡️</span>
                      <span>ADMIN MANUAL</span>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-sans text-[#8A92A0]">
          <span>
            Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-[#0B0C0E] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            >
              ← Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-[#0B0C0E] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
