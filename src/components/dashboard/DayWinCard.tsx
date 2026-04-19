import { Trade } from "@/types/trade";
import { getWinRate } from "@/lib/analytics";
import { Target } from "lucide-react";

export const DayWinCard = ({ trades }: { trades: Trade[] }) => {
  const wr = getWinRate(trades);
  const wins = trades.filter((t) => t.result === "WIN").length;
  return (
    <div className="h-full rounded-lg border border-border p-4 flex flex-col justify-between bg-card/30">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Win Rate</p>
        <Target className="h-4 w-4 text-primary/60" />
      </div>
      <div>
        <p className="text-3xl font-bold text-primary">{wr.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground mt-1">{wins} wins / {trades.length} trades</p>
      </div>
    </div>
  );
};
