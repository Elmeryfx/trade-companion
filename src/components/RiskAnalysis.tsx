import { Trade } from "@/types/trade";
import { getTotalPnl } from "@/lib/analytics";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, ArrowUpDown, Target } from "lucide-react";

export const RiskAnalysis = ({ trades }: { trades: Trade[] }) => {
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl < 0);
  const biggestWinner = wins.length ? Math.max(...wins.map((t) => t.pnl)) : 0;
  const biggestLoser = losses.length ? Math.min(...losses.map((t) => t.pnl)) : 0;
  const avgWin = wins.length ? wins.reduce((s, t) => s + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;
  const avgRR = trades.length ? trades.reduce((s, t) => s + t.rr, 0) / trades.length : 0;
  const consistencyScore = trades.length > 1
    ? ((1 - Math.abs(avgWin + avgLoss) / Math.max(avgWin, Math.abs(avgLoss), 1)) * 100)
    : 0;

  // Drawdown calc
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date));
  let peak = 10000, balance = 10000;
  const ddData = sorted.map((t) => {
    balance += t.pnl;
    peak = Math.max(peak, balance);
    const dd = ((balance - peak) / peak) * 100;
    return { date: t.date, drawdown: parseFloat(dd.toFixed(2)) };
  });
  const maxDrawdown = ddData.length ? Math.min(...ddData.map((d) => d.drawdown)) : 0;

  const cards = [
    { label: "Biggest Winner", value: `€${biggestWinner.toFixed(2)}`, icon: TrendingUp, color: "text-profit" },
    { label: "Biggest Loser", value: `€${biggestLoser.toFixed(2)}`, icon: TrendingDown, color: "text-loss" },
  ];

  const sideCards = [
    { label: "Avg Win", value: `€${avgWin.toFixed(2)}`, icon: TrendingUp, color: "text-profit" },
    { label: "Avg Loss", value: `€${avgLoss.toFixed(2)}`, icon: TrendingDown, color: "text-loss" },
    { label: "Risk/Reward", value: avgRR.toFixed(2), icon: ArrowUpDown, color: "text-primary" },
    { label: "Consistency Score", value: `${Math.abs(consistencyScore).toFixed(1)}%`, icon: Target, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-border p-4 flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{c.label}</p>
              <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
            <c.icon className="h-5 w-5 text-primary/60" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-4">
          {sideCards.map((c) => (
            <div key={c.label} className="rounded-lg border border-border p-4 flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{c.label}</p>
                <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
              </div>
              <c.icon className="h-5 w-5 text-primary/60" />
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border p-4">
          <h4 className="text-sm text-muted-foreground mb-4 text-center">Drawdown Chart</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ddData}>
              <defs>
                <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160,84%,39%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "hsl(220,10%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(220,10%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(220,18%,10%)", border: "1px solid hsl(220,15%,18%)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="drawdown" stroke="hsl(160,84%,39%)" fill="url(#ddGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
