import { Trade } from "@/types/trade";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const WinLossPie = ({ trades }: { trades: Trade[] }) => {
  const wins = trades.filter((t) => t.result === "WIN").length;
  const losses = trades.filter((t) => t.result === "LOSS").length;
  const be = trades.filter((t) => t.result === "BE").length;

  const data = [
    { name: "Wins", value: wins, color: "hsl(145,70%,45%)" },
    { name: "Losses", value: losses, color: "hsl(0,72%,55%)" },
    { name: "BE", value: be, color: "hsl(var(--muted-foreground))" },
  ].filter((d) => d.value > 0);

  return (
    <div className="h-full rounded-lg border border-border p-4 bg-card/30 flex flex-col">
      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Win / Loss Distribution</h4>
      <div className="flex-1 min-h-0">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No trades yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="45%" outerRadius="75%" paddingAngle={2}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
