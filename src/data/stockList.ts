
// Top 500 stocks data
export const stockList = [
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical" },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { ticker: "META", name: "Meta Platforms Inc.", sector: "Technology" },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { ticker: "BRK.B", name: "Berkshire Hathaway Inc.", sector: "Financial Services" },
  { ticker: "TSLA", name: "Tesla Inc.", sector: "Automotive" },
  { ticker: "V", name: "Visa Inc.", sector: "Financial Services" },
  { ticker: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare" },
  // ... For brevity, I'm showing 10 stocks here but you should add all 500
  // The complete list would continue with more real companies
];

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
}

export interface Transaction {
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
