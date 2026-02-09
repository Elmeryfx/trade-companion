import { useTrades } from "@/context/TradeContext";
import { Trade } from "@/types/trade";
import { Trash2 } from "lucide-react";

const TradesDB = () => {
  const { trades, deleteTrade } = useTrades();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary">TRADES DB</h2>
      {trades.length === 0 ? (
        <p className="text-muted-foreground">No trades yet. Use Trade Entry to add your first trade.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="p-3 text-left text-muted-foreground font-medium">Date</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Position</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Strategy</th>
                <th className="p-3 text-left text-muted-foreground font-medium">R:R</th>
                <th className="p-3 text-left text-muted-foreground font-medium">P&L</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Result</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Market</th>
                <th className="p-3 text-left text-muted-foreground font-medium">TP1</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Setup</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Result Img</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {[...trades].reverse().map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/20">
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">
                    <span className={t.position === "BUY" ? "text-profit" : "text-loss"}>{t.position}</span>
                  </td>
                  <td className="p-3">{t.strategy}</td>
                  <td className="p-3">{t.rr}</td>
                  <td className={`p-3 font-medium ${t.pnl >= 0 ? "text-profit" : "text-loss"}`}>€{t.pnl.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.result === "WIN" ? "bg-primary/20 text-profit" : "bg-destructive/20 text-loss"}`}>
                      {t.result}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{t.marketCondition}</td>
                  <td className="p-3">{t.tp1Hit ? "✓" : "—"}</td>
                  <td className="p-3">
                    {t.setupImage ? <img src={t.setupImage} alt="setup" className="w-10 h-10 rounded object-cover" /> : "—"}
                  </td>
                  <td className="p-3">
                    {t.resultImage ? <img src={t.resultImage} alt="result" className="w-10 h-10 rounded object-cover" /> : "—"}
                  </td>
                  <td className="p-3">
                    <button onClick={() => deleteTrade(t.id)} className="text-muted-foreground hover:text-loss">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradesDB;
