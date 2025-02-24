
export interface Stock {
  ticker: string;
  name: string;
  sector: string;
}

export interface IPOData {
  ticker: string;
  name: string;
  sector: string;
  offerPrice: number;
  shares: number;
  marketCap: number;
  listingDate: string;
  status: 'upcoming' | 'listed' | 'withdrawn';
  description: string;
}

export interface BaseTransaction {
  id: string;
  date: Date;
  type: 'buy' | 'sell';
  price: number;
  profitLoss?: number;
  transactionType: 'stock' | 'forex' | 'ipo';
}

export interface StockTransaction extends BaseTransaction {
  ticker: string;
  name: string;
  sector: string;
  quantity: number;
  transactionType: 'stock';
}

export interface ForexTransaction extends BaseTransaction {
  pair: string;
  lotSize: number;
  leverage?: number;
  transactionType: 'forex';
}

export interface IPOTransaction extends BaseTransaction {
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  transactionType: 'ipo';
}

export type Transaction = StockTransaction | ForexTransaction | IPOTransaction;

export const ipoList: IPOData[] = [
  {
    ticker: "AITECH",
    name: "AI Technologies Inc.",
    sector: "Technology",
    offerPrice: 25.00,
    shares: 10000000,
    marketCap: 250000000,
    listingDate: "2024-04-15",
    status: "upcoming",
    description: "AI Technologies Inc. is a leading provider of artificial intelligence solutions."
  },
  {
    ticker: "GRNEGY",
    name: "Green Energy Solutions",
    sector: "Energy",
    offerPrice: 18.50,
    shares: 15000000,
    marketCap: 277500000,
    listingDate: "2024-04-20",
    status: "upcoming",
    description: "Green Energy Solutions develops renewable energy technologies."
  }
];

export interface ForexPair {
  pair: string;
  name: string;
  category: 'major' | 'minor' | 'exotic';
  description: string;
}

export const forexPairs: ForexPair[] = [
  {
    pair: "EUR/USD",
    name: "Euro / US Dollar",
    category: "major",
    description: "Euro vs US Dollar"
  },
  {
    pair: "GBP/USD",
    name: "British Pound / US Dollar",
    category: "major",
    description: "British Pound vs US Dollar"
  },
  {
    pair: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    category: "major",
    description: "US Dollar vs Japanese Yen"
  },
  {
    pair: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    category: "major",
    description: "US Dollar vs Swiss Franc"
  },
  {
    pair: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    category: "major",
    description: "Australian Dollar vs US Dollar"
  },
  {
    pair: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    category: "major",
    description: "US Dollar vs Canadian Dollar"
  }
];
