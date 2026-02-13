import { useState } from "react";
import { Trade } from "@/types/trade";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, isWithinInterval, parseISO } from "date-fns";

export const DailyPerformanceChart = ({ trades }: { trades: Trade[] }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dayMap: Record<string, number> = {};
  dayNames.forEach((d) => (dayMap[d] = 0));

  const allDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  trades.forEach((t) => {
    const d = parseISO(t.date);
    if (isWithinInterval(d, { start: weekStart, end: weekEnd })) {
      const dayName = allDayNames[(d.getDay() + 6) % 7];
      if (dayMap[dayName] !== undefined) {
        dayMap[dayName] += t.pnl;
      }
    }
  });

  const data = dayNames.map((name) => ({ name, pnl: dayMap[name] }));
  const weekLabel = `${format(weekStart, "dd MMM")} - ${format(endOfWeek(currentWeek, { weekStartsOn: 1 }), "dd MMM yyyy")}`;

  return (
    <div className="rounded-lg border border-border p-4 transition-all duration-300 hover:border-primary/30">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h4 className="text-sm text-muted-foreground text-center">{weekLabel}</h4>
        <button onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))} className="text-muted-foreground hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
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
