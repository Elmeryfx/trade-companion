import { Link, useLocation } from "react-router-dom";
import { BarChart3, Database, TrendingUp, ClipboardList, Settings, Heart } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: TrendingUp },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/trades", label: "Trades", icon: Database },
  { to: "/trading-plan", label: "Plan", icon: ClipboardList },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/credits", label: "Credits", icon: Heart },
];

export const DashboardSidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="h-full rounded-lg border border-border p-3 bg-card/30 flex flex-col gap-1">
      {links.map((l) => {
        const active = pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <l.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{l.label}</span>
          </Link>
        );
      })}
    </aside>
  );
};
