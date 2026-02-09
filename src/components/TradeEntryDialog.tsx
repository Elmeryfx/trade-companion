import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrades } from "@/context/TradeContext";
import { Position, MarketCondition, TradeResult, Strategy } from "@/types/trade";
import { Plus } from "lucide-react";

export const TradeEntryDialog = () => {
  const { addTrade } = useTrades();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>("BUY");
  const [rr, setRr] = useState("");
  const [pnl, setPnl] = useState("");
  const [tp1, setTp1] = useState(false);
  const [market, setMarket] = useState<MarketCondition>("BULLISH");
  const [result, setResult] = useState<TradeResult>("WIN");
  const [strategy, setStrategy] = useState<Strategy>("FVG");
  const [setupImage, setSetupImage] = useState<string>("");
  const [resultImage, setResultImage] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!rr || !pnl) return;
    addTrade({
      position,
      rr: parseFloat(rr),
      pnl: parseFloat(pnl),
      tp1Hit: tp1,
      marketCondition: market,
      result,
      strategy,
      date: new Date().toISOString().split("T")[0],
      setupImage,
      resultImage,
    });
    setOpen(false);
    setRr(""); setPnl(""); setTp1(false); setSetupImage(""); setResultImage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary">
          <Plus className="h-4 w-4 text-primary" />
          TRADE ENTRY
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">New Trade Entry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Position</Label>
              <Select value={position} onValueChange={(v) => setPosition(v as Position)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUY">BUY</SelectItem>
                  <SelectItem value="SELL">SELL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Result</Label>
              <Select value={result} onValueChange={(v) => setResult(v as TradeResult)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="WIN">WIN</SelectItem>
                  <SelectItem value="LOSS">LOSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>R:R</Label>
              <Input type="number" step="0.1" value={rr} onChange={(e) => setRr(e.target.value)} placeholder="e.g. 2.5" />
            </div>
            <div>
              <Label>P&L (€)</Label>
              <Input type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} placeholder="e.g. 500 or -100" />
            </div>
          </div>
          <div>
            <Label>Strategy</Label>
            <Select value={strategy} onValueChange={(v) => setStrategy(v as Strategy)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="FVG">FVG</SelectItem>
                <SelectItem value="REVERSAL">Reversal</SelectItem>
                <SelectItem value="TRENDLINE">Trendline</SelectItem>
                <SelectItem value="CONTINUATION">Continuation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Market Condition</Label>
            <Select value={market} onValueChange={(v) => setMarket(v as MarketCondition)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="BULLISH">Bullish</SelectItem>
                <SelectItem value="BEARISH">Bearish</SelectItem>
                <SelectItem value="SIDEWAYS">Sideways</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={tp1} onCheckedChange={(c) => setTp1(!!c)} id="tp1" />
            <Label htmlFor="tp1">TP 1 Hit</Label>
          </div>
          <div>
            <Label>Setup Image (Before)</Label>
            <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSetupImage)} className="cursor-pointer" />
          </div>
          <div>
            <Label>Result Image (After)</Label>
            <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setResultImage)} className="cursor-pointer" />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Trade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
