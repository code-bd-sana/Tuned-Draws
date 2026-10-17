"use client";

import React, { useState } from "react";
import CompetitionSelector from "@/components/dashboard/admin/ticket-assignment/CompetitionSelector";
import InstantWinVisualizer from "@/components/dashboard/admin/ticket-assignment/InstantWinVisualizer";
import TicketNumberSelector from "@/components/dashboard/admin/ticket-assignment/TicketNumberSelector";
import RecipientUserSearch from "@/components/dashboard/admin/ticket-assignment/RecipientUserSearch";
import AccountingSummaryBox from "@/components/dashboard/admin/ticket-assignment/AccountingSummaryBox";
import AssignmentConfirmationModal from "@/components/dashboard/admin/ticket-assignment/AssignmentConfirmationModal";
import AssignmentSuccessModal from "@/components/dashboard/admin/ticket-assignment/AssignmentSuccessModal";
import AssignmentHistoryTable from "@/components/dashboard/admin/ticket-assignment/AssignmentHistoryTable";
import {
  AssignedCompetition,
  AssignmentResult,
  SearchedUser,
} from "@/services/admin-ticket-assignment.service";
import {
  useAdminAssignmentCompetitionDetails,
  useAssignTicketsMutation,
} from "@/hooks/useAdminTicketAssignment";
import { toast } from "sonner";

export default function AdminTicketAssignmentPage() {
  const [activeTab, setActiveTab] = useState<"assign" | "history">("assign");

  // Selection states
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<SearchedUser | null>(null);
  const [mode, setMode] = useState<"specific" | "random">("specific");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [randomQuantity, setRandomQuantity] = useState<number>(1);
  const [adminNotes, setAdminNotes] = useState<string>("");

  // Modals
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [assignmentResult, setAssignmentResult] = useState<AssignmentResult | null>(null);

  // Queries & Mutations
  const {
    data: competitionDetails,
    isLoading: isDetailsLoading,
  } = useAdminAssignmentCompetitionDetails(selectedCompetitionId);

  const assignMutation = useAssignTicketsMutation();

  const handleSelectCompetition = (comp: AssignedCompetition | null) => {
    setSelectedCompetitionId(comp?.id || null);
    setSelectedNumbers([]);
    setRandomQuantity(1);
  };

  const handleToggleTicketNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handleExecuteAssignment = async () => {
    if (!selectedCompetitionId || !selectedRecipient) {
      toast.error("Please ensure competition and recipient are selected.");
      return;
    }

    try {
      const payload = {
        raffleId: selectedCompetitionId,
        userId: selectedRecipient.id,
        ticketNumbers: mode === "specific" ? selectedNumbers : undefined,
        quantity: mode === "random" ? randomQuantity : undefined,
        adminNotes: adminNotes.trim() || undefined,
      };

      const result = await assignMutation.mutateAsync(payload);
      setAssignmentResult(result);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);

      // Reset selection state
      setSelectedNumbers([]);
      setRandomQuantity(1);
      setAdminNotes("");
      toast.success("Tickets successfully assigned!");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to assign tickets. Please check constraints.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] font-bold text-lg shadow-xs">
              🛡️
            </div>
            <h1 className="font-heading font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
              Admin Manual Ticket Assignment
            </h1>
          </div>
          <p className="font-sans text-xs text-[#8A92A0]">
            Directly allocate tickets to any user with 100% financial integrity, host wallet crediting, and instant win prize automation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#12141C] p-1.5 rounded-xl border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab("assign")}
            className={`px-5 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "assign"
                ? "bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            }`}
          >
            <span>🎟️</span>
            <span>Assign Tickets</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "history"
                ? "bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            }`}
          >
            <span>📜</span>
            <span>Assignment History</span>
          </button>
        </div>
      </div>

      {activeTab === "assign" ? (
        <div className="flex flex-col gap-6">
          {/* Step 1 - Competition Selection */}
          <CompetitionSelector
            selectedCompetitionId={selectedCompetitionId}
            onSelectCompetition={handleSelectCompetition}
          />

          {isDetailsLoading && selectedCompetitionId && (
            <div className="py-12 flex flex-col items-center justify-center gap-2 bg-[#12141C] border border-white/10 rounded-2xl">
              <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
              <p className="font-sans text-xs text-[#8A92A0]">
                Loading competition grid and instant win data...
              </p>
            </div>
          )}

          {competitionDetails && (
            <>
              {/* Step 2 - Instant Win Visualizer */}
              <InstantWinVisualizer
                details={competitionDetails}
                selectedTicketNumbers={selectedNumbers}
                onToggleTicketNumber={handleToggleTicketNumber}
              />

              {/* Step 3 - Ticket Number Selection */}
              <TicketNumberSelector
                details={competitionDetails}
                mode={mode}
                onModeChange={setMode}
                selectedNumbers={selectedNumbers}
                onNumbersChange={setSelectedNumbers}
                randomQuantity={randomQuantity}
                onRandomQuantityChange={setRandomQuantity}
              />

              {/* Step 4 - Recipient User Search */}
              <RecipientUserSearch
                selectedUser={selectedRecipient}
                onSelectUser={setSelectedRecipient}
              />

              {/* Step 5 - Accounting Breakdown & Action */}
              <AccountingSummaryBox
                competition={competitionDetails}
                recipient={selectedRecipient}
                mode={mode}
                ticketNumbers={selectedNumbers}
                randomQuantity={randomQuantity}
                adminNotes={adminNotes}
                onAdminNotesChange={setAdminNotes}
                onOpenConfirmation={() => setIsConfirmModalOpen(true)}
                isSubmitting={assignMutation.isPending}
              />
            </>
          )}

          {/* Confirmation Modal */}
          <AssignmentConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleExecuteAssignment}
            isLoading={assignMutation.isPending}
            competition={competitionDetails || null}
            recipient={selectedRecipient}
            mode={mode}
            ticketNumbers={selectedNumbers}
            randomQuantity={randomQuantity}
            adminNotes={adminNotes}
          />

          {/* Success Modal */}
          <AssignmentSuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
            result={assignmentResult}
          />
        </div>
      ) : (
        /* Tab 2 - Assignment History */
        <AssignmentHistoryTable />
      )}
    </div>
  );
}
