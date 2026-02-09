import { useTrades } from "@/context/TradeContext";
import { StatsCards } from "@/components/StatsCards";
import { AccountGrowthChart } from "@/components/AccountGrowthChart";
import { StrategyPerformanceChart } from "@/components/StrategyPerformanceChart";
import { TradeCalendar } from "@/components/TradeCalendar";
import { RiskAnalysis } from "@/components/RiskAnalysis";
import { useState } from "react";
import { Calendar, BarChart3 } from "lucide-react";

const Analytics = () => {
  const { trades } = useTrades();
  const [tab, setTab] = useState<"overview" | "calendar" | "risk">("overview");

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary">ANALYTICS</h2>
      <div className="rounded-lg border border-border p-3 flex gap-6">
        <button onClick={() => setTab("calendar")} className={`flex items-center gap-2 text-sm font-medium ${tab === "calendar" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          <Calendar className="h-4 w-4" /> Calendar
        </button>
        <button onClick={() => setTab("risk")} className={`flex items-center gap-2 text-sm font-medium ml-auto ${tab === "risk" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          <BarChart3 className="h-4 w-4" /> Risk Analysis
        </button>
      </div>

      <StatsCards trades={trades} />

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountGrowthChart trades={trades} />
          <StrategyPerformanceChart trades={trades} />
        </div>
      )}
      {tab === "calendar" && <TradeCalendar trades={trades} />}
      {tab === "risk" && <RiskAnalysis trades={trades} />}
    </div>
  );
};

export default Analytics;
