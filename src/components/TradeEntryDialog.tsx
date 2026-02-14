import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrades } from "@/context/TradeContext";
import { useProfile } from "@/context/ProfileContext";
import { Position, MarketCondition, TradeResult } from "@/types/trade";
import { Plus } from "lucide-react";

export const TradeEntryDialog = () => {
  const { addTrade } = useTrades();
  const { activeProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>("BUY");
  const [rr, setRr] = useState("");
  const [pips, setPips] = useState("");
  const [pnl, setPnl] = useState("");
  const [tp1, setTp1] = useState(false);
  const [tp2, setTp2] = useState(false);
  const [tp3, setTp3] = useState(false);
  const [market, setMarket] = useState<MarketCondition>("BULLISH");
  const [result, setResult] = useState<TradeResult>("WIN");
  const [strategy, setStrategy] = useState(activeProfile?.strategies[0] || "");
  const [setupImage, setSetupImage] = useState<string>("");
  const [resultImage, setResultImage] = useState<string>("");
  const [notes, setNotes] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!rr || !pnl || !strategy) return;
    addTrade({
      position,
      rr: parseFloat(rr),
      pips: parseFloat(pips) || 0,
      pnl: parseFloat(pnl),
      tp1,
      tp2,
      tp3,
      marketCondition: market,
      result,
      strategy,
      date: new Date().toISOString().split("T")[0],
      setupImage,
      resultImage,
      notes: notes || undefined,
    });
    setOpen(false);
    setRr(""); setPips(""); setPnl(""); setTp1(false); setTp2(false); setTp3(false);
    setSetupImage(""); setResultImage(""); setNotes("");
  };

  const tpLevels = activeProfile?.tpLevels || { tp1: true, tp2: false, tp3: false };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary w-full h-full min-h-[80px] text-lg font-bold rounded-lg border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
          <Plus className="h-5 w-5 text-primary" />
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
                  <SelectItem value="BE">BE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>R:R</Label>
              <Input type="number" step="0.1" value={rr} onChange={(e) => setRr(e.target.value)} placeholder="e.g. 2.5" />
            </div>
            <div>
              <Label>Pips</Label>
              <Input type="number" step="0.1" value={pips} onChange={(e) => setPips(e.target.value)} placeholder="e.g. 50" />
            </div>
            <div>
              <Label>P&L ($)</Label>
              <Input type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} placeholder="e.g. 500" />
            </div>
          </div>
          <div>
            <Label>Strategy</Label>
            <Select value={strategy} onValueChange={setStrategy}>
              <SelectTrigger><SelectValue placeholder="Select strategy" /></SelectTrigger>
              <SelectContent>
                {(activeProfile?.strategies || []).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
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
          <div className="flex items-center gap-4">
            {tpLevels.tp1 && (
              <div className="flex items-center gap-2">
                <Checkbox checked={tp1} onCheckedChange={(c) => setTp1(!!c)} id="tp1" />
                <Label htmlFor="tp1">TP 1</Label>
              </div>
            )}
            {tpLevels.tp2 && (
              <div className="flex items-center gap-2">
                <Checkbox checked={tp2} onCheckedChange={(c) => setTp2(!!c)} id="tp2" />
                <Label htmlFor="tp2">TP 2</Label>
              </div>
            )}
            {tpLevels.tp3 && (
              <div className="flex items-center gap-2">
                <Checkbox checked={tp3} onCheckedChange={(c) => setTp3(!!c)} id="tp3" />
                <Label htmlFor="tp3">TP 3</Label>
              </div>
            )}
          </div>
          <div>
            <Label>Setup Image (Before)</Label>
            <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSetupImage)} className="cursor-pointer" />
          </div>
          <div>
            <Label>Result Image (After)</Label>
            <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setResultImage)} className="cursor-pointer" />
          </div>
          <div>
            <Label>Notes</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes about this trade..."
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Submit Trade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
