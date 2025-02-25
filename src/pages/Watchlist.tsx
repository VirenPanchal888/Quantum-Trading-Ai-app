
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StockSearch from "@/components/stock/StockSearch";
import { Stock } from "@/data/forexList";
import { Plus, X } from "lucide-react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const addToWatchlist = (stock: Stock) => {
    const newWatchlist = [...watchlist, stock];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (ticker: string) => {
    const newWatchlist = watchlist.filter((stock) => stock.ticker !== ticker);
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        
        <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add Stock</h2>
            <StockSearch onSelect={addToWatchlist} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((stock) => (
              <Card key={stock.ticker} className="p-4 bg-white/5 border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{stock.ticker}</h3>
                    <p className="text-sm text-gray-400">{stock.name}</p>
                    <p className="text-xs text-gray-500">{stock.sector}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromWatchlist(stock.ticker)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Watchlist;
