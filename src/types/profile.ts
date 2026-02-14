export const DEFAULT_STRATEGIES = ["SMC", "ICT", "Support & Resistant", "Supply & Demand"];

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  tradingPlan: string;
  strategies: string[];
  tpLevels: { tp1: boolean; tp2: boolean; tp3: boolean };
}
