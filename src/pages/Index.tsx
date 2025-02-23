
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";
import { TradeForm } from "@/components/stock/TradeForm";
import { Stock, Transaction } from "@/data/stockList";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTrade = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    // In a real app, you would save this to a database
    localStorage.setItem("transactions", JSON.stringify([...transactions, transaction]));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold mb-4">Market Overview</h1>
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
