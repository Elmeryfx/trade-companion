import { Trade } from "@/types/trade";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getAccountGrowth } from "@/lib/analytics";

export const AccountGrowthChart = ({ trades }: { trades: Trade[] }) => {
  const data = getAccountGrowth(trades);

  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="text-sm text-muted-foreground mb-4 text-center">Account Growth</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(275,39%,53%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(275,39%,53%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: "hsl(270,10%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(270,10%,55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: "hsl(272,18%,13%)", border: "1px solid hsl(275,25%,22%)", borderRadius: 8 }} />
          <Area type="monotone" dataKey="balance" stroke="hsl(275,39%,53%)" fill="url(#growthGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
