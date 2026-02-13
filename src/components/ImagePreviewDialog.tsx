import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  src: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImagePreviewDialog = ({ src, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl bg-card border-border p-2">
      {src && <img src={src} alt="Preview" className="w-full h-auto rounded-lg" />}
    </DialogContent>
  </Dialog>
);
