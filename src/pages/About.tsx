import { TrendingUp } from "lucide-react";

const About = () => (
  <div className="p-6 max-w-2xl mx-auto space-y-8">
    <div className="text-center space-y-4">
      <TrendingUp className="h-12 w-12 text-primary mx-auto" />
      <h1 className="text-3xl font-bold text-primary">TRADE JOURNAL</h1>
      <p className="text-muted-foreground">Version 1.0.0</p>
    </div>

    <div className="rounded-lg border border-border p-6 space-y-4">
      <h2 className="text-lg font-bold text-foreground">About</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Trade Journal is a personal trading journal application designed to help traders track, analyze, and improve their trading performance. Log your trades, review analytics, and build consistent trading habits.
      </p>
    </div>

    <div className="rounded-lg border border-border p-6 space-y-3">
      <h2 className="text-lg font-bold text-foreground">Features</h2>
      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
        <li>Trade entry with strategy, position, and image uploads</li>
        <li>Interactive trade calendar with weekly summaries</li>
        <li>Analytics dashboard with account growth and strategy performance</li>
        <li>Risk analysis with drawdown charts</li>
        <li>Monthly performance summaries</li>
        <li>Import & Export trade data (JSON)</li>
      </ul>
    </div>

    <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
      <p>© {new Date().getFullYear()} Trade Journal. All rights reserved.</p>
    </div>
  </div>
);

export default About;
