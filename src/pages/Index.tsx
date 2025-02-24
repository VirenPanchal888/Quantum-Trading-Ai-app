
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";
import { TradeForm } from "@/components/stock/TradeForm";
import { Stock, StockTransaction } from "@/data/forexList";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  const handleTrade = (transaction: StockTransaction) => {
    setTransactions((prev) => [...prev, transaction]);
    // In a real app, you would save this to a database
    const savedTransactions = localStorage.getItem('transactions');
    const allTransactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    localStorage.setItem('transactions', JSON.stringify([...allTransactions, transaction]));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white min-h-screen p-6 space-y-6">
        <div className="rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Market Overview</h1>
          <StockSearch onSelect={setSelectedStock} />
        </div>

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
