import { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { DEFAULT_STRATEGIES } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, UserCircle, ImagePlus, Plus, X, Trash2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ThemeSettings } from "@/components/ThemeSettings";

const Settings = () => {
  const { activeProfile, profiles, updateProfile, deleteProfile, setActiveProfileId } = useProfile();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tradingPlan, setTradingPlan] = useState("");
  const [selectedDefaults, setSelectedDefaults] = useState<string[]>([]);
  const [customStrategies, setCustomStrategies] = useState<string[]>([]);
  const [newStrategy, setNewStrategy] = useState("");
  const [tpLevels, setTpLevels] = useState({ tp1: true, tp2: false, tp3: false });
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (activeProfile) {
      setName(activeProfile.name);
      setAvatar(activeProfile.avatar || "");
      setTradingPlan(activeProfile.tradingPlan);
      setTpLevels(activeProfile.tpLevels);
      const defaults = activeProfile.strategies.filter((s) => DEFAULT_STRATEGIES.includes(s));
      const customs = activeProfile.strategies.filter((s) => !DEFAULT_STRATEGIES.includes(s));
      setSelectedDefaults(defaults);
      setCustomStrategies(customs);
    }
  }, [activeProfile?.id]);

  if (!activeProfile) return null;

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

  const handleSave = () => {
    const strategies = [...selectedDefaults, ...customStrategies];
    if (!name.trim() || strategies.length === 0) return;
    updateProfile({
      ...activeProfile,
      name: name.trim(),
      avatar: avatar || undefined,
      tradingPlan,
      strategies,
      tpLevels,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    deleteProfile(activeProfile.id);
    setDeleteConfirm(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" /> SETTINGS
      </h2>

      {/* Switch Profile */}
      {profiles.length > 1 && (
        <div className="rounded-lg border border-border p-4 space-y-3">
          <Label className="text-sm font-bold">Switch Profile</Label>
          <div className="flex gap-2 flex-wrap">
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProfileId(p.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                  p.id === activeProfile.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.avatar ? (
                  <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <UserCircle className="h-5 w-5" />
                )}
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Profile Info */}
      <div className="rounded-lg border border-border p-6 space-y-5 bg-card">
        <h3 className="font-bold">Profile</h3>
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
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        {avatar && (
          <button onClick={() => setAvatar("")} className="text-xs text-muted-foreground hover:text-loss">
            Remove photo
          </button>
        )}
      </div>

      {/* Trading Plan */}
      <div className="rounded-lg border border-border p-6 space-y-3">
        <h3 className="font-bold">Trading Plan</h3>
        <textarea
          value={tradingPlan}
          onChange={(e) => setTradingPlan(e.target.value)}
          placeholder="Describe your trading plan..."
          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      {/* Strategies */}
      <div className="rounded-lg border border-border p-6 space-y-4">
        <h3 className="font-bold">Strategies</h3>
        <div>
          <Label className="mb-2 block text-sm text-muted-foreground">Default Strategies</Label>
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
          <Label className="mb-2 block text-sm text-muted-foreground">Custom Strategies</Label>
          <div className="flex gap-2 mb-2">
            <Input value={newStrategy} onChange={(e) => setNewStrategy(e.target.value)} placeholder="Add strategy" onKeyDown={(e) => e.key === "Enter" && addCustomStrategy()} />
            <Button variant="outline" size="sm" onClick={addCustomStrategy}><Plus className="h-4 w-4" /></Button>
          </div>
          {customStrategies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customStrategies.map((s) => (
                <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs border border-primary/20">
                  {s}
                  <button onClick={() => setCustomStrategies((prev) => prev.filter((x) => x !== s))}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Theme */}
      <ThemeSettings />

      {/* TP Levels */}
      <div className="rounded-lg border border-border p-6 space-y-3">
        <h3 className="font-bold">Take Profit Levels</h3>
        {(["tp1", "tp2", "tp3"] as const).map((tp, i) => (
          <div key={tp} className="flex items-center justify-between p-3 rounded-md border border-border">
            <span className="text-sm font-medium">TP {i + 1}</span>
            <Switch checked={tpLevels[tp]} onCheckedChange={(c) => setTpLevels((prev) => ({ ...prev, [tp]: c }))} />
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          {saved ? "✓ Saved!" : "Save Changes"}
        </Button>
        <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => setDeleteConfirm(true)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{activeProfile.name}" and all associated data.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
