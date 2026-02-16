import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider, useProfile } from "@/context/ProfileContext";
import { TradeProvider } from "@/context/TradeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppNav } from "@/components/AppNav";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import ProfileSelect from "./pages/ProfileSelect";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import TradesDB from "./pages/TradesDB";
import TradingPlan from "./pages/TradingPlan";
import Settings from "./pages/Settings";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { activeProfile } = useProfile();

  if (!activeProfile) {
    return <ProfileSelect />;
  }

  return (
    <TradeProvider>
      <div className="min-h-screen bg-background relative">
        <BackgroundEffects />
        <div className="relative z-10">
        <AppNav />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trades" element={<TradesDB />} />
          <Route path="/trading-plan" element={<TradingPlan />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
    </TradeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        </ThemeProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
