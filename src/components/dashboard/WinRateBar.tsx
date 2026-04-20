import { Trade } from "@/types/trade";
import { getWinRate } from "@/lib/analytics";
import { Target } from "lucide-react";

export const WinRateBar = ({ trades }: { trades: Trade[] }) => {
  const wr = getWinRate(trades);
  return (
    <div className="h-full rounded-lg border border-border p-4 bg-card/30 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Win Rate</span>
        <Target className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold tabular-nums">{wr.toFixed(1)}%</p>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-profit transition-all"
            style={{ width: `${Math.min(wr, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
