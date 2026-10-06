"use client";

import React, { useState } from "react";
import { useMyTransactionsQuery } from "../../../../hooks/useTicketHooks";
import { format } from "date-fns";

export default function UserTransactionsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "failed">("all");
  const { data: rawTransactions, isLoading, isError } = useMyTransactionsQuery();

  const transactions = (rawTransactions || []).map((t: any) => ({
    id: t.id,
    transactionId: t.transactionId || `#TRN-${t.id.slice(0, 8)}`,
    date: t.date ? format(new Date(t.date), "dd MMM yyyy, HH:mm") : "N/A",
    description: t.description || "Ticket Purchase",
    amount: t.amount || "£0.00",
    rawAmount: parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0,
    paymentMethod: t.paymentMethod || "CASHFLOWS",
    status: (t.status || "completed").toLowerCase(),
    ticketsCount: t.ticketsCount || 0,
  }));

  const filteredTransactions = transactions.filter((t: any) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  const totalSpent = transactions
    .filter((t: any) => t.status === "completed")
    .reduce((sum: number, t: any) => sum + t.rawAmount, 0);

  const completedCount = transactions.filter((t: any) => t.status === "completed").length;
  const pendingCount = transactions.filter((t: any) => t.status === "pending").length;

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
          Transaction History
        </h1>
        <p className="font-sans text-xs text-[#8A92A0]">
          Review all ticket purchases, invoice receipts, and pending checkout logs.
        </p>
      </div>

      {/* Top Summary Card */}
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Completed Purchases
          </span>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            £{totalSpent.toFixed(2)}
          </p>
          <span className="font-sans text-xs text-[#8A92A0]">
            {completedCount} successful transactions
          </span>
        </div>

        {pendingCount > 0 && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
            <span className="text-xl">⏳</span>
            <div>
              <strong className="font-bold text-white">{pendingCount} order(s) awaiting payment.</strong>
              <div className="text-[11px] text-[#8A92A0] mt-0.5">
                Visit My Tickets to complete checkout before competitions sell out.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            filter === "all"
              ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.5)] border border-[#FF1E27]"
              : "bg-[#12141C] border border-white/10 text-[#8A92A0] hover:text-white"
          }`}
        >
          All ({transactions.length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            filter === "completed"
              ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.5)] border border-[#FF1E27]"
              : "bg-[#12141C] border border-white/10 text-[#8A92A0] hover:text-white"
          }`}
        >
          Completed ({completedCount})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            filter === "pending"
              ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-xs"
              : "bg-[#12141C] border border-white/10 text-[#8A92A0] hover:text-amber-400"
          }`}
        >
          Pending Payment ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("failed")}
          className={`px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            filter === "failed"
              ? "bg-red-500/20 border border-red-500/40 text-red-400 shadow-xs"
              : "bg-[#12141C] border border-white/10 text-[#8A92A0] hover:text-red-400"
          }`}
        >
          Failed
        </button>
      </div>

      {/* Transactions Data Table */}
      <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 overflow-x-auto shadow-2xl backdrop-blur-md">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
            <p className="font-sans text-xs text-[#8A92A0]">Loading transaction records...</p>
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-[#FF1E27] font-sans text-sm">
            Failed to load transactions.
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-[#8A92A0] font-sans text-xs flex flex-col items-center justify-center gap-2">
            <span className="text-3xl">🧾</span>
            <p className="font-heading font-bold text-sm text-white">No transactions found</p>
            <p className="text-[#8A92A0]">When you enter competitions, your payment records will be listed here.</p>
          </div>
        ) : (
          <div className="min-w-[900px] flex flex-col">
            {/* Table Header Row */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-white/10 font-sans text-[11px] font-bold text-[#8A92A0] uppercase tracking-wider">
              <div className="col-span-2 pl-4">Transaction ID</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-1">Amount</div>
              <div className="col-span-2 text-center">Payment Method</div>
              <div className="col-span-1 text-right pr-4">Status</div>
            </div>

            {/* Table Body Rows */}
            <div className="flex flex-col divide-y divide-white/5">
              {filteredTransactions.map((transaction: any) => (
                <div 
                  key={transaction.id} 
                  className="grid grid-cols-12 gap-4 py-4 items-center font-sans hover:bg-white/5 transition-colors rounded-xl"
                >
                  {/* Transaction ID */}
                  <div className="col-span-2 pl-4 font-mono font-bold text-xs text-[#FF1E27] truncate" title={transaction.transactionId}>
                    {transaction.transactionId}
                  </div>

                  {/* Date */}
                  <div className="col-span-2 font-sans font-semibold text-xs text-[#8A92A0]">
                    {transaction.date}
                  </div>

                  {/* Description */}
                  <div className="col-span-4 font-heading font-bold text-xs text-white truncate pr-4" title={transaction.description}>
                    {transaction.description}
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 font-heading font-black text-xs text-white">
                    {transaction.amount}
                  </div>

                  {/* Payment Method */}
                  <div className="col-span-2 text-center font-sans font-semibold text-xs text-[#8A92A0] uppercase">
                    {transaction.paymentMethod}
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex justify-end pr-4">
                    {transaction.status === "completed" && (
                      <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-xs">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Completed</span>
                      </div>
                    )}
                    {transaction.status === "pending" && (
                      <div className="px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 shadow-xs">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Pending</span>
                      </div>
                    )}
                    {transaction.status === "failed" && (
                      <div className="px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 shadow-xs">
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Failed</span>
                      </div>
                    )}
                    {transaction.status !== "completed" && transaction.status !== "pending" && transaction.status !== "failed" && (
                      <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 shadow-xs">
                        <span className="text-[10px] font-bold text-[#8A92A0] uppercase tracking-wider">{transaction.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
