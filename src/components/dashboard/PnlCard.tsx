import { Trade } from "@/types/trade";
import { getTotalPnl } from "@/lib/analytics";
import { TrendingUp } from "lucide-react";

export const PnlCard = ({ trades }: { trades: Trade[] }) => {
  const pnl = getTotalPnl(trades);
  const formatted = pnl.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div className="h-full rounded-lg border border-border p-4 bg-card/30 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total P&L</span>
        <TrendingUp className={`h-3.5 w-3.5 ${pnl >= 0 ? "text-profit" : "text-loss"}`} />
      </div>
      <p className={`text-3xl font-bold tabular-nums ${pnl >= 0 ? "text-foreground" : "text-loss"}`}>
        ${formatted}
      </p>
    </div>
  );
};
