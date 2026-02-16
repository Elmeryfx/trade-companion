import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { ThemeConfig, BaseTheme, ProfitTheme, LossTheme, DEFAULT_THEME, BASE_THEMES, PROFIT_THEMES, LOSS_THEMES } from "@/types/theme";

interface ThemeContextType {
  theme: ThemeConfig;
  setBaseTheme: (t: BaseTheme) => void;
  setProfitTheme: (t: ProfitTheme) => void;
  setLossTheme: (t: LossTheme) => void;
  baseGradient: string;
  profitGradient: string;
  lossGradient: string;
  baseColors: [string, string];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function blendColors(c1: string, c2: string, weight = 0.5): string {
  const r = Math.round(parseInt(c1.slice(1, 3), 16) * weight + parseInt(c2.slice(1, 3), 16) * (1 - weight));
  const g = Math.round(parseInt(c1.slice(3, 5), 16) * weight + parseInt(c2.slice(3, 5), 16) * (1 - weight));
  const b = Math.round(parseInt(c1.slice(5, 7), 16) * weight + parseInt(c2.slice(5, 7), 16) * (1 - weight));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem("appTheme");
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  useEffect(() => {
    localStorage.setItem("appTheme", JSON.stringify(theme));
  }, [theme]);

  const baseInfo = BASE_THEMES[theme.base];
  const profitInfo = PROFIT_THEMES[theme.profit];
  const lossInfo = LOSS_THEMES[theme.loss];

  // Apply CSS variables based on theme
  useEffect(() => {
    const root = document.documentElement;
    const [c1, c2] = baseInfo.colors;
    const dark = isDark(c1);
    const bg = dark ? c1 : c2;
    const bgAlt = dark ? c2 : c1;
    
    // Determine foreground based on average brightness
    const avgBright = isDark(blendColors(c1, c2, 0.5));
    const fg = avgBright ? "0 0% 90%" : "0 0% 10%";
    const mutedFg = avgBright ? "0 0% 55%" : "0 0% 40%";
    
    root.style.setProperty("--background", hexToHSL(bg));
    root.style.setProperty("--foreground", fg);
    root.style.setProperty("--card", hexToHSL(blendColors(c1, c2, 0.6)));
    root.style.setProperty("--card-foreground", fg);
    root.style.setProperty("--popover", hexToHSL(blendColors(c1, c2, 0.6)));
    root.style.setProperty("--popover-foreground", fg);
    root.style.setProperty("--secondary", hexToHSL(blendColors(c1, c2, 0.7)));
    root.style.setProperty("--secondary-foreground", fg);
    root.style.setProperty("--muted", hexToHSL(blendColors(c1, c2, 0.7)));
    root.style.setProperty("--muted-foreground", mutedFg);
    root.style.setProperty("--accent", hexToHSL(blendColors(c1, c2, 0.5)));
    root.style.setProperty("--accent-foreground", fg);
    root.style.setProperty("--border", hexToHSL(blendColors(c1, c2, 0.4)));
    root.style.setProperty("--input", hexToHSL(blendColors(c1, c2, 0.4)));
    
    // Primary from profit theme first color
    const profitPrimary = profitInfo.colors[0];
    root.style.setProperty("--primary", hexToHSL(profitPrimary));
    root.style.setProperty("--primary-foreground", isDark(profitPrimary) ? "0 0% 90%" : "0 0% 5%");
    root.style.setProperty("--ring", hexToHSL(profitPrimary));

    // Profit and loss
    root.style.setProperty("--profit", hexToHSL(profitInfo.colors[0]));
    root.style.setProperty("--loss", hexToHSL(lossInfo.colors[0]));

    // Sidebar
    root.style.setProperty("--sidebar-background", hexToHSL(blendColors(c1, c2, 0.7)));
    root.style.setProperty("--sidebar-foreground", fg);
    root.style.setProperty("--sidebar-primary", hexToHSL(profitPrimary));
    root.style.setProperty("--sidebar-primary-foreground", isDark(profitPrimary) ? "0 0% 90%" : "0 0% 5%");
    root.style.setProperty("--sidebar-accent", hexToHSL(blendColors(c1, c2, 0.5)));
    root.style.setProperty("--sidebar-accent-foreground", fg);
    root.style.setProperty("--sidebar-border", hexToHSL(blendColors(c1, c2, 0.4)));
    root.style.setProperty("--sidebar-ring", hexToHSL(profitPrimary));

    // Set gradient for background
    root.style.setProperty("--base-gradient", baseInfo.gradient);
    root.style.setProperty("--base-color-1", c1);
    root.style.setProperty("--base-color-2", c2);
  }, [theme, baseInfo, profitInfo, lossInfo]);

  const value = useMemo(() => ({
    theme,
    setBaseTheme: (t: BaseTheme) => setTheme((prev) => ({ ...prev, base: t })),
    setProfitTheme: (t: ProfitTheme) => setTheme((prev) => ({ ...prev, profit: t })),
    setLossTheme: (t: LossTheme) => setTheme((prev) => ({ ...prev, loss: t })),
    baseGradient: baseInfo.gradient,
    profitGradient: profitInfo.gradient,
    lossGradient: lossInfo.gradient,
    baseColors: baseInfo.colors,
  }), [theme, baseInfo, profitInfo, lossInfo]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
