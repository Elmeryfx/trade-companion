export type BaseTheme = "onyx-mist";
export type ProfitTheme = "lime";
export type LossTheme = "crimson-void";

export interface ThemeConfig {
  base: BaseTheme;
  profit: ProfitTheme;
  loss: LossTheme;
}

export const BASE_THEMES: Record<BaseTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "onyx-mist": { label: "Onyx Mist", gradient: "linear-gradient(90deg, #0A0A0A, #D8DBE9)", colors: ["#0A0A0A", "#D8DBE9"] },
};

export const PROFIT_THEMES: Record<ProfitTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "lime": { label: "Lime", gradient: "linear-gradient(90deg, #00C896, #040404)", colors: ["#00C896", "#040404"] },
};

export const LOSS_THEMES: Record<LossTheme, { label: string; gradient: string; colors: [string, string] }> = {
  "crimson-void": { label: "Crimson Void", gradient: "linear-gradient(90deg, #7F0012, #1B0A07)", colors: ["#7F0012", "#1B0A07"] },
};

export const DEFAULT_THEME: ThemeConfig = {
  base: "onyx-mist",
  profit: "lime",
  loss: "crimson-void",
};
