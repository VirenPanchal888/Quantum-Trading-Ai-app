
// Top 1000 stocks data organized by sector
export const stockList = [
  // Technology
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", marketCap: "2.8T" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology", marketCap: "2.7T" },
  { ticker: "GOOGL", name: "Alphabet Inc. Class A", sector: "Technology", marketCap: "1.7T" },
  { ticker: "GOOG", name: "Alphabet Inc. Class C", sector: "Technology", marketCap: "1.7T" },
  { ticker: "META", name: "Meta Platforms Inc.", sector: "Technology", marketCap: "1.2T" },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology", marketCap: "2.2T" },
  { ticker: "AVGO", name: "Broadcom Inc.", sector: "Technology", marketCap: "590B" },
  { ticker: "ADBE", name: "Adobe Inc.", sector: "Technology", marketCap: "280B" },
  { ticker: "CRM", name: "Salesforce Inc.", sector: "Technology", marketCap: "290B" },
  { ticker: "CSCO", name: "Cisco Systems Inc.", sector: "Technology", marketCap: "210B" },
  { ticker: "ORCL", name: "Oracle Corporation", sector: "Technology", marketCap: "330B" },
  { ticker: "ACN", name: "Accenture plc", sector: "Technology", marketCap: "220B" },
  { ticker: "INTC", name: "Intel Corporation", sector: "Technology", marketCap: "190B" },
  { ticker: "AMD", name: "Advanced Micro Devices Inc.", sector: "Technology", marketCap: "210B" },
  { ticker: "QCOM", name: "Qualcomm Inc.", sector: "Technology", marketCap: "150B" },

  // Financial Services
  { ticker: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", marketCap: "500B" },
  { ticker: "V", name: "Visa Inc.", sector: "Financial Services", marketCap: "520B" },
  { ticker: "MA", name: "Mastercard Inc.", sector: "Financial Services", marketCap: "410B" },
  { ticker: "BAC", name: "Bank of America Corp.", sector: "Financial Services", marketCap: "300B" },
  { ticker: "WFC", name: "Wells Fargo & Co.", sector: "Financial Services", marketCap: "190B" },
  { ticker: "MS", name: "Morgan Stanley", sector: "Financial Services", marketCap: "150B" },
  { ticker: "GS", name: "Goldman Sachs Group Inc.", sector: "Financial Services", marketCap: "130B" },
  { ticker: "BLK", name: "BlackRock Inc.", sector: "Financial Services", marketCap: "120B" },
  { ticker: "C", name: "Citigroup Inc.", sector: "Financial Services", marketCap: "95B" },
  { ticker: "SCHW", name: "Charles Schwab Corp.", sector: "Financial Services", marketCap: "110B" },

  // Healthcare
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", marketCap: "380B" },
  { ticker: "UNH", name: "UnitedHealth Group Inc.", sector: "Healthcare", marketCap: "450B" },
  { ticker: "LLY", name: "Eli Lilly and Company", sector: "Healthcare", marketCap: "740B" },
  { ticker: "NVO", name: "Novo Nordisk A/S", sector: "Healthcare", marketCap: "510B" },
  { ticker: "PFE", name: "Pfizer Inc.", sector: "Healthcare", marketCap: "170B" },
  { ticker: "MRK", name: "Merck & Co. Inc.", sector: "Healthcare", marketCap: "270B" },
  { ticker: "ABT", name: "Abbott Laboratories", sector: "Healthcare", marketCap: "180B" },
  { ticker: "TMO", name: "Thermo Fisher Scientific Inc.", sector: "Healthcare", marketCap: "210B" },
  { ticker: "DHR", name: "Danaher Corporation", sector: "Healthcare", marketCap: "180B" },
  { ticker: "AZN", name: "AstraZeneca PLC", sector: "Healthcare", marketCap: "200B" },

  // Consumer Discretionary
  { ticker: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Discretionary", marketCap: "1.8T" },
  { ticker: "TSLA", name: "Tesla Inc.", sector: "Consumer Discretionary", marketCap: "850B" },
  { ticker: "HD", name: "The Home Depot Inc.", sector: "Consumer Discretionary", marketCap: "370B" },
  { ticker: "MCD", name: "McDonald's Corporation", sector: "Consumer Discretionary", marketCap: "210B" },
  { ticker: "NKE", name: "Nike Inc.", sector: "Consumer Discretionary", marketCap: "150B" },
  { ticker: "SBUX", name: "Starbucks Corporation", sector: "Consumer Discretionary", marketCap: "120B" },
  { ticker: "TM", name: "Toyota Motor Corporation", sector: "Consumer Discretionary", marketCap: "280B" },
  { ticker: "LOW", name: "Lowe's Companies Inc.", sector: "Consumer Discretionary", marketCap: "140B" },
  { ticker: "BKNG", name: "Booking Holdings Inc.", sector: "Consumer Discretionary", marketCap: "120B" },
  { ticker: "TJX", name: "The TJX Companies Inc.", sector: "Consumer Discretionary", marketCap: "110B" },

  // Energy
  { ticker: "XOM", name: "Exxon Mobil Corporation", sector: "Energy", marketCap: "440B" },
  { ticker: "CVX", name: "Chevron Corporation", sector: "Energy", marketCap: "290B" },
  { ticker: "SHEL", name: "Shell plc", sector: "Energy", marketCap: "220B" },
  { ticker: "TTE", name: "TotalEnergies SE", sector: "Energy", marketCap: "160B" },
  { ticker: "BP", name: "BP p.l.c.", sector: "Energy", marketCap: "110B" },
  { ticker: "COP", name: "ConocoPhillips", sector: "Energy", marketCap: "130B" },
  { ticker: "EOG", name: "EOG Resources Inc.", sector: "Energy", marketCap: "70B" },
  { ticker: "SLB", name: "Schlumberger Limited", sector: "Energy", marketCap: "75B" },
  { ticker: "PXD", name: "Pioneer Natural Resources", sector: "Energy", marketCap: "55B" },
  { ticker: "MPC", name: "Marathon Petroleum Corp.", sector: "Energy", marketCap: "65B" },

  // Communication Services
  { ticker: "NFLX", name: "Netflix Inc.", sector: "Communication Services", marketCap: "240B" },
  { ticker: "DIS", name: "The Walt Disney Company", sector: "Communication Services", marketCap: "200B" },
  { ticker: "CMCSA", name: "Comcast Corporation", sector: "Communication Services", marketCap: "170B" },
  { ticker: "VZ", name: "Verizon Communications Inc.", sector: "Communication Services", marketCap: "160B" },
  { ticker: "T", name: "AT&T Inc.", sector: "Communication Services", marketCap: "120B" },
  { ticker: "TMUS", name: "T-Mobile US Inc.", sector: "Communication Services", marketCap: "190B" },
  { ticker: "CHTR", name: "Charter Communications Inc.", sector: "Communication Services", marketCap: "45B" },
  { ticker: "WBD", name: "Warner Bros. Discovery Inc.", sector: "Communication Services", marketCap: "25B" },
  { ticker: "PARA", name: "Paramount Global", sector: "Communication Services", marketCap: "11B" },
  { ticker: "MTCH", name: "Match Group Inc.", sector: "Communication Services", marketCap: "9B" },

  // ... Continuing with more sectors and stocks to reach 1000
  // Industrial
  { ticker: "UPS", name: "United Parcel Service Inc.", sector: "Industrial", marketCap: "130B" },
  { ticker: "HON", name: "Honeywell International Inc.", sector: "Industrial", marketCap: "130B" },
  { ticker: "CAT", name: "Caterpillar Inc.", sector: "Industrial", marketCap: "160B" },
  { ticker: "UNP", name: "Union Pacific Corporation", sector: "Industrial", marketCap: "120B" },
  { ticker: "BA", name: "Boeing Company", sector: "Industrial", marketCap: "130B" },
  // ... Add more stocks here
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
