import { useState, useEffect } from "react";
import { Save, Plus, Trash2, CheckSquare, Square } from "lucide-react";

interface PlanItem {
  id: string;
  text: string;
  checked: boolean;
}

interface TradingPlanData {
  rules: string;
  checklist: PlanItem[];
}

const defaultPlan: TradingPlanData = {
  rules: "",
  checklist: [],
};

const TradingPlan = () => {
  const [plan, setPlan] = useState<TradingPlanData>(() => {
    const saved = localStorage.getItem("tradingPlan");
    return saved ? JSON.parse(saved) : defaultPlan;
  });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("tradingPlan", JSON.stringify(plan));
  }, [plan]);

  const addItem = () => {
    if (!newItem.trim()) return;
    setPlan((p) => ({
      ...p,
      checklist: [...p.checklist, { id: crypto.randomUUID(), text: newItem.trim(), checked: false }],
    }));
    setNewItem("");
  };

  const toggleItem = (id: string) => {
    setPlan((p) => ({
      ...p,
      checklist: p.checklist.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    }));
  };

  const removeItem = (id: string) => {
    setPlan((p) => ({ ...p, checklist: p.checklist.filter((i) => i.id !== id) }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-primary">TRADING PLAN</h2>

      <div className="rounded-lg border border-border p-5 space-y-3">
        <h3 className="font-bold text-foreground">Trading Rules</h3>
        <textarea
          value={plan.rules}
          onChange={(e) => setPlan((p) => ({ ...p, rules: e.target.value }))}
          placeholder="Write your trading rules here..."
          className="w-full min-h-[200px] bg-secondary/30 border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="rounded-lg border border-border p-5 space-y-4">
        <h3 className="font-bold text-foreground">Pre-Trade Checklist</h3>
        <div className="flex gap-2">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add checklist item..."
            className="flex-1 bg-secondary/30 border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button onClick={addItem} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2">
          {plan.checklist.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/20 group">
              <button onClick={() => toggleItem(item.id)} className="text-primary">
                {item.checked ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-muted-foreground" />}
              </button>
              <span className={`flex-1 text-sm ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.text}
              </span>
              <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-loss">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingPlan;
