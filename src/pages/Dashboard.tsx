import { useTrades } from "@/context/TradeContext";
import { TradeCalendar } from "@/components/TradeCalendar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { AccountHeader } from "@/components/dashboard/AccountHeader";
import { PnlCard } from "@/components/dashboard/PnlCard";
import { DayWinCard } from "@/components/dashboard/DayWinCard";
import { PnlLineChart } from "@/components/dashboard/PnlLineChart";
import { StrategyAreaChart } from "@/components/dashboard/StrategyAreaChart";
import { WinLossPie } from "@/components/dashboard/WinLossPie";
import { RecentHistory } from "@/components/dashboard/RecentHistory";

const Dashboard = () => {
  const { trades } = useTrades();

  return (
    <div
      className="p-4 gap-3 min-h-screen grid"
      style={{
        gridTemplateColumns: "1fr 1.4fr 1.1fr 0.7fr 0.8fr",
        gridTemplateRows: "0.5fr 0.8fr 0.7fr 2fr 1fr",
        gridTemplateAreas: `
          "sidebar header header header header"
          "sidebar pnl linechart area area"
          "sidebar daywin linechart area area"
          "sidebar kalendar kalendar pie pie"
          "sidebar history history history history"
        `,
      }}
    >
      <div style={{ gridArea: "sidebar" }}>
        <DashboardSidebar />
      </div>
      <div style={{ gridArea: "header" }}>
        <AccountHeader />
      </div>
      <div style={{ gridArea: "pnl" }}>
        <PnlCard trades={trades} />
      </div>
      <div style={{ gridArea: "daywin" }}>
        <DayWinCard trades={trades} />
      </div>
      <div style={{ gridArea: "linechart" }}>
        <PnlLineChart trades={trades} />
      </div>
      <div style={{ gridArea: "area" }}>
        <StrategyAreaChart trades={trades} />
      </div>
      <div style={{ gridArea: "kalendar" }} className="min-h-0 overflow-hidden">
        <TradeCalendar trades={trades} />
      </div>
      <div style={{ gridArea: "pie" }}>
        <WinLossPie trades={trades} />
      </div>
      <div style={{ gridArea: "history" }}>
        <RecentHistory trades={trades} />
      </div>
    </div>
  );
};

export default Dashboard;
