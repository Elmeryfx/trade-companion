import { useTheme } from "@/context/ThemeContext";
import { BASE_THEMES, PROFIT_THEMES, LOSS_THEMES, BaseTheme, ProfitTheme, LossTheme } from "@/types/theme";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";

const ThemeSwatch = ({ gradient, selected, onClick, label }: { gradient: string; selected: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className={`group flex flex-col items-center gap-1.5 transition-all ${selected ? "scale-105" : "opacity-70 hover:opacity-100"}`}
  >
    <div
      className={`w-full h-10 rounded-lg border-2 transition-all ${selected ? "border-primary shadow-md shadow-primary/20" : "border-border hover:border-muted-foreground"}`}
      style={{ background: gradient }}
    />
    <span className={`text-[10px] font-medium truncate w-full text-center ${selected ? "text-primary" : "text-muted-foreground"}`}>
      {label}
    </span>
  </button>
);

export const ThemeSettings = () => {
  const { theme, setBaseTheme, setProfitTheme, setLossTheme } = useTheme();

  return (
    <div className="rounded-lg border border-border p-6 space-y-5 bg-card">
      <h3 className="font-bold flex items-center gap-2">
        <Palette className="h-4 w-4" /> Theme
      </h3>

      {/* Base Theme */}
      <div>
        <Label className="mb-2 block text-sm text-muted-foreground">Base</Label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(BASE_THEMES) as BaseTheme[]).map((key) => (
            <ThemeSwatch
              key={key}
              gradient={BASE_THEMES[key].gradient}
              selected={theme.base === key}
              onClick={() => setBaseTheme(key)}
              label={BASE_THEMES[key].label}
            />
          ))}
        </div>
      </div>

      {/* Profit Theme */}
      <div>
        <Label className="mb-2 block text-sm text-muted-foreground">Profit</Label>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(PROFIT_THEMES) as ProfitTheme[]).map((key) => (
            <ThemeSwatch
              key={key}
              gradient={PROFIT_THEMES[key].gradient}
              selected={theme.profit === key}
              onClick={() => setProfitTheme(key)}
              label={PROFIT_THEMES[key].label}
            />
          ))}
        </div>
      </div>

      {/* Loss Theme */}
      <div>
        <Label className="mb-2 block text-sm text-muted-foreground">Loss</Label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(LOSS_THEMES) as LossTheme[]).map((key) => (
            <ThemeSwatch
              key={key}
              gradient={LOSS_THEMES[key].gradient}
              selected={theme.loss === key}
              onClick={() => setLossTheme(key)}
              label={LOSS_THEMES[key].label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
