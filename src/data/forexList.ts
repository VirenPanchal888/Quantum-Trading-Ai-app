
// Top 500 stocks data by sector (100 per sector)
export const stockListByCategory = {
  Technology: [
    { ticker: "AAPL", name: "Apple Inc.", sector: "Technology" },
    { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
    // ... Add more technology stocks
  ],
  Healthcare: [
    { ticker: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare" },
    { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
    // ... Add more healthcare stocks
  ],
  Financial: [
    { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial" },
    { ticker: "BAC", name: "Bank of America Corp.", sector: "Financial" },
    // ... Add more financial stocks
  ],
  // ... Add more sectors
};

export interface ForexPair {
  symbol: string;
  name: string;
  category: 'major' | 'minor' | 'exotic';
  description: string;
}

export interface BaseTransaction {
  id: string;
  date: Date;
  type: 'buy' | 'sell';
  price: number;
  profitLoss?: number;
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

export type Transaction = StockTransaction | ForexTransaction;

export const forexPairs: ForexPair[] = [
  // Major Pairs
  { symbol: "EUR/USD", name: "Euro / US Dollar", category: "major", description: "Euro vs US Dollar" },
  { symbol: "GBP/USD", name: "British Pound / US Dollar", category: "major", description: "British Pound vs US Dollar" },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen", category: "major", description: "US Dollar vs Japanese Yen" },
  { symbol: "USD/CHF", name: "US Dollar / Swiss Franc", category: "major", description: "US Dollar vs Swiss Franc" },
  { symbol: "AUD/USD", name: "Australian Dollar / US Dollar", category: "major", description: "Australian Dollar vs US Dollar" },
  { symbol: "USD/CAD", name: "US Dollar / Canadian Dollar", category: "major", description: "US Dollar vs Canadian Dollar" },
  { symbol: "NZD/USD", name: "New Zealand Dollar / US Dollar", category: "major", description: "New Zealand Dollar vs US Dollar" },
  
  // Minor Pairs
  { symbol: "EUR/GBP", name: "Euro / British Pound", category: "minor", description: "Euro vs British Pound" },
  { symbol: "EUR/AUD", name: "Euro / Australian Dollar", category: "minor", description: "Euro vs Australian Dollar" },
  { symbol: "GBP/JPY", name: "British Pound / Japanese Yen", category: "minor", description: "British Pound vs Japanese Yen" },
  { symbol: "CHF/JPY", name: "Swiss Franc / Japanese Yen", category: "minor", description: "Swiss Franc vs Japanese Yen" },
  { symbol: "EUR/CAD", name: "Euro / Canadian Dollar", category: "minor", description: "Euro vs Canadian Dollar" },
  
  // Exotic Pairs
  { symbol: "USD/SGD", name: "US Dollar / Singapore Dollar", category: "exotic", description: "US Dollar vs Singapore Dollar" },
  { symbol: "USD/HKD", name: "US Dollar / Hong Kong Dollar", category: "exotic", description: "US Dollar vs Hong Kong Dollar" },
  { symbol: "USD/THB", name: "US Dollar / Thai Baht", category: "exotic", description: "US Dollar vs Thai Baht" },
  // Add more pairs as needed
];
