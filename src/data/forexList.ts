
export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
}

export interface StockTransaction {
  id: string;
  date: Date;
  type: 'buy' | 'sell';
  ticker: string;
  name: string;
  sector: string;
  quantity: number;
  price: number;
  currentPrice?: number;
  profitLoss?: number;
  profitLossPercentage?: number;
  transactionType: 'stock';
}

export interface ForexPair {
  symbol: string;
  pair: string;
  name: string;
  description: string;
  category: 'major' | 'minor' | 'exotic';
  bid: number;
  ask: number;
  change: number;
}

export interface ForexTransaction {
  id: string;
  date: Date;
  type: 'buy' | 'sell';
  pair: string;
  lotSize: number;
  price: number;
  leverage: number;
  profitLoss?: number;
  transactionType: 'forex';
}

export interface IPOData {
  symbol: string;
  ticker: string;
  name: string;
  companyName: string;
  sector: string;
  description: string;
  expectedDate: string;
  listingDate: string;
  priceRange: string;
  offerPrice: number;
  marketCap: string;
  shares: number;
  status: 'upcoming' | 'completed' | 'withdrawn';
}

export interface IPOTransaction {
  id: string;
  date: Date;
  symbol: string;
  companyName: string;
  shares: number;
  price: number;
  type: 'subscribe' | 'allotted' | 'cancelled';
  transactionType: 'ipo';
}

export type Transaction = StockTransaction | ForexTransaction | IPOTransaction;

export const forexPairs: ForexPair[] = [
  {
    symbol: "EUR/USD",
    pair: "EUR/USD",
    name: "Euro / US Dollar",
    description: "Euro vs US Dollar",
    category: "major",
    bid: 1.0925,
    ask: 1.0927,
    change: 0.05
  },
  {
    symbol: "GBP/USD",
    pair: "GBP/USD",
    name: "British Pound / US Dollar",
    description: "British Pound vs US Dollar",
    category: "major",
    bid: 1.2750,
    ask: 1.2752,
    change: -0.02
  },
  {
    symbol: "USD/JPY",
    pair: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    description: "US Dollar vs Japanese Yen",
    category: "major",
    bid: 149.80,
    ask: 149.83,
    change: 0.10
  },
  {
    symbol: "USD/CHF",
    pair: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    description: "US Dollar vs Swiss Franc",
    category: "major",
    bid: 0.8845,
    ask: 0.8848,
    change: -0.03
  },
  {
    symbol: "AUD/USD",
    pair: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    description: "Australian Dollar vs US Dollar",
    category: "major",
    bid: 0.6520,
    ask: 0.6522,
    change: 0.01
  },
  {
    symbol: "EUR/GBP",
    pair: "EUR/GBP",
    name: "Euro / British Pound",
    description: "Euro vs British Pound",
    category: "minor",
    bid: 0.8560,
    ask: 0.8562,
    change: 0.02
  },
  {
    symbol: "EUR/JPY",
    pair: "EUR/JPY",
    name: "Euro / Japanese Yen",
    description: "Euro vs Japanese Yen",
    category: "minor",
    bid: 163.60,
    ask: 163.63,
    change: 0.08
  }
];

export const ipoList: IPOData[] = [
  {
    symbol: "COOL",
    ticker: "COOL",
    name: "Cool Tech Inc.",
    companyName: "Cool Tech Inc.",
    sector: "Technology",
    description: "Next-generation cooling technology solutions",
    expectedDate: "2024-04-15",
    listingDate: "2024-04-15",
    priceRange: "$18-22",
    offerPrice: 20,
    marketCap: "2B",
    shares: 10000000,
    status: "upcoming"
  },
  {
    symbol: "INNV",
    ticker: "INNV",
    name: "Innovation Labs",
    companyName: "Innovation Labs",
    sector: "Technology",
    description: "AI-powered research and development",
    expectedDate: "2024-05-01",
    listingDate: "2024-05-01",
    priceRange: "$24-28",
    offerPrice: 26,
    marketCap: "1.5B",
    shares: 5000000,
    status: "upcoming"
  }
];
