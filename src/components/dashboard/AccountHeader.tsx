import { useProfile } from "@/context/ProfileContext";
import { TradeEntryDialog } from "@/components/TradeEntryDialog";
import { UserCircle } from "lucide-react";

export const AccountHeader = () => {
  const { activeProfile } = useProfile();
  return (
    <div className="h-full rounded-lg border border-border p-3 bg-card/30 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {activeProfile?.avatar ? (
          <img src={activeProfile.avatar} alt={activeProfile.name} className="w-10 h-10 rounded-full object-cover border border-primary/30 shrink-0" />
        ) : (
          <UserCircle className="h-10 w-10 text-muted-foreground shrink-0" />
        )}
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Active Account</p>
          <p className="text-sm font-bold truncate">{activeProfile?.name ?? "—"}</p>
        </div>
      </div>
      <div className="shrink-0">
        <TradeEntryDialog />
      </div>
    </div>
  );
};
