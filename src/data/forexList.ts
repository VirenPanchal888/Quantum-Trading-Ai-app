export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
}

export interface ForexPair {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
  change: number;
}

export const forexList: ForexPair[] = [
  {
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    bid: 1.0925,
    ask: 1.0927,
    change: 0.05
  },
  {
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    bid: 1.2750,
    ask: 1.2752,
    change: -0.02
  },
  {
    symbol: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    bid: 149.80,
    ask: 149.83,
    change: 0.10
  },
  {
    symbol: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    bid: 0.8845,
    ask: 0.8848,
    change: -0.03
  },
  {
    symbol: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    bid: 0.6520,
    ask: 0.6522,
    change: 0.01
  },
  {
    symbol: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    bid: 1.3550,
    ask: 1.3553,
    change: 0.04
  },
  {
    symbol: "NZD/USD",
    name: "New Zealand Dollar / US Dollar",
    bid: 0.6050,
    ask: 0.6053,
    change: -0.01
  },
  {
    symbol: "EUR/GBP",
    name: "Euro / British Pound",
    bid: 0.8560,
    ask: 0.8562,
    change: 0.02
  },
  {
    symbol: "EUR/JPY",
    name: "Euro / Japanese Yen",
    bid: 163.60,
    ask: 163.63,
    change: 0.08
  },
  {
    symbol: "GBP/JPY",
    name: "British Pound / Japanese Yen",
    bid: 191.20,
    ask: 191.25,
    change: 0.15
  }
];
