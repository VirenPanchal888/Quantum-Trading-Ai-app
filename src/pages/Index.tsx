
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";
import { TradeForm } from "@/components/stock/TradeForm";
import { ForexChart } from "@/components/forex/ForexChart";
import { ForexSearch } from "@/components/forex/ForexSearch";
import { Stock, StockTransaction, ForexPair } from "@/data/forexList";
import { Search, Rocket, Wallet2, CandlestickChart, LineChart, ScanSearch, BookMarked, Newspaper, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedForexPair, setSelectedForexPair] = useState<ForexPair | null>(null);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  const handleTrade = (transaction: StockTransaction) => {
    setTransactions((prev) => [...prev, transaction]);
    const savedTransactions = localStorage.getItem('transactions');
    const allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    localStorage.setItem('transactions', JSON.stringify([...allTransactions, transaction]));
  };

  const navigationCards = [
    {
      title: "Market Analysis",
      description: "View detailed market analysis and trends",
      icon: LineChart,
      path: "/market-analysis",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-900/20"
    },
    {
      title: "Stock Screener",
      description: "Screen stocks based on various criteria",
      icon: ScanSearch,
      path: "/screener",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-900/20"
    },
    {
      title: "Watchlist",
      description: "Track your favorite stocks",
      icon: BookMarked,
      path: "/watchlist",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-900/20"
    },
    {
      title: "Portfolio",
      description: "View your investment portfolio",
      icon: Wallet2,
      path: "/portfolio",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-900/20"
    },
    {
      title: "IPO",
      description: "Explore upcoming IPOs",
      icon: Rocket,
      path: "/ipo",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-900/20"
    },
    {
      title: "Market News",
      description: "Latest market news and updates",
      icon: Newspaper,
      path: "/news",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-900/20"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to Quantum TradeXpert
          </h1>
          <p className="text-xl text-gray-400">
            Access global markets and manage your investments with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card) => (
            <Card
              key={card.path}
              className={`${card.bgColor} hover:bg-white/10 backdrop-blur-xl border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => navigate(card.path)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Stock Market</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <StockSearch onSelect={setSelectedStock} />
              {selectedStock && (
                <div className="mt-4 space-y-6">
                  <StockChart ticker={selectedStock.ticker} />
                  <TradeForm stock={selectedStock} onTrade={handleTrade} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Forex Market</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ForexSearch onSelect={setSelectedForexPair} />
              {selectedForexPair && (
                <div className="mt-4">
                  <ForexChart pair={selectedForexPair.pair} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
