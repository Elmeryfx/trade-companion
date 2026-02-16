export type BaseTheme = "cloud-alloy" | "skyfade" | "frosted-light" | "midnight-mist" | "citrus-shine" | "neon-dusk";
export type ProfitTheme = "emerald-depth" | "forest-machine" | "jungle-code" | "lime";
export type LossTheme = "crimson-void" | "rust-furnace" | "wine-shadow";

export interface ThemeConfig {
  base: BaseTheme;
  profit: ProfitTheme;
  loss: LossTheme;
}

export const BASE_THEMES: Record<BaseTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "cloud-alloy": { label: "Cloud Alloy", gradient: "linear-gradient(90deg, #8399A2, #EEF2F3)", colors: ["#8399A2", "#EEF2F3"] },
  "skyfade": { label: "Skyfade", gradient: "linear-gradient(90deg, #727A9A, #D8DBE9)", colors: ["#727A9A", "#D8DBE9"] },
  "frosted-light": { label: "Frosted Light", gradient: "linear-gradient(90deg, #EBF4F5, #B5C6E0)", colors: ["#EBF4F5", "#B5C6E0"] },
  "midnight-mist": { label: "Midnight Mist", gradient: "linear-gradient(90deg, #211F2F, #918CA9)", colors: ["#211F2F", "#918CA9"] },
  "citrus-shine": { label: "Citrus Shine", gradient: "linear-gradient(90deg, #FF930F, #FFF95B)", colors: ["#FF930F", "#FFF95B"] },
  "neon-dusk": { label: "Neon Dusk", gradient: "linear-gradient(90deg, #00D4FF, #020024)", colors: ["#00D4FF", "#020024"] },
};

export const PROFIT_THEMES: Record<ProfitTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "emerald-depth": { label: "Emerald Depth", gradient: "linear-gradient(90deg, #4A9B7F, #0A3431)", colors: ["#4A9B7F", "#0A3431"] },
  "forest-machine": { label: "Forest Machine", gradient: "linear-gradient(90deg, #0B2C24, #247A4D)", colors: ["#0B2C24", "#247A4D"] },
  "jungle-code": { label: "Jungle Code", gradient: "linear-gradient(90deg, #46B83D, #111E0B)", colors: ["#46B83D", "#111E0B"] },
  "lime": { label: "Lime", gradient: "linear-gradient(90deg, #00C896, #040404)", colors: ["#00C896", "#040404"] },
};

export const LOSS_THEMES: Record<LossTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "crimson-void": { label: "Crimson Void", gradient: "linear-gradient(90deg, #7F0012, #1B0A07)", colors: ["#7F0012", "#1B0A07"] },
  "rust-furnace": { label: "Rust Furnace", gradient: "linear-gradient(90deg, #8C1105, #25221E)", colors: ["#8C1105", "#25221E"] },
  "wine-shadow": { label: "Wine Shadow", gradient: "linear-gradient(90deg, #1F0021, #751006)", colors: ["#1F0021", "#751006"] },
};

export const DEFAULT_THEME: ThemeConfig = {
  base: "neon-dusk",
  profit: "emerald-depth",
  loss: "crimson-void",
};
