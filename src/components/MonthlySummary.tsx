import { Trade } from "@/types/trade";
import { getWinRate, getTotalPnl, formatCurrency } from "@/lib/analytics";
import { CalendarDays } from "lucide-react";

interface MonthData {
  label: string;
  trades: Trade[];
}

const getMonthlyData = (trades: Trade[]): MonthData[] => {
  const map: Record<string, Trade[]> = {};
  trades.forEach((t) => {
    const key = t.date.slice(0, 7); // YYYY-MM
    if (!map[key]) map[key] = [];
    map[key].push(t);
  });
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, trades]) => {
      const [y, m] = key.split("-");
      const monthName = new Date(parseInt(y), parseInt(m) - 1).toLocaleString("default", { month: "long", year: "numeric" });
      return { label: monthName, trades };
    });
};

export const MonthlySummary = ({ trades }: { trades: Trade[] }) => {
  const months = getMonthlyData(trades);

  if (months.length === 0) {
    return (
      <div className="rounded-lg border border-border p-5">
        <h3 className="font-bold text-foreground flex items-center gap-2 mb-3">
          <CalendarDays className="h-5 w-5 text-primary" /> Monthly Summary
        </h3>
        <p className="text-muted-foreground text-sm">No trades yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border p-5">
      <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5 text-primary" /> Monthly Summary
      </h3>
      <div className="space-y-3">
        {months.map((m) => {
          const pnl = getTotalPnl(m.trades);
          const wr = getWinRate(m.trades);
          return (
            <div key={m.label} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
              <div>
                <p className="font-medium text-sm">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.trades.length} trades · {wr.toFixed(1)}% win rate</p>
              </div>
              <p className={`font-bold text-sm ${pnl >= 0 ? "text-profit" : "text-loss"}`}>
                {formatCurrency(pnl)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
