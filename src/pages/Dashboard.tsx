import { useTrades } from "@/context/TradeContext";
import { TradeCalendar } from "@/components/TradeCalendar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { AccountHeader } from "@/components/dashboard/AccountHeader";
import { PnlCard } from "@/components/dashboard/PnlCard";
import { WinRateBar } from "@/components/dashboard/WinRateBar";
import { TradingProtocols } from "@/components/dashboard/TradingProtocols";
import { RRRatioCard } from "@/components/dashboard/RRRatioCard";
import { StrategyAreaChart } from "@/components/dashboard/StrategyAreaChart";
import { RecentHistory } from "@/components/dashboard/RecentHistory";

const Dashboard = () => {
  const { trades } = useTrades();

  return (
    <div
      className="p-4 gap-3 min-h-screen grid"
      style={{
        gridTemplateColumns: "0.9fr 1fr 1fr 1fr 0.9fr",
        gridTemplateRows: "auto auto auto auto auto",
        gridTemplateAreas: `
          "sidebar header header header header"
          "sidebar pnl protocols protocols rr"
          "sidebar wr  protocols protocols rr"
          "sidebar equity equity calendar calendar"
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
      <div style={{ gridArea: "wr" }}>
        <WinRateBar trades={trades} />
      </div>
      <div style={{ gridArea: "protocols" }}>
        <TradingProtocols />
      </div>
      <div style={{ gridArea: "rr" }}>
        <RRRatioCard trades={trades} />
      </div>
      <div style={{ gridArea: "equity" }} className="min-h-[360px]">
        <StrategyAreaChart trades={trades} />
      </div>
      <div style={{ gridArea: "calendar" }} className="min-h-[360px] overflow-hidden">
        <TradeCalendar trades={trades} />
      </div>
      <div style={{ gridArea: "history" }}>
        <RecentHistory trades={trades} />
      </div>
    </div>
  );
};

export default Dashboard;
