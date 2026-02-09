import { Trade } from "@/types/trade";

export const getWinRate = (trades: Trade[]) => {
  if (!trades.length) return 0;
  return (trades.filter((t) => t.result === "WIN").length / trades.length) * 100;
};

export const getTotalPnl = (trades: Trade[]) =>
  trades.reduce((sum, t) => sum + t.pnl, 0);

export const getProfitFactor = (trades: Trade[]) => {
  const wins = trades.filter((t) => t.pnl > 0).reduce((s, t) => s + t.pnl, 0);
  const losses = Math.abs(trades.filter((t) => t.pnl < 0).reduce((s, t) => s + t.pnl, 0));
  return losses === 0 ? wins : parseFloat((wins / losses).toFixed(2));
};

export const getReturns = (trades: Trade[], startingBalance = 10000) => {
  const pnl = getTotalPnl(trades);
  return parseFloat(((pnl / startingBalance) * 100).toFixed(1));
};

export const formatCurrency = (value: number) => {
  if (Math.abs(value) >= 1000) return `€${(value / 1000).toFixed(1)}K`;
  return `€${value.toFixed(0)}`;
};

export const getDailyPnl = (trades: Trade[]) => {
  const map: Record<string, number> = {};
  trades.forEach((t) => {
    map[t.date] = (map[t.date] || 0) + t.pnl;
  });
  return map;
};

export const getStrategyPerformance = (trades: Trade[]) => {
  const map: Record<string, number> = {};
  trades.forEach((t) => {
    map[t.strategy] = (map[t.strategy] || 0) + t.pnl;
  });
  return Object.entries(map).map(([name, pnl]) => ({ name, pnl }));
};

export const getAccountGrowth = (trades: Trade[], startingBalance = 10000) => {
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date));
  let balance = startingBalance;
  const data = [{ date: "Start", balance: startingBalance }];
  sorted.forEach((t) => {
    balance += t.pnl;
    data.push({ date: t.date, balance });
  });
  return data;
};
