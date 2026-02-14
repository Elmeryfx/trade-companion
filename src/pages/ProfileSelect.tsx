import { useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { DEFAULT_STRATEGIES } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, Plus, UserCircle, X, ImagePlus } from "lucide-react";

const ProfileSelect = () => {
  const { profiles, addProfile, setActiveProfileId } = useProfile();
  const [creating, setCreating] = useState(profiles.length === 0);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tradingPlan, setTradingPlan] = useState("");
  const [selectedDefaults, setSelectedDefaults] = useState<string[]>([...DEFAULT_STRATEGIES]);
  const [customStrategies, setCustomStrategies] = useState<string[]>([]);
  const [newStrategy, setNewStrategy] = useState("");
  const [tpLevels, setTpLevels] = useState({ tp1: true, tp2: false, tp3: false });

  const toggleDefault = (s: string) => {
    setSelectedDefaults((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const addCustomStrategy = () => {
    const trimmed = newStrategy.trim();
    if (trimmed && !customStrategies.includes(trimmed)) {
      setCustomStrategies((prev) => [...prev, trimmed]);
      setNewStrategy("");
    }
  };

  const removeCustom = (s: string) => setCustomStrategies((prev) => prev.filter((x) => x !== s));

  const handleCreate = () => {
    if (!name.trim()) return;
    const strategies = [...selectedDefaults, ...customStrategies];
    if (strategies.length === 0) return;
    addProfile({
      name: name.trim(),
      avatar: avatar || undefined,
      tradingPlan,
      strategies,
      tpLevels,
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (creating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <TrendingUp className="h-10 w-10 text-primary mx-auto" />
            <h1 className="text-2xl font-bold">Create Your Profile</h1>
            <p className="text-sm text-muted-foreground">Set up your trading plan and strategies</p>
          </div>

          <div className="rounded-lg border border-border p-6 space-y-5 bg-card">
            <div className="flex items-center gap-4">
              <div className="relative">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                    <UserCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                  <ImagePlus className="h-3 w-3 text-primary-foreground" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
              <div className="flex-1">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
            </div>

            <div>
              <Label>Trading Plan</Label>
              <textarea
                value={tradingPlan}
                onChange={(e) => setTradingPlan(e.target.value)}
                placeholder="Describe your trading plan, rules, and goals..."
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div>
              <Label className="mb-2 block">Default Strategies</Label>
              <div className="grid grid-cols-2 gap-2">
                {DEFAULT_STRATEGIES.map((s) => (
                  <label key={s} className="flex items-center gap-2 p-2 rounded-md border border-border cursor-pointer hover:bg-secondary/50">
                    <Checkbox checked={selectedDefaults.includes(s)} onCheckedChange={() => toggleDefault(s)} />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Custom Strategies</Label>
              <div className="flex gap-2 mb-2">
                <Input value={newStrategy} onChange={(e) => setNewStrategy(e.target.value)} placeholder="Add custom strategy" onKeyDown={(e) => e.key === "Enter" && addCustomStrategy()} />
                <Button variant="outline" size="sm" onClick={addCustomStrategy}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {customStrategies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {customStrategies.map((s) => (
                    <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs border border-primary/20">
                      {s}
                      <button onClick={() => removeCustom(s)}><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label className="mb-2 block">Take Profit Levels</Label>
              <div className="space-y-2">
                {(["tp1", "tp2", "tp3"] as const).map((tp, i) => (
                  <div key={tp} className="flex items-center justify-between p-2 rounded-md border border-border">
                    <span className="text-sm">TP {i + 1}</span>
                    <Switch checked={tpLevels[tp]} onCheckedChange={(c) => setTpLevels((prev) => ({ ...prev, [tp]: c }))} />
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleCreate} className="w-full" disabled={!name.trim() || [...selectedDefaults, ...customStrategies].length === 0}>
              Create Profile
            </Button>
          </div>

          {profiles.length > 0 && (
            <button onClick={() => setCreating(false)} className="text-sm text-muted-foreground hover:text-foreground mx-auto block">
              ← Back to profile selection
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <TrendingUp className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">Select Profile</h1>
        </div>

        <div className="space-y-3">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProfileId(p.id)}
              className="w-full flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]"
            >
              {p.avatar ? (
                <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.strategies.length} strategies</p>
              </div>
            </button>
          ))}
        </div>

        <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" /> Create New Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileSelect;
