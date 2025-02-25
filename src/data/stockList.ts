
// Top 1000 stocks data organized by sector
export const stockList = [
  // Technology
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", marketCap: "2.8T" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology", marketCap: "2.7T" },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology", marketCap: "1.7T" },
  { ticker: "META", name: "Meta Platforms Inc.", sector: "Technology", marketCap: "1.2T" },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology", marketCap: "2.2T" },
  // Financial Services
  { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", marketCap: "500B" },
  { ticker: "BAC", name: "Bank of America Corp.", sector: "Financial Services", marketCap: "300B" },
  { ticker: "WFC", name: "Wells Fargo & Co.", sector: "Financial Services", marketCap: "190B" },
  // Healthcare
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", marketCap: "380B" },
  { ticker: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare", marketCap: "450B" },
  { ticker: "PFE", name: "Pfizer Inc.", sector: "Healthcare", marketCap: "170B" },
  // ... Add more stocks here to reach 1000
];

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
}

export interface StockTransaction {
  id: string;
  date: Date;
  ticker: string;
  name: string;
  sector: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  currentPrice?: number;
  profitLoss?: number;
  profitLossPercentage?: number;
}

export interface AIRecommendation {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reason: string;
}
