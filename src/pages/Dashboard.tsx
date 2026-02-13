import { useTrades } from "@/context/TradeContext";
import { TradeEntryDialog } from "@/components/TradeEntryDialog";
import { StatsCards } from "@/components/StatsCards";
import { TradeCalendar } from "@/components/TradeCalendar";
import { DailyPerformanceChart } from "@/components/DailyPerformanceChart";
import { MonthlyPerformanceChart } from "@/components/MonthlyPerformanceChart";

const Dashboard = () => {
  const { trades } = useTrades();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <TradeEntryDialog />
        <StatsCards trades={trades} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyPerformanceChart trades={trades} />
        <MonthlyPerformanceChart trades={trades} />
      </div>

      <TradeCalendar trades={trades} />
    </div>
  );
};

export default Dashboard;
