import { useMemo, useState } from "react";
import { Trade } from "@/types/trade";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const TradeCalendar = ({ trades }: { trades: Trade[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start

  const tradeMap = useMemo(() => {
    const map: Record<string, { count: number; pnl: number }> = {};
    trades.forEach((t) => {
      if (!map[t.date]) map[t.date] = { count: 0, pnl: 0 };
      map[t.date].count++;
      map[t.date].pnl += t.pnl;
    });
    return map;
  }, [trades]);

  const monthTrades = useMemo(() => {
    return trades.filter((t) => {
      const d = new Date(t.date);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [trades, year, month]);

  const totalPnl = monthTrades.reduce((s, t) => s + t.pnl, 0);

  // Build weeks
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDayOfWeek).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) { while (week.length < 7) week.push(null); weeks.push(week); }

  // Weekly summary
  const getWeekSummary = (weekDays: (number | null)[]) => {
    let count = 0, pnl = 0;
    weekDays.forEach((d) => {
      if (d === null) return;
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (tradeMap[key]) { count += tradeMap[key].count; pnl += tradeMap[key].pnl; }
    });
    return { count, pnl };
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={prev} className="text-muted-foreground hover:text-foreground"><ChevronLeft className="h-5 w-5" /></button>
          <span className="font-semibold">{monthName}</span>
          <button onClick={next} className="text-muted-foreground hover:text-foreground"><ChevronRight className="h-5 w-5" /></button>
        </div>
        <div className="flex gap-4 text-sm">
          <span>P/L: <span className={totalPnl >= 0 ? "text-profit" : "text-loss"}>{totalPnl >= 1000 ? `${(totalPnl / 1000).toFixed(1)}K` : totalPnl.toFixed(0)}</span></span>
          <span>Trades: <span className="font-bold">{monthTrades.length}</span></span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(5,1fr)_auto] text-sm">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-muted-foreground py-2 font-medium">{d}</div>
        ))}
        <div className="text-center text-muted-foreground py-2 font-medium">Summary</div>

        {weeks.map((weekDays, wi) => {
          // Only show Mon-Fri (first 5 days)
          const weekdayDays = weekDays.slice(0, 5);
          const summary = getWeekSummary(weekDays);
          return (
            <>
              {weekdayDays.map((d, di) => {
                const key = d ? `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` : null;
                const data = key ? tradeMap[key] : null;
                const bgClass = data ? (data.pnl >= 0 ? "bg-primary/20" : "bg-destructive/20") : "";
                return (
                  <div key={`${wi}-${di}`} className={`border border-border/50 p-2 min-h-[70px] ${bgClass}`}>
                    {d !== null && (
                      <>
                        <span className="text-xs text-muted-foreground">{d}</span>
                        {data && (
                          <div className="text-center mt-2">
                            <div className={`text-sm font-medium ${data.pnl >= 0 ? "text-profit" : "text-loss"}`}>{data.count}</div>
                            <div className={`text-xs ${data.pnl >= 0 ? "text-profit" : "text-loss"}`}>{data.pnl.toFixed(1)}</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              <div key={`sum-${wi}`} className="border border-border/50 p-2 min-h-[70px] flex flex-col items-center justify-center text-xs">
                {summary.count > 0 && (
                  <>
                    <span className="text-muted-foreground">{summary.count} trades</span>
                    <span className={summary.pnl >= 0 ? "text-profit" : "text-loss"}>{summary.pnl >= 1000 ? `${(summary.pnl / 1000).toFixed(1)}K` : summary.pnl.toFixed(1)}</span>
                  </>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
