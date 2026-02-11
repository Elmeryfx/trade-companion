import { useTrades } from "@/context/TradeContext";
import { StatsCards } from "@/components/StatsCards";
import { AccountGrowthChart } from "@/components/AccountGrowthChart";
import { StrategyPerformanceChart } from "@/components/StrategyPerformanceChart";
import { RiskCards } from "@/components/RiskCards";

const Analytics = () => {
  const { trades } = useTrades();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary">ANALYTICS</h2>
      <StatsCards trades={trades} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountGrowthChart trades={trades} />
        <StrategyPerformanceChart trades={trades} />
      </div>
      <RiskCards trades={trades} />
    </div>
  );
};

export default Analytics;
