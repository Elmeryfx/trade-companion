import { Trade } from "@/types/trade";
import { Download } from "lucide-react";
import { useTrades } from "@/context/TradeContext";

export const RRRatioCard = ({ trades }: { trades: Trade[] }) => {
  const { exportTrades } = useTrades();
  const avgRR = trades.length ? trades.reduce((s, t) => s + t.rr, 0) / trades.length : 0;
  const avgPnl = trades.length ? trades.reduce((s, t) => s + t.pnl, 0) / trades.length : 0;

  return (
    <div className="h-full rounded-lg border border-border p-5 bg-card/30 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">RR Ratio</span>
          <span className="text-base font-semibold tabular-nums">1 : {avgRR.toFixed(2)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Avg. P/L</span>
          <span className={`text-base font-semibold tabular-nums ${avgPnl >= 0 ? "text-profit" : "text-loss"}`}>
            {avgPnl >= 0 ? "+" : ""}${avgPnl.toFixed(0)}
          </span>
        </div>
      </div>
      <button
        onClick={exportTrades}
        className="w-full rounded-md border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 flex items-center justify-center gap-2"
      >
        <Download className="h-3.5 w-3.5" /> Export
      </button>
    </div>
  );
};
