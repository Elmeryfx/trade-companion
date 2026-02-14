export type Position = "BUY" | "SELL";
export type MarketCondition = "BULLISH" | "BEARISH" | "SIDEWAYS";
export type TradeResult = "WIN" | "LOSS" | "BE";

export interface Trade {
  id: string;
  profileId: string;
  position: Position;
  rr: number;
  pips: number;
  pnl: number;
  tp1?: boolean;
  tp2?: boolean;
  tp3?: boolean;
  marketCondition: MarketCondition;
  result: TradeResult;
  strategy: string;
  date: string;
  setupImage?: string;
  resultImage?: string;
  notes?: string;
}

export interface DayData {
  trades: number;
  pnl: number;
}
