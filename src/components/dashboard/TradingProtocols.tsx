import { useProfile } from "@/context/ProfileContext";

export const TradingProtocols = () => {
  const { activeProfile } = useProfile();
  const planText = (activeProfile as any)?.tradingPlan as string | undefined;

  // Parse plan into up to 3 numbered rules; fall back to defaults.
  const lines = (planText ?? "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*(\d+[\).\s-]+|[-•*]\s+)/, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  const rules = lines.length
    ? lines
    : [
        "Risk max 1% per trade. Capital preservation first.",
        "Wait for 3+ confluence points (Fib, SR, RSI).",
        "No trading during Tier 1 news (FOMC, NFP).",
      ];

  return (
    <div className="h-full rounded-lg border border-border p-5 bg-card/30 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
          Trading Protocols
        </h4>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Active Mandate
        </span>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full border border-profit/40 text-profit text-[10px] font-mono flex items-center justify-center">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-foreground/85 leading-relaxed">{rule}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
