import { Trade } from "@/types/trade";
import { formatCurrency } from "@/lib/analytics";
import { History as HistoryIcon } from "lucide-react";

export const RecentHistory = ({ trades }: { trades: Trade[] }) => {
  const recent = [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

  return (
    <div className="h-full rounded-lg border border-border p-4 bg-card/30 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <HistoryIcon className="h-4 w-4 text-primary" />
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Recent Trades</h4>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No trades yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left py-2 px-2 font-medium">Date</th>
                <th className="text-left py-2 px-2 font-medium">Position</th>
                <th className="text-left py-2 px-2 font-medium">Strategy</th>
                <th className="text-left py-2 px-2 font-medium">Result</th>
                <th className="text-right py-2 px-2 font-medium">RR</th>
                <th className="text-right py-2 px-2 font-medium">P&L</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id} className="border-b border-border/40 hover:bg-secondary/30">
                  <td className="py-2 px-2">{t.date}</td>
                  <td className="py-2 px-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${t.position === "BUY" ? "bg-profit/15 text-profit" : "bg-loss/15 text-loss"}`}>
                      {t.position}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-muted-foreground">{t.strategy}</td>
                  <td className="py-2 px-2 text-xs">{t.result}</td>
                  <td className="py-2 px-2 text-right">{t.rr.toFixed(2)}</td>
                  <td className={`py-2 px-2 text-right font-medium ${t.pnl >= 0 ? "text-profit" : "text-loss"}`}>
                    {formatCurrency(t.pnl)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
