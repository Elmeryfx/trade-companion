import { useTrades } from "@/context/TradeContext";
import { useState, useRef } from "react";
import { Trash2, Download, Upload } from "lucide-react";

type Filter = "all" | "win" | "lose";

const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
};

const TradesDB = () => {
  const { trades, deleteTrade, exportTrades, importTrades } = useTrades();
  const [filter, setFilter] = useState<Filter>("all");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = [...trades].reverse().filter((t) => {
    if (filter === "win") return t.result === "WIN";
    if (filter === "lose") return t.result === "LOSS";
    return true;
  });

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Win", value: "win" },
    { label: "Lose", value: "lose" },
  ];

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) importTrades(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">TRADES DB</h2>
        <div className="flex gap-2">
          <button onClick={exportTrades} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">
            <Download className="h-4 w-4" /> Export
          </button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">
            <Upload className="h-4 w-4" /> Import
          </button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No trades found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="p-3 text-left text-muted-foreground font-medium">#</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Date</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Position</th>
                <th className="p-3 text-left text-muted-foreground font-medium">R:R</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Strategy</th>
                <th className="p-3 text-left text-muted-foreground font-medium">P&L</th>
                <th className="p-3 text-left text-muted-foreground font-medium">TP1</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Result</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Market</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Notes</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Setup</th>
                <th className="p-3 text-left text-muted-foreground font-medium">Result Img</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, idx) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/20">
                  <td className="p-3 text-muted-foreground">{idx + 1}</td>
                  <td className="p-3">{formatDate(t.date)}</td>
                  <td className="p-3">
                    <span className={t.position === "BUY" ? "text-profit" : "text-loss"}>{t.position}</span>
                  </td>
                  <td className="p-3">{t.rr}</td>
                  <td className="p-3">{t.strategy}</td>
                  <td className={`p-3 font-medium ${t.pnl >= 0 ? "text-profit" : "text-loss"}`}>${t.pnl.toFixed(2)}</td>
                  <td className="p-3">{t.tp1Hit ? "✓" : "—"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.result === "WIN" ? "bg-primary/20 text-profit" : "bg-destructive/20 text-loss"}`}>
                      {t.result}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{t.marketCondition}</td>
                  <td className="p-3 text-muted-foreground max-w-[150px] truncate" title={t.notes}>{t.notes || "—"}</td>
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
