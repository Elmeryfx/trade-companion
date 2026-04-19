import { Trade } from "@/types/trade";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getAccountGrowth } from "@/lib/analytics";

export const StrategyAreaChart = ({ trades }: { trades: Trade[] }) => {
  const data = getAccountGrowth(trades);
  return (
    <div className="h-full rounded-lg border border-border p-4 bg-card/30 flex flex-col">
      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Equity Curve</h4>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fill="url(#areaGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
