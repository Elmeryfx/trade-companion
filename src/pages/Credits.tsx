import { TrendingUp } from "lucide-react";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const Credits = () => {
  return (
    <div className="p-6 max-w-lg mx-auto space-y-8 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full space-y-8">
        {/* Logo & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            TRADE JOURNAL
          </h1>
          <p className="text-sm text-muted-foreground">Your personal trading companion</p>
        </div>

        {/* Creator Card */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Created by</p>
            <h2 className="text-lg font-bold">gtwmalesbikin</h2>
          </div>

          <div className="space-y-3">
            <a
              href="https://t.me/gtwmalesbikin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#229ED9]/10 flex items-center justify-center">
                <TelegramIcon className="h-5 w-5 text-[#229ED9]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Telegram</p>
                <p className="text-xs text-muted-foreground">@gtwmalesbikin</p>
              </div>
            </a>

            <a
              href="https://instagram.com/aidil.cpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E4405F]/10 flex items-center justify-center">
                <InstagramIcon className="h-5 w-5 text-[#E4405F]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">Instagram</p>
                <p className="text-xs text-muted-foreground">@aidil.cpp</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-xs text-muted-foreground pt-2">
            © {new Date().getFullYear()} Trade Journal. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">v2.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Credits;
