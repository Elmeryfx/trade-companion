import { Link, useLocation } from "react-router-dom";
import { BarChart3, Database, TrendingUp, Info } from "lucide-react";

export const AppNav = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "HOME", icon: TrendingUp },
    { to: "/analytics", label: "ANALYTICS", icon: BarChart3 },
    { to: "/trades", label: "TRADES DB", icon: Database },
    
    { to: "/about", label: "ABOUT", icon: Info },
  ];

  return (
    <header className="border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-4">TRADE JOURNAL</h1>
        <nav className="flex gap-8 rounded-lg border border-border p-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
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
