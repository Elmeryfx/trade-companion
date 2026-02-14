import { Trade } from "@/types/trade";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const MonthlyPerformanceChart = ({ trades }: { trades: Trade[] }) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthMap: Record<string, number> = {};
  monthNames.forEach((m) => (monthMap[m] = 0));

  trades.forEach((t) => {
    const m = monthNames[new Date(t.date).getMonth()];
    monthMap[m] += t.pnl;
  });

  const data = monthNames.map((name) => ({ name, pnl: monthMap[name] }));

  return (
    <div className="rounded-lg border border-border p-4 transition-all duration-300 hover:border-primary/30">
      <h4 className="text-sm text-muted-foreground mb-4 text-center">Monthly Performance</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "hsl(0,0%,45%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(0,0%,45%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(0,0%,12%)", border: "1px solid hsl(0,0%,15%)", borderRadius: 8 }}
            labelStyle={{ color: "hsl(0,0%,90%)" }}
          />
          <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pnl >= 0 ? "hsl(145,70%,45%)" : "hsl(0,72%,55%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
