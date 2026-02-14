import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider, useProfile } from "@/context/ProfileContext";
import { TradeProvider } from "@/context/TradeContext";
import { AppNav } from "@/components/AppNav";
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
      <div className="min-h-screen bg-background">
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
    </TradeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
