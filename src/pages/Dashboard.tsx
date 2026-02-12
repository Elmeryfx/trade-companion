import { useTrades } from "@/context/TradeContext";
import { TradeEntryDialog } from "@/components/TradeEntryDialog";
import { StatsCards } from "@/components/StatsCards";
import { TradeCalendar } from "@/components/TradeCalendar";
import { DailyPerformanceChart } from "@/components/DailyPerformanceChart";

const Dashboard = () => {
  const { trades } = useTrades();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Quick Actions */}
        <div className="rounded-lg border border-border p-5">
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <TradeEntryDialog />
        </div>
        {/* Stats */}
        <StatsCards trades={trades} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <DailyPerformanceChart trades={trades} />
        <TradeCalendar trades={trades} />
      </div>
    </div>
  );
};

export default Dashboard;
