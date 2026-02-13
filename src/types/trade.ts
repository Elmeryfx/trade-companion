export type Position = "BUY" | "SELL";
export type MarketCondition = "BULLISH" | "BEARISH" | "SIDEWAYS";
export type TradeResult = "WIN" | "LOSS";
export type Strategy = "FVG" | "REVERSAL" | "TRENDLINE" | "CONTINUATION";

export interface Trade {
  id: string;
  position: Position;
  rr: number;
  pips: number;
  pnl: number;
  tp1Hit: boolean;
  marketCondition: MarketCondition;
  result: TradeResult;
  strategy: Strategy;
  date: string;
  setupImage?: string;
  resultImage?: string;
  notes?: string;
}

export interface DayData {
  trades: number;
  pnl: number;
}
