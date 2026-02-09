import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Trade } from "@/types/trade";

interface TradeContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id">) => void;
  deleteTrade: (id: string) => void;
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

  const deleteTrade = (id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TradeContext.Provider value={{ trades, addTrade, deleteTrade }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrades = () => {
  const ctx = useContext(TradeContext);
  if (!ctx) throw new Error("useTrades must be used within TradeProvider");
  return ctx;
};
