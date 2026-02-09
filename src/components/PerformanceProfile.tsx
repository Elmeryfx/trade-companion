import { Trade } from "@/types/trade";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { getWinRate, getProfitFactor } from "@/lib/analytics";

export const PerformanceProfile = ({ trades }: { trades: Trade[] }) => {
  const winRate = getWinRate(trades);
  const profitFactor = Math.min(getProfitFactor(trades) * 10, 100);
  const consistency = trades.length > 0 ? Math.min((trades.length / 20) * 100, 100) : 0;
  const planAdherence = trades.length > 0 ? (trades.filter((t) => t.tp1Hit).length / trades.length) * 100 : 0;

  const data = [
    { subject: "Win Rate", value: winRate },
    { subject: "Profit Factor", value: profitFactor },
    { subject: "Consistency\nScore", value: consistency },
    { subject: "Plan\nAdherence", value: planAdherence },
  ];

  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="text-sm text-muted-foreground mb-2 text-center">Performance Profile</h4>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(220,15%,18%)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(220,10%,55%)", fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(220,10%,55%)", fontSize: 10 }} />
          <Radar dataKey="value" stroke="hsl(160,84%,39%)" fill="hsl(160,84%,39%)" fillOpacity={0.25} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
