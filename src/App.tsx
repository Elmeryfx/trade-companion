import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TradeProvider } from "@/context/TradeContext";
import { AppNav } from "@/components/AppNav";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import TradesDB from "./pages/TradesDB";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TradeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <AppNav />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/trades" element={<TradesDB />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TradeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
