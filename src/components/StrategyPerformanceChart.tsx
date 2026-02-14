import { Trade } from "@/types/trade";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getStrategyPerformance } from "@/lib/analytics";

export const StrategyPerformanceChart = ({ trades }: { trades: Trade[] }) => {
  const data = getStrategyPerformance(trades);

  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="text-sm text-muted-foreground mb-4 text-center">Performance by Strategy</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" tick={{ fill: "hsl(0,0%,45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fill: "hsl(0,0%,45%)", fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,12%)", border: "1px solid hsl(0,0%,15%)", borderRadius: 8 }} />
          <Bar dataKey="pnl" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pnl >= 0 ? "hsl(145,70%,45%)" : "hsl(0,72%,55%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
