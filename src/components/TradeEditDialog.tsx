import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trade, Position, MarketCondition, TradeResult, Strategy } from "@/types/trade";
import { ImagePlus } from "lucide-react";

interface Props {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (trade: Trade) => void;
}

export const TradeEditDialog = ({ trade, open, onOpenChange, onSave }: Props) => {
  const [position, setPosition] = useState<Position>("BUY");
  const [rr, setRr] = useState("");
  const [pips, setPips] = useState("");
  const [pnl, setPnl] = useState("");
  const [tp1, setTp1] = useState(false);
  const [market, setMarket] = useState<MarketCondition>("BULLISH");
  const [result, setResult] = useState<TradeResult>("WIN");
  const [strategy, setStrategy] = useState<Strategy>("FVG");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [setupImage, setSetupImage] = useState("");
  const [resultImage, setResultImage] = useState("");

  useEffect(() => {
    if (trade) {
      setPosition(trade.position);
      setRr(String(trade.rr));
      setPips(String(trade.pips || 0));
      setPnl(String(trade.pnl));
      setTp1(trade.tp1Hit);
      setMarket(trade.marketCondition);
      setResult(trade.result);
      setStrategy(trade.strategy);
      setNotes(trade.notes || "");
      setDate(trade.date);
      setSetupImage(trade.setupImage || "");
      setResultImage(trade.resultImage || "");
    }
  }, [trade]);

  const handleSubmit = () => {
    if (!trade || !rr || !pnl) return;
    onSave({
      ...trade,
      position,
      rr: parseFloat(rr),
      pips: parseFloat(pips) || 0,
      pnl: parseFloat(pnl),
      tp1Hit: tp1,
      marketCondition: market,
      result,
      strategy,
      notes: notes || undefined,
      date,
      setupImage: setupImage || undefined,
      resultImage: resultImage || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Edit Trade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>R:R</Label>
              <Input type="number" step="0.1" value={rr} onChange={(e) => setRr(e.target.value)} />
            </div>
            <div>
              <Label>Pips</Label>
              <Input type="number" step="0.1" value={pips} onChange={(e) => setPips(e.target.value)} />
            </div>
            <div>
              <Label>P&L ($)</Label>
              <Input type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} />
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
            <Checkbox checked={tp1} onCheckedChange={(c) => setTp1(!!c)} id="tp1-edit" />
            <Label htmlFor="tp1-edit">TP 1 Hit</Label>
          </div>
          <div>
            <Label>Setup Image</Label>
            <div className="flex items-center gap-2">
              {setupImage && <img src={setupImage} alt="setup" className="w-12 h-12 rounded object-cover" />}
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border border-input cursor-pointer hover:bg-secondary/50 transition-colors">
                <ImagePlus className="h-4 w-4" /> {setupImage ? "Change" : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { const r = new FileReader(); r.onload = () => setSetupImage(r.result as string); r.readAsDataURL(file); }
                }} />
              </label>
              {setupImage && <button type="button" onClick={() => setSetupImage("")} className="text-xs text-muted-foreground hover:text-loss">Remove</button>}
            </div>
          </div>
          <div>
            <Label>Result Image</Label>
            <div className="flex items-center gap-2">
              {resultImage && <img src={resultImage} alt="result" className="w-12 h-12 rounded object-cover" />}
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border border-input cursor-pointer hover:bg-secondary/50 transition-colors">
                <ImagePlus className="h-4 w-4" /> {resultImage ? "Change" : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { const r = new FileReader(); r.onload = () => setResultImage(r.result as string); r.readAsDataURL(file); }
                }} />
              </label>
              {resultImage && <button type="button" onClick={() => setResultImage("")} className="text-xs text-muted-foreground hover:text-loss">Remove</button>}
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
