import { Trade } from "@/types/trade";
import { TrendingDown, TrendingUp, ArrowUpDown } from "lucide-react";

export const RiskCards = ({ trades }: { trades: Trade[] }) => {
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl < 0);
  const biggestWinner = wins.length ? Math.max(...wins.map((t) => t.pnl)) : 0;
  const biggestLoser = losses.length ? Math.min(...losses.map((t) => t.pnl)) : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
  const avgRR = trades.length ? trades.reduce((s, t) => s + t.rr, 0) / trades.length : 0;

  const cards = [
    { label: "Avg Win", value: `€${avgWin.toFixed(2)}`, icon: TrendingUp, color: "text-profit" },
    { label: "Avg Loss", value: `€${avgLoss.toFixed(2)}`, icon: TrendingDown, color: "text-loss" },
    { label: "Risk/Reward", value: avgRR.toFixed(2), icon: ArrowUpDown, color: "text-primary" },
    { label: "Biggest Winner", value: `€${biggestWinner.toFixed(2)}`, icon: TrendingUp, color: "text-profit" },
    { label: "Biggest Loser", value: `€${biggestLoser.toFixed(2)}`, icon: TrendingDown, color: "text-loss" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-border p-4 flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{c.label}</p>
            <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
          <c.icon className="h-5 w-5 text-primary/60" />
        </div>
      ))}
    </div>
  );
};
