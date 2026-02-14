import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trade } from "@/types/trade";
import { useProfile } from "@/context/ProfileContext";

interface TradeContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id" | "profileId">) => void;
  updateTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  exportTrades: () => void;
  importTrades: (file: File) => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider = ({ children }: { children: ReactNode }) => {
  const { activeProfile } = useProfile();

  const [allTrades, setAllTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem("trades");
    if (!saved) return [];
    const parsed = JSON.parse(saved) as any[];
    return parsed.map((t) => ({
      ...t,
      tp1: t.tp1 ?? t.tp1Hit ?? false,
      tp2: t.tp2 ?? false,
      tp3: t.tp3 ?? false,
      pips: t.pips ?? 0,
      profileId: t.profileId || "",
    }));
  });

  useEffect(() => {
    localStorage.setItem("trades", JSON.stringify(allTrades));
  }, [allTrades]);

  // Assign orphan trades to active profile
  useEffect(() => {
    if (activeProfile) {
      setAllTrades((prev) => {
        const hasOrphans = prev.some((t) => !t.profileId);
        if (hasOrphans) {
          return prev.map((t) => (t.profileId ? t : { ...t, profileId: activeProfile.id }));
        }
        return prev;
      });
    }
  }, [activeProfile?.id]);

  const trades = allTrades.filter((t) => t.profileId === activeProfile?.id);

  const addTrade = (trade: Omit<Trade, "id" | "profileId">) => {
    if (!activeProfile) return;
    setAllTrades((prev) => [...prev, { ...trade, id: crypto.randomUUID(), profileId: activeProfile.id }]);
  };

  const updateTrade = (trade: Trade) => {
    setAllTrades((prev) => prev.map((t) => (t.id === trade.id ? trade : t)));
  };

  const deleteTrade = (id: string) => {
    setAllTrades((prev) => prev.filter((t) => t.id !== id));
  };

  const exportTrades = () => {
    const blob = new Blob([JSON.stringify(trades, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trade (${activeProfile?.name || "unknown"}).json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTrades = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as any[];
        const withProfile = imported.map((t) => ({
          ...t,
          profileId: activeProfile?.id || "",
          tp1: t.tp1 ?? t.tp1Hit ?? false,
          tp2: t.tp2 ?? false,
          tp3: t.tp3 ?? false,
          pips: t.pips ?? 0,
        }));
        setAllTrades((prev) => [...prev, ...withProfile]);
      } catch {
        /* invalid file */
      }
    };
    reader.readAsText(file);
  };

  return (
    <TradeContext.Provider value={{ trades, addTrade, updateTrade, deleteTrade, exportTrades, importTrades }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrades = () => {
  const ctx = useContext(TradeContext);
  if (!ctx) throw new Error("useTrades must be used within TradeProvider");
  return ctx;
};
