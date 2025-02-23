
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import StockSearch from "@/components/stock/StockSearch";
import StockChart from "@/components/stock/StockChart";
import { Button } from "@/components/ui/button";

interface Stock {
  ticker: string;
  name: string;
  sector: string;
}

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

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
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedStock.name}</h3>
                  <p className="text-sm text-gray-400">{selectedStock.sector}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Buy
                  </Button>
                  <Button
                    variant="destructive"
                  >
                    Sell
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
