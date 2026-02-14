import { Link, useLocation } from "react-router-dom";
import { BarChart3, Database, TrendingUp, ClipboardList, Settings, Heart, UserCircle } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

export const AppNav = () => {
  const { pathname } = useLocation();
  const { activeProfile, profiles, setActiveProfileId } = useProfile();

  const links = [
    { to: "/", label: "HOME", icon: TrendingUp },
    { to: "/analytics", label: "ANALYTICS", icon: BarChart3 },
    { to: "/trades", label: "TRADES DB", icon: Database },
    { to: "/trading-plan", label: "PLAN", icon: ClipboardList },
    { to: "/settings", label: "SETTINGS", icon: Settings },
    { to: "/credits", label: "CREDITS", icon: Heart },
  ];

  return (
    <header className="border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">TRADE JOURNAL</h1>
          </div>
          {activeProfile && (
            <div className="flex items-center gap-2">
              {activeProfile.avatar ? (
                <img src={activeProfile.avatar} alt={activeProfile.name} className="w-8 h-8 rounded-full object-cover border border-primary/30" />
              ) : (
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              )}
              <span className="text-sm font-medium hidden sm:block">{activeProfile.name}</span>
            </div>
          )}
        </div>
        <nav className="flex gap-4 lg:gap-8 rounded-lg border border-border p-3 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
