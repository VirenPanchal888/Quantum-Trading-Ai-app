
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";
import { TradeForm } from "@/components/stock/TradeForm";
import { Stock, StockTransaction } from "@/data/forexList";
import { Search, Rocket, Wallet2, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  const handleTrade = (transaction: StockTransaction) => {
    setTransactions((prev) => [...prev, transaction]);
    const savedTransactions = localStorage.getItem('transactions');
    const allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    localStorage.setItem('transactions', JSON.stringify([...allTransactions, transaction]));
  };

  const navigationCards = [
    {
      title: "Stock Market",
      description: "Trade stocks with real-time market data and advanced charting",
      icon: CandlestickChart,
      path: "/",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Forex Trading",
      description: "Access global currency pairs with competitive spreads",
      icon: Search,
      path: "/forex",
      color: "from-green-500 to-green-600"
    },
    {
      title: "IPO Investments",
      description: "Participate in upcoming Initial Public Offerings",
      icon: Rocket,
      path: "/ipo",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Portfolio",
      description: "Track your investments and trading performance",
      icon: Wallet2,
      path: "/portfolio",
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white min-h-screen p-6 space-y-8">
        <div className="text-center pb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Quantum TradeXpert</h1>
          <p className="mt-2 text-gray-600">Access global markets and manage your investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {navigationCards.map((card) => (
            <Button
              key={card.path}
              variant="ghost"
              className="h-auto p-6 bg-gradient-to-br border hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(card.path)}
            >
              <div className="flex items-start text-left space-x-4">
                <div className={`rounded-lg p-3 bg-gradient-to-br ${card.color}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 mt-1">{card.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {!selectedStock && (
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Overview</h2>
            <StockSearch onSelect={setSelectedStock} />
          </div>
        )}

        {selectedStock && (
          <div className="space-y-6">
            <StockChart ticker={selectedStock.ticker} />
            <TradeForm stock={selectedStock} onTrade={handleTrade} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
