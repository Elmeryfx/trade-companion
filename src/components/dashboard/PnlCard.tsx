import { Trade } from "@/types/trade";
import { getTotalPnl, formatCurrency } from "@/lib/analytics";
import { DollarSign } from "lucide-react";

export const PnlCard = ({ trades }: { trades: Trade[] }) => {
  const pnl = getTotalPnl(trades);
  return (
    <div className="h-full rounded-lg border border-border p-4 flex flex-col justify-between bg-card/30">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Total P&L</p>
        <DollarSign className="h-4 w-4 text-primary/60" />
      </div>
      <div>
        <p className={`text-3xl font-bold ${pnl >= 0 ? "text-profit" : "text-loss"}`}>
          {formatCurrency(pnl)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{trades.length} trades</p>
      </div>
    </div>
  );
};
