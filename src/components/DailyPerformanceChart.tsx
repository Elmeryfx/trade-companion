import { Trade } from "@/types/trade";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const DailyPerformanceChart = ({ trades }: { trades: Trade[] }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayMap: Record<string, number> = {};
  dayNames.forEach((d) => (dayMap[d] = 0));

  trades.forEach((t) => {
    const day = dayNames[new Date(t.date).getDay()];
    dayMap[day] += t.pnl;
  });

  const data = dayNames.map((name) => ({ name, pnl: dayMap[name] }));

  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="text-sm text-muted-foreground mb-4 text-center">Daily Performance</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "hsl(270,10%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(270,10%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(272,18%,13%)", border: "1px solid hsl(275,25%,22%)", borderRadius: 8 }}
            labelStyle={{ color: "hsl(270,10%,90%)" }}
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
