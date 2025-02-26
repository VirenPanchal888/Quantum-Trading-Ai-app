
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
import { Card } from "@/components/ui/card";

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
      bgColor: "bg-blue-50/5"
    },
    {
      title: "Stock Screener",
      description: "Screen stocks based on various criteria",
      icon: ScanSearch,
      path: "/screener",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50/5"
    },
    {
      title: "Watchlist",
      description: "Track your favorite stocks",
      icon: BookMarked,
      path: "/watchlist",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50/5"
    },
    {
      title: "Portfolio",
      description: "View your investment portfolio",
      icon: Wallet2,
      path: "/portfolio",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50/5"
    },
    {
      title: "IPO",
      description: "Explore upcoming IPOs",
      icon: Rocket,
      path: "/ipo",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50/5"
    },
    {
      title: "Market News",
      description: "Latest market news and updates",
      icon: Newspaper,
      path: "/news",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50/5"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center pb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to Quantum TradeXpert
          </h1>
          <p className="mt-2 text-white text-lg">Access global markets and manage your investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card) => (
            <Card
              key={card.path}
              className={`${card.bgColor} hover:bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105`}
            >
              <Button
                variant="ghost"
                className="w-full h-full p-6"
                onClick={() => navigate(card.path)}
              >
                <div className="flex items-start text-left space-x-4">
                  <div className={`rounded-lg p-3 bg-gradient-to-br ${card.color}`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white">{card.title}</h3>
                    <p className="text-gray-400 mt-1">{card.description}</p>
                  </div>
                </div>
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Stock Market</h2>
            <StockSearch onSelect={setSelectedStock} />
            {selectedStock && (
              <div className="mt-4">
                <StockChart ticker={selectedStock.ticker} />
                <TradeForm stock={selectedStock} onTrade={handleTrade} />
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Forex Market</h2>
            <ForexSearch onSelect={setSelectedForexPair} />
            {selectedForexPair && (
              <div className="mt-4">
                <ForexChart pair={selectedForexPair.pair} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
