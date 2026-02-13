import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trade } from "@/types/trade";

interface TradeContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id">) => void;
  updateTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  exportTrades: () => void;
  importTrades: (file: File) => void;
}

const TradeContext = createContext<TradeContextType | undefined>(undefined);

export const TradeProvider = ({ children }: { children: ReactNode }) => {
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem("trades");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("trades", JSON.stringify(trades));
  }, [trades]);

  const addTrade = (trade: Omit<Trade, "id">) => {
    setTrades((prev) => [...prev, { ...trade, id: crypto.randomUUID() }]);
  };

  const updateTrade = (trade: Trade) => {
    setTrades((prev) => prev.map((t) => (t.id === trade.id ? trade : t)));
  };

  const deleteTrade = (id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  };

  const exportTrades = () => {
    const blob = new Blob([JSON.stringify(trades, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trades-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importTrades = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as Trade[];
        setTrades((prev) => [...prev, ...imported]);
      } catch { /* invalid file */ }
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
