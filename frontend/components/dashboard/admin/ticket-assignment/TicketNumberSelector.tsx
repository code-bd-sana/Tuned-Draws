"use client";

import React, { useState, useMemo } from "react";
import { CompetitionDetails } from "@/services/admin-ticket-assignment.service";

interface TicketNumberSelectorProps {
  details: CompetitionDetails;
  mode: "specific" | "random";
  onModeChange: (mode: "specific" | "random") => void;
  selectedNumbers: number[];
  onNumbersChange: (numbers: number[]) => void;
  randomQuantity: number;
  onRandomQuantityChange: (qty: number) => void;
}

type GridFilter = "all" | "available" | "instant" | "sold";

const TILES_PER_PAGE = 100;

export default function TicketNumberSelector({
  details,
  mode,
  onModeChange,
  selectedNumbers,
  onNumbersChange,
  randomQuantity,
  onRandomQuantityChange,
}: TicketNumberSelectorProps) {
  const [gridFilter, setGridFilter] = useState<GridFilter>("all");
  const [gridPage, setGridPage] = useState(1);
  const [numberSearch, setNumberSearch] = useState("");
  const [commaInput, setCommaInput] = useState("");
  const [hoveredSoldTile, setHoveredSoldTile] = useState<{
    num: number;
    buyerName: string;
    buyerEmail: string;
    date: string;
    gateway: string;
  } | null>(null);

  const totalTickets = details.stats.totalTickets;
  const pricePerTicket = details.stats.pricePerTicket;

  // Build lookup maps for O(1) checks
  const soldMap = useMemo(() => {
    const map = new Map<number, (typeof details.soldTickets)[0]>();
    (details.soldTickets || []).forEach((t) => map.set(t.ticketNumber, t));
    return map;
  }, [details.soldTickets]);

  const instantWinMap = useMemo(() => {
    const map = new Map<number, (typeof details.instantWins)[0]>();
    (details.instantWins || []).forEach((iw) => map.set(iw.ticketNumber, iw));
    return map;
  }, [details.instantWins]);

  const selectedSet = useMemo(() => new Set(selectedNumbers), [selectedNumbers]);

  // Handle manual comma input submission/blur
  const handleCommaInputBlur = () => {
    if (!commaInput.trim()) return;
    const parts = commaInput
      .split(/[,\s]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= totalTickets);

    const validNew = parts.filter((n) => !soldMap.has(n));
    const merged = Array.from(new Set([...selectedNumbers, ...validNew])).sort((a, b) => a - b);
    onNumbersChange(merged);
    setCommaInput("");
  };

  const handleToggleNumber = (num: number) => {
    if (soldMap.has(num)) return; // Sold numbers cannot be selected
    if (selectedSet.has(num)) {
      onNumbersChange(selectedNumbers.filter((n) => n !== num));
    } else {
      onNumbersChange([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const handleClearSelection = () => {
    onNumbersChange([]);
  };

  // Filtered tiles array for visual grid
  const allFilteredTiles = useMemo(() => {
    const tiles: number[] = [];
    const searchNum = parseInt(numberSearch.trim(), 10);

    for (let i = 1; i <= totalTickets; i++) {
      if (!isNaN(searchNum) && i !== searchNum) continue;

      const isSold = soldMap.has(i);
      const isInstant = instantWinMap.has(i);

      if (gridFilter === "available" && isSold) continue;
      if (gridFilter === "sold" && !isSold) continue;
      if (gridFilter === "instant" && !isInstant) continue;

      tiles.push(i);
    }
    return tiles;
  }, [totalTickets, gridFilter, numberSearch, soldMap, instantWinMap]);

  const totalGridPages = Math.max(1, Math.ceil(allFilteredTiles.length / TILES_PER_PAGE));
  const currentPage = Math.min(gridPage, totalGridPages);
  const paginatedTiles = allFilteredTiles.slice(
    (currentPage - 1) * TILES_PER_PAGE,
    currentPage * TILES_PER_PAGE,
  );

  const selectedInstantWinsCount = useMemo(() => {
    return selectedNumbers.filter((num) => instantWinMap.has(num) && !instantWinMap.get(num)?.isClaimed).length;
  }, [selectedNumbers, instantWinMap]);

  const totalPrice = (
    mode === "specific"
      ? selectedNumbers.length * pricePerTicket
      : randomQuantity * pricePerTicket
  );

  return (
    <div className="flex flex-col gap-5 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] font-bold text-sm shadow-xs">
            2
          </div>
          <div>
            <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
              Ticket Number Selection
            </h3>
            <p className="font-sans text-xs text-[#8A92A0]">
              Select exact ticket numbers or request a random available quantity
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-[#0B0C0E] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => onModeChange("specific")}
            className={`px-4 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              mode === "specific"
                ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            }`}
          >
            Mode A: Specific Numbers
          </button>
          <button
            type="button"
            onClick={() => onModeChange("random")}
            className={`px-4 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              mode === "random"
                ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            }`}
          >
            Mode B: Random Quantity
          </button>
        </div>
      </div>

      {mode === "specific" ? (
        <div className="flex flex-col gap-4">
          {/* Direct Comma Input Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#0B0C0E] border border-white/10 rounded-xl p-3">
            <div className="flex-1 flex items-center gap-2">
              <span className="text-[#8A92A0] text-sm shrink-0">⌨️</span>
              <input
                type="text"
                value={commaInput}
                onChange={(e) => setCommaInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCommaInputBlur();
                  }
                }}
                placeholder="Type or paste comma-separated numbers (e.g. 5, 12, 42) & press Enter..."
                className="w-full bg-transparent text-xs font-sans text-white placeholder-[#8A92A0] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleCommaInputBlur}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
            >
              Add Numbers
            </button>
          </div>

          {/* Interactive Visual Grid Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase mr-1">Filter:</span>
              <button
                type="button"
                onClick={() => { setGridFilter("all"); setGridPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  gridFilter === "all"
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-[#0B0C0E] text-[#8A92A0] hover:text-white border border-white/5"
                }`}
              >
                Show All ({totalTickets})
              </button>
              <button
                type="button"
                onClick={() => { setGridFilter("available"); setGridPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  gridFilter === "available"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-[#0B0C0E] text-[#8A92A0] hover:text-emerald-400 border border-white/5"
                }`}
              >
                Available Only ({details.stats.remainingTickets})
              </button>
              <button
                type="button"
                onClick={() => { setGridFilter("instant"); setGridPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  gridFilter === "instant"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-[#0B0C0E] text-[#8A92A0] hover:text-amber-400 border border-white/5"
                }`}
              >
                Instant Wins Only ({details.instantWins.length})
              </button>
              <button
                type="button"
                onClick={() => { setGridFilter("sold"); setGridPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-bold transition-all cursor-pointer ${
                  gridFilter === "sold"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                    : "bg-[#0B0C0E] text-[#8A92A0] hover:text-rose-400 border border-white/5"
                }`}
              >
                Sold Only ({details.stats.ticketsSold})
              </button>
            </div>

            {/* Quick jump to number */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={totalTickets}
                value={numberSearch}
                onChange={(e) => {
                  setNumberSearch(e.target.value);
                  setGridPage(1);
                }}
                placeholder="Jump to #..."
                className="w-28 bg-[#0B0C0E] border border-white/10 rounded-lg px-2.5 py-1 text-xs font-mono text-white placeholder-[#8A92A0] focus:outline-none focus:border-[#FF1E27]"
              />
            </div>
          </div>

          {/* Grid Container */}
          <div className="relative border border-white/10 bg-[#0B0C0E]/90 rounded-xl p-4 min-h-[220px]">
            {paginatedTiles.length === 0 ? (
              <div className="py-12 text-center text-[#8A92A0] font-sans text-xs flex flex-col items-center justify-center gap-1">
                <span>No ticket tiles match the active filter.</span>
              </div>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-20 gap-1.5">
                {paginatedTiles.map((num) => {
                  const isSold = soldMap.has(num);
                  const isSelected = selectedSet.has(num);
                  const instantWin = instantWinMap.get(num);
                  const isInstant = Boolean(instantWin);
                  const soldInfo = soldMap.get(num);

                  return (
                    <div
                      key={num}
                      onMouseEnter={() => {
                        if (isSold && soldInfo) {
                          setHoveredSoldTile({
                            num,
                            buyerName: soldInfo.buyerName,
                            buyerEmail: soldInfo.buyerEmail,
                            date: new Date(soldInfo.purchaseDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }),
                            gateway: soldInfo.paymentGateway,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredSoldTile(null)}
                      onClick={() => handleToggleNumber(num)}
                      className={`h-11 rounded-lg flex flex-col items-center justify-center relative select-none transition-all cursor-pointer font-mono text-xs font-bold ${
                        isSelected
                          ? "bg-[#FF1E27] text-white border-2 border-white shadow-[0_0_12px_rgba(255,30,39,0.8)] z-10 scale-105"
                          : isSold
                          ? "bg-white/5 text-[#8A92A0]/40 border border-white/5 line-through cursor-not-allowed opacity-60"
                          : isInstant
                          ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-2 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                          : "bg-[#141822] hover:bg-[#1E2333] text-white/90 border border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span>#{num}</span>

                      {/* Instant win badge / icon */}
                      {isInstant && !isSelected && (
                        <span className="text-[9px] text-amber-400 leading-none">⚡</span>
                      )}

                      {/* Selected checkmark */}
                      {isSelected && (
                        <span className="text-[9px] text-white font-black leading-none">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Hover Tooltip for Sold Tile */}
            {hoveredSoldTile && (
              <div className="absolute bottom-3 left-4 right-4 sm:right-auto sm:w-80 bg-[#181B26] border border-white/20 rounded-xl p-3 shadow-2xl z-20 pointer-events-none animate-fadeIn text-xs font-sans">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-1.5">
                  <span className="font-mono font-black text-rose-400">
                    Ticket #{hoveredSoldTile.num} (SOLD)
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-[#8A92A0]">
                    {hoveredSoldTile.gateway}
                  </span>
                </div>
                <div className="text-white font-semibold truncate">
                  Buyer: {hoveredSoldTile.buyerName}
                </div>
                <div className="text-[#8A92A0] text-[11px] truncate">
                  {hoveredSoldTile.buyerEmail}
                </div>
                <div className="text-[#8A92A0] text-[10px] mt-1">
                  Purchased on {hoveredSoldTile.date}
                </div>
              </div>
            )}
          </div>

          {/* Pagination controls for grid */}
          {totalGridPages > 1 && (
            <div className="flex items-center justify-between gap-3 text-xs font-sans text-[#8A92A0] pt-1">
              <span>
                Showing {((currentPage - 1) * TILES_PER_PAGE) + 1} -{" "}
                {Math.min(currentPage * TILES_PER_PAGE, allFilteredTiles.length)} of {allFilteredTiles.length} tiles
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setGridPage((p) => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded bg-[#0B0C0E] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
                >
                  ← Prev
                </button>
                <span className="px-2 text-white font-bold">
                  {currentPage} / {totalGridPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalGridPages}
                  onClick={() => setGridPage((p) => Math.min(totalGridPages, p + 1))}
                  className="px-2.5 py-1 rounded bg-[#0B0C0E] border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mode B: Random Quantity */
        <div className="flex flex-col gap-5 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0C0E] border border-white/10 rounded-xl p-5">
            <div>
              <h4 className="font-heading font-black text-white text-base">
                Random Ticket Quantity
              </h4>
              <p className="font-sans text-xs text-[#8A92A0] mt-0.5">
                System will securely allocate available ticket numbers without collisions
              </p>
            </div>

            {/* Stepper Input */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onRandomQuantityChange(Math.max(1, randomQuantity - 1))}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-bold flex items-center justify-center cursor-pointer transition-all active:scale-95"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                max={details.stats.remainingTickets}
                value={randomQuantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) {
                    onRandomQuantityChange(
                      Math.max(1, Math.min(details.stats.remainingTickets, val)),
                    );
                  }
                }}
                className="w-20 h-10 rounded-xl bg-[#141822] border border-white/20 text-center font-mono font-bold text-white text-base focus:outline-none focus:border-[#FF1E27]"
              />
              <button
                type="button"
                onClick={() =>
                  onRandomQuantityChange(
                    Math.min(details.stats.remainingTickets, randomQuantity + 1),
                  )
                }
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-bold flex items-center justify-center cursor-pointer transition-all active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs text-[#8A92A0] mr-2">Quick Presets:</span>
            {[1, 5, 10, 25, 50].map((preset) => {
              const disabled = preset > details.stats.remainingTickets;
              return (
                <button
                  key={preset}
                  type="button"
                  disabled={disabled}
                  onClick={() => onRandomQuantityChange(preset)}
                  className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    randomQuantity === preset
                      ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.5)] border border-[#FF1E27]"
                      : disabled
                      ? "bg-white/5 text-[#8A92A0]/40 border border-white/5 cursor-not-allowed"
                      : "bg-[#0B0C0E] hover:bg-white/10 text-[#8A92A0] hover:text-white border border-white/10"
                  }`}
                >
                  +{preset} Tickets
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Numbers Chip Bar */}
      <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-xs text-[#8A92A0]">Selected:</span>
            <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-[#FF1E27]/20 border border-[#FF1E27]/40 text-white">
              {mode === "specific" ? selectedNumbers.length : randomQuantity} Ticket(s)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-sans text-xs text-[#8A92A0]">Value:</span>
            <span className="font-heading font-black text-sm text-emerald-400">
              £{totalPrice.toFixed(2)}
            </span>
          </div>

          {mode === "specific" && selectedInstantWinsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              ⚡ {selectedInstantWinsCount} Instant Win(s) included!
            </span>
          )}
        </div>

        {mode === "specific" && selectedNumbers.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-sans font-bold cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Preview chips for specific numbers */}
      {mode === "specific" && selectedNumbers.length > 0 && (
        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
          {selectedNumbers.map((num) => {
            const isInstant = instantWinMap.has(num);
            return (
              <span
                key={num}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-xs font-bold ${
                  isInstant
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-[#181B26] text-white border border-white/15"
                }`}
              >
                #{num}
                {isInstant && <span className="text-[10px]">⚡</span>}
                <button
                  type="button"
                  onClick={() => handleToggleNumber(num)}
                  className="hover:text-rose-400 ml-0.5 cursor-pointer"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
