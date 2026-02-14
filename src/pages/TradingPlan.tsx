import { useProfile } from "@/context/ProfileContext";
import { ClipboardList, Target, Layers } from "lucide-react";

const TradingPlan = () => {
  const { activeProfile } = useProfile();
  if (!activeProfile) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
        <ClipboardList className="h-6 w-6" /> TRADING PLAN
      </h2>

      <div className="rounded-lg border border-border p-6 bg-card space-y-4">
        <div className="flex items-center gap-3">
          {activeProfile.avatar ? (
            <img src={activeProfile.avatar} alt={activeProfile.name} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{activeProfile.name}</h3>
            <p className="text-xs text-muted-foreground">{activeProfile.strategies.length} strategies active</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border p-6 space-y-3">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" /> Plan
        </h3>
        {activeProfile.tradingPlan ? (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{activeProfile.tradingPlan}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">No trading plan set. Add one in Settings.</p>
        )}
      </div>

      <div className="rounded-lg border border-border p-6 space-y-3">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> Strategies
        </h3>
        <div className="flex flex-wrap gap-2">
          {activeProfile.strategies.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm border border-primary/20 font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border p-6 space-y-3">
        <h3 className="font-bold text-foreground">Take Profit Levels</h3>
        <div className="flex gap-3">
          {(["tp1", "tp2", "tp3"] as const).map((tp, i) => (
            <div
              key={tp}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                activeProfile.tpLevels[tp]
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-secondary/30 text-muted-foreground border-border"
              }`}
            >
              TP {i + 1}: {activeProfile.tpLevels[tp] ? "Active" : "Off"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingPlan;
