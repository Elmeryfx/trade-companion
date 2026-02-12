import { Trade } from "@/types/trade";
import { getWinRate, getTotalPnl, formatCurrency } from "@/lib/analytics";
import { Target, DollarSign } from "lucide-react";

export const StatsCards = ({ trades }: { trades: Trade[] }) => {
  const stats = [
    { label: "Win Rate", value: `${getWinRate(trades).toFixed(1)}%`, icon: Target },
    { label: "Total P&L", value: formatCurrency(getTotalPnl(trades)), icon: DollarSign, colored: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-border p-4 flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.colored ? (getTotalPnl(trades) >= 0 ? "text-profit" : "text-loss") : "text-primary"}`}>
              {s.value}
            </p>
          </div>
          <s.icon className="h-5 w-5 text-primary/60" />
        </div>
      ))}
    </div>
  );
};
